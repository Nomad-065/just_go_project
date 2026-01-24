import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex w-full h-full flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-50 to-white px-4 animate-fadeIn">
      {/* Main heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4">
        Welcome to our new
      </h1>

      {/* Highlighted subheading */}
      <p className="text-2xl md:text-3xl font-semibold text-indigo-600 text-center mb-6">
        Online Product Warehouse
      </p>

      {/* Description */}
      <p className="text-gray-700 text-center max-w-xl mb-8">
        Discover a wide range of products with seamless browsing and fast checkout.
        Start exploring our warehouse today!
      </p>

      {/* Get Started button */}
      <Link
        to="/products"
        className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-105"
      >
        Get Started
      </Link>
    </div>
  );
};

export default HomePage;
