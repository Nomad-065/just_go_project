import {useInfiniteQuery, useQuery, useQueryClient} from "@tanstack/react-query";
import {useProductService} from "../services/product-service/product-service.ts";

export const useProducts = () => {
  const queryClient = useQueryClient();
  const {getAllProducts, getProductById} = useProductService();


  const useGetAllProductsInfinite = ({
                                       limit = 20,
                                       skip = 0,
                                       sortBy = "",
                                       order = "asc",
                                       select = "",
                                       options = {enabled: false},
                                     }: {
    limit?: number;
    skip?: number;
    sortBy?: string;
    order?: "asc" | "desc" | null;
    select?: string;
    options?: { enabled?: boolean; };
  } = {}) => {
    return useInfiniteQuery({
      queryKey: ["products", limit, skip, sortBy, order, select],
      queryFn: async ({pageParam = skip}: { pageParam?: number }) => {
        // pageParam is used as `skip` for the next page
        return getAllProducts({
          limit,
          skip: pageParam,
          sortBy,
          order,
          select,
        });
      },
      getNextPageParam: (lastPage) => {
        const nextSkip = lastPage.skip + lastPage.limit;
        return nextSkip < lastPage.total ? nextSkip : undefined;
      },
      initialPageParam: skip, // Start with no cursor
      staleTime: 10 * 60 * 1000,
      // gcTime: 30 * 60 * 1000,
      enabled: options.enabled ?? true,
    });
  };

  const useFetchProductById = (id: number) => {
    return useQuery({
      queryKey: ['product', id],
      queryFn: () => getProductById(id),
      enabled: !!id, // only runs if id is provided
      staleTime: 10 * 60 * 1000,  // 10 min
      gcTime: 30 * 60 * 1000, // 30 min
    });
  }

  // Function to invalidate all channel queries
  const invalidateProducts = () => {
    queryClient.invalidateQueries({queryKey: ['products']});
  };

  return {
    useGetAllProductsInfinite,
    useFetchProductById,
    invalidateProducts
  };
};
