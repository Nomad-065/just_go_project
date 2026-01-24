import {Link} from "react-router-dom";

// Sample dummy products
const dummyProducts = [
  {
    id: 1,
    title: "Essence Mascara Lash Princess",
    price: 9.99,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Wireless Headphones",
    price: 59.99,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "Smart Watch",
    price: 129.99,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    title: "Running Shoes",
    price: 79.99,
    image: "https://via.placeholder.com/150",
  },
];

const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">
        Our Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dummyProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg transition"
          >
            <img
              src={product.image}
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
    </div>
  );
};

export default ProductsPage;
