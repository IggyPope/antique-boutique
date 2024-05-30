import {
  CategoryPagedQueryResponse,
  Customer,
  MyCustomerChangePassword,
  MyCustomerUpdate,
  ProductProjection,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { AuthService } from '@/api/services/AuthService';
import { isErrorWithMessage, isFetchBaseQueryError } from '@/api/services/utils';
import { APP_SETTINGS, SEARCH_PARAM_NAME } from '@/constants/app';
import { ProductFilters } from '@/store/slices/filtersSlice';

export const commercetoolsApi = createApi({
  reducerPath: 'commercetoolsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Customer'],
  endpoints: (builder) => ({
    getCustomer: builder.query<Customer, void>({
      providesTags: ['Customer'],
      queryFn: async () => {
        const { apiRoot } = AuthService.getInstance();

        try {
          const user = await apiRoot.me().get().execute();

          return { data: user.body };
        } catch (err) {
          if (isErrorWithMessage(err)) {
            return { error: { status: 500, data: err.message } };
          } else if (isFetchBaseQueryError(err)) {
            const errMsg = 'error' in err ? err.error : JSON.stringify(err.data);

            return { error: { status: +err.status, data: errMsg } };
          }

          return { error: { status: 500, data: 'An unknown error occurred' } };
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
          if (isErrorWithMessage(err)) {
            return { error: { status: 500, data: err.message } };
          } else if (isFetchBaseQueryError(err)) {
            const errMsg = 'error' in err ? err.error : JSON.stringify(err.data);

            return { error: { status: +err.status, data: errMsg } };
          }

          return { error: { status: 500, data: 'An unknown error occurred' } };
        }
      },
    }),
    changePassword: builder.mutation<Customer, MyCustomerChangePassword>({
      queryFn: async ({ version, currentPassword, newPassword }) => {
        const { apiRoot } = AuthService.getInstance();

        try {
          const customer = await apiRoot
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

          return { data: customer.body };
        } catch (err) {
          if (isErrorWithMessage(err)) {
            return { error: { status: 500, data: err.message } };
          } else if (isFetchBaseQueryError(err)) {
            const errMsg = 'error' in err ? err.error : JSON.stringify(err.data);

            return { error: { status: +err.status, data: errMsg } };
          }

          return { error: { status: 500, data: 'An unknown error occurred' } };
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
          if (isErrorWithMessage(err)) {
            return { error: { status: 500, data: err.message } };
          } else if (isFetchBaseQueryError(err)) {
            const errMsg = 'error' in err ? err.error : JSON.stringify(err.data);

            return { error: { status: +err.status, data: errMsg } };
          }

          return { error: { status: 500, data: 'An unknown error occurred' } };
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
          if (isErrorWithMessage(err)) {
            return { error: { status: 500, data: err.message } };
          } else if (isFetchBaseQueryError(err)) {
            const errMsg = 'error' in err ? err.error : JSON.stringify(err.data);

            return { error: { status: +err.status, data: errMsg } };
          }

          return { error: { status: 500, data: 'An unknown error occurred' } };
        }
      },
    }),
    getFilteredProducts: builder.query<ProductProjectionPagedSearchResponse, ProductFilters>({
      queryFn: async ({ search, page, sortBy, sortDirection }) => {
        const { apiRoot } = AuthService.getInstance();

        const queryArgs = {
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
          if (isErrorWithMessage(err)) {
            return { error: { status: 500, data: err.message } };
          } else if (isFetchBaseQueryError(err)) {
            const errMsg = 'error' in err ? err.error : JSON.stringify(err.data);

            return { error: { status: +err.status, data: errMsg } };
          }

          return { error: { status: 500, data: 'An unknown error occurred' } };
        }
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
} = commercetoolsApi;
