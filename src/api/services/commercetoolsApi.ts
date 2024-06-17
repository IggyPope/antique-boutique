import { toast } from 'react-toastify';

import {
  Cart,
  CategoryPagedQueryResponse,
  Customer,
  MyCartUpdate,
  MyCustomerChangePassword,
  MyCustomerUpdate,
  ProductProjection,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { StorageApi } from '@/api/Storage';
import { AuthService } from '@/api/services/AuthService';
import { isErrorWithMessage, processQueryError } from '@/api/services/utils';
import { APP_SETTINGS, SEARCH_PARAM_NAME, STORAGE_KEYS } from '@/constants/app';
import { PasswordFlowTokenStore } from '@/store/PasswordStore';
import { ProductFilters } from '@/store/slices/filtersSlice';

export const commercetoolsApi = createApi({
  reducerPath: 'commercetoolsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Customer', 'Cart'],
  endpoints: (builder) => ({
    getCustomer: builder.query<Customer, void>({
      providesTags: ['Customer'],
      queryFn: async () => {
        const { apiRoot } = AuthService.getInstance();

        try {
          const user = await apiRoot.me().get().execute();

          return { data: user.body };
        } catch (err) {
          return processQueryError(err);
        }
      },
    }),
    updateCustomer: builder.mutation<Customer, MyCustomerUpdate>({
      invalidatesTags: ['Customer'],
      queryFn: async (payload) => {
        const { apiRoot } = AuthService.getInstance();

        try {
          const customerUpdate = await apiRoot
            .me()
            .post({
              body: payload,
            })
            .execute();

          return { data: customerUpdate.body };
        } catch (err) {
          return processQueryError(err);
        }
      },
    }),
    changePassword: builder.mutation<Customer, MyCustomerChangePassword & { email: string }>({
      invalidatesTags: ['Customer'],
      queryFn: async ({ version, currentPassword, newPassword, email }) => {
        const authService = AuthService.getInstance();

        try {
          const customer = await authService.apiRoot
            .me()
            .password()
            .post({
              body: {
                version,
                currentPassword,
                newPassword,
              },
            })
            .execute();

          PasswordFlowTokenStore.removeData();

          await authService.signIn(email, newPassword);

          toast.success('Password changed successfully');

          return { data: customer.body };
        } catch (err) {
          if (isErrorWithMessage(err)) {
            toast.error(`Error changing password: ${err.message}`);
          }

          return processQueryError(err);
        }
      },
    }),
    getCategories: builder.query<CategoryPagedQueryResponse, void>({
      queryFn: async () => {
        const { apiRoot } = AuthService.getInstance();

        try {
          const categories = await apiRoot
            .categories()
            .get({ queryArgs: { limit: 500 } })
            .execute();

          return { data: categories.body };
        } catch (err) {
          return processQueryError(err);
        }
      },
    }),
    getProductById: builder.query<ProductProjection, string>({
      queryFn: async (id) => {
        const { apiRoot } = AuthService.getInstance();

        try {
          const product = await apiRoot.productProjections().withId({ ID: id }).get().execute();

          return { data: product.body };
        } catch (err) {
          return processQueryError(err);
        }
      },
    }),
    getFilteredProducts: builder.query<ProductProjectionPagedSearchResponse, ProductFilters>({
      queryFn: async ({
        category,
        subcategory,
        brand,
        color,
        size,
        priceRange,
        availability,
        page,
        search,
        sortBy,
        sortDirection,
      }) => {
        const { apiRoot } = AuthService.getInstance();

        const categoryFilter = subcategory
          ? `categories.id:subtree("${subcategory}")`
          : category
            ? `categories.id:subtree("${category}")`
            : '';

        const brandFilter = brand.length ? `variants.attributes.Brand:"${brand.join('","')}"` : '';

        const colorFilter = color.length ? `variants.attributes.Color:"${color.join('","')}"` : '';

        const sizeFilter = size.length ? `variants.attributes.Size.key:"${size.join('","')}"` : '';

        const priceFilter = priceRange
          ? `variants.price.centAmount:range(${priceRange[0]} to ${priceRange[1]})`
          : '';

        const availabilityFilter = availability ? 'variants.attributes.Availability:true' : '';

        const queryArgs = {
          facet: [
            'variants.price.centAmount:range(0 to 9999999) as prices',
            'variants.attributes.Size.key as sizes',
            'variants.attributes.Color as colors',
            'variants.attributes.Brand as brands',
          ],
          filter: [
            categoryFilter,
            brandFilter,
            colorFilter,
            sizeFilter,
            priceFilter,
            availabilityFilter,
          ],
          limit: APP_SETTINGS.PRODUCTS_PER_PAGE,
          offset: (page - 1) * APP_SETTINGS.PRODUCTS_PER_PAGE,
          [SEARCH_PARAM_NAME]: search,
          fuzzy: true,
          sort: `${sortBy} ${sortDirection}`,
        };

        try {
          const products = await apiRoot
            .productProjections()
            .search()
            .get({
              queryArgs,
            })
            .execute();

          return { data: products.body };
        } catch (err) {
          return processQueryError(err);
        }
      },
    }),
    getCart: builder.query<Cart, boolean>({
      providesTags: ['Cart'],
      queryFn: (isAuthenticated: boolean) => {
        const { apiRoot } = AuthService.getInstance();

        const cartIdCache = new StorageApi<string>(sessionStorage, STORAGE_KEYS.CART_ID);

        return isAuthenticated
          ? apiRoot
              .me()
              .activeCart()
              .get()
              .execute()
              .then((res) => {
                const cartId = res.body.id;
                cartIdCache.saveData(cartId);

                return { data: res.body };
              })
              .catch(() =>
                apiRoot
                  .me()
                  .carts()
                  .post({
                    body: {
                      currency: APP_SETTINGS.CURRENCY.ISO_CODE,
                    },
                  })
                  .execute()
                  .then((res) => {
                    const cartId = res.body.id;
                    cartIdCache.saveData(cartId);

                    return { data: res.body };
                  })
                  .catch(processQueryError),
              )
          : apiRoot
              .me()
              .carts()
              .get()
              .execute()
              .then(async (res) => {
                const carts = res.body.results;

                if (carts.length > 0) {
                  const cart = carts[0];
                  const cartId = cart.id;
                  cartIdCache.saveData(cartId);

                  return { data: cart };
                } else {
                  return apiRoot
                    .me()
                    .carts()
                    .post({
                      body: {
                        currency: APP_SETTINGS.CURRENCY.ISO_CODE,
                      },
                    })
                    .execute()
                    .then((res) => {
                      const cartId = res.body.id;
                      cartIdCache.saveData(cartId);

                      return { data: res.body };
                    })
                    .catch(processQueryError);
                }
              });
      },
    }),
    updateCart: builder.mutation<Cart, MyCartUpdate>({
      invalidatesTags: ['Cart'],
      queryFn: async (payload) => {
        const { apiRoot } = AuthService.getInstance();

        const cartIdCache = new StorageApi<string>(sessionStorage, STORAGE_KEYS.CART_ID);
        const cartId = cartIdCache.getData();

        if (!cartId) {
          return { error: { status: 404, data: 'Active cart ID not found' } };
        }

        return apiRoot
          .me()
          .carts()
          .withId({ ID: cartId })
          .post({
            body: payload,
          })
          .execute()
          .then((res) => ({ data: res.body }))
          .catch(processQueryError);
      },
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCustomerQuery,
  useChangePasswordMutation,
  useUpdateCustomerMutation,
  useGetProductByIdQuery,
  useGetFilteredProductsQuery,
  useGetCartQuery,
  useUpdateCartMutation,
} = commercetoolsApi;
