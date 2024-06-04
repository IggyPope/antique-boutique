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
  const { data, error, isFetching } = useGetFilteredProductsQuery({
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

  return { products: data, error, isFetching };
};

export default useProducts;
