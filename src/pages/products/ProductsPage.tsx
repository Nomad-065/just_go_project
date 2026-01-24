import {Link} from "react-router-dom";
import {useProducts} from "../../hooks/useProducts.ts";
import FullPageLoader from "../../components/ui/loading/full-page-loader.tsx";

// Sample dummy products

const ProductsPage = () => {
  const {useGetAllProductsInfinite} = useProducts();

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAllProductsInfinite({
    limit: 20, // first 20 products
    options: {enabled: true}
  });
  if (isLoading) return <FullPageLoader message="Loading products..."/>;

  if (isError) return <div className="p-8 text-center text-red-600">{(error as Error).message}</div>;

  const products = data?.pages.flatMap(page => page.products) || [];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 flex flex-col items-center justify-between">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">
        Our Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 overflow-y-auto">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg transition"
          >
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-32 h-32 object-cover mb-4 rounded"
            />
            <h2 className="text-lg font-semibold text-gray-800 text-center mb-2">
              {product.title}
            </h2>
            <p className="text-indigo-600 font-bold mb-4">${product.price}</p>
            <Link
              to={`/products/${product.id}`}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

      {/* Load more button */}
      {hasNextPage && (
        <div className="mt-8 text-center">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
