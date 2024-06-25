import { useGetFilteredProductsQuery } from '@/api/services/commercetoolsApi';
import { useAppSelector } from '@/store/hooks';

const useProducts = () => {
  const {
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
  } = useAppSelector((state) => state.filters);
  const {
    data: productsData,
    error: productsError,
    isFetching: productsIsFetching,
  } = useGetFilteredProductsQuery({
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
  });

  return { productsData, productsError, productsIsFetching };
};

export default useProducts;
