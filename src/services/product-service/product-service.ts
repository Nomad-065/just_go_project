import {axiosClient} from "../axios-client.ts";
import type {Product} from "../../models/product.ts";
import type {Category} from "../../models/category.ts";

interface ProductQueryParams {
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: "asc" | "desc" | null;
  select?: string;
}

interface ProductAPIResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const useProductService = () => {
  // using this pattern will later allow us to drop in a authentication for API calls
  // const {axiosFetch} = useAuth();
  const productEndpoint = "/products"
  /** Fetch all products */
  const getAllProducts = async (params: ProductQueryParams = {}): Promise<ProductAPIResponse> => {


    const queryParams: Partial<ProductQueryParams> = {};
    if (params.limit !== undefined) queryParams.limit = params.limit;
    if (params.skip !== undefined) queryParams.skip = params.skip;
    if (params.sortBy) queryParams.sortBy = params.sortBy;
    if (params.order) queryParams.order = params.order;
    if (params.select) queryParams.select = params.select;

    const axiosResponse = await axiosClient.get<ProductAPIResponse>(productEndpoint, {params: queryParams});
    return axiosResponse.data;
  };

  /** Fetch all product categories */
  const getAllProductCategories = async (): Promise<Category[]> => {
    const axiosResponse = await axiosClient.get<Category[]>(`${productEndpoint}/categories`);
    return axiosResponse.data;
  };

  /** Fetch products by category */
  const getProductsByCategory = async (slug: string): Promise<ProductAPIResponse> => {
    const axiosResponse = await axiosClient.get<ProductAPIResponse>(`${productEndpoint}/category/${slug}`);
    return axiosResponse.data;
  };

  /** Fetch single product by ID */
  const getProductById = async (id: number): Promise<Product> => {
    const axiosResponse = await axiosClient.get<Product>(`${productEndpoint}/${id}`);
    return axiosResponse.data;
  };

  return {
    getAllProducts,
    getProductsByCategory,
    getAllProductCategories,
    getProductById,
  };
};