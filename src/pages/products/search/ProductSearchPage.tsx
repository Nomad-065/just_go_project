import {useMemo, useState} from "react";
import {Search, X, Package} from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
}

const mockProducts: Product[] = [
  {id: "1", name: "Wireless Headphones", category: "Electronics", price: 120},
  {id: "2", name: "Running Shoes", category: "Sports", price: 85},
  {id: "3", name: "Office Chair", category: "Home", price: 210},
  {id: "4", name: "Smart Watch", category: "Electronics", price: 150},
  {id: "5", name: "Yoga Mat", category: "Sports", price: 30},
];

const ProductSearchPage = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");

  const categories = useMemo(
    () => ["all", "Electronics", "Sports", "Home"],
    []
  );

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesQuery = product.name
        .toLowerCase()
        .includes(query.toLowerCase());

      const matchesCategory =
        category === "all" || product.category === category;

      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  return (
    <div className="flex flex-col gap-6 p-6 h-full">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-justgo-green">
          Search Products
        </h1>
        <p className="text-sm text-gray-500">
          Find products by name or category
        </p>
      </div>

      {/* Search controls */}
      <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-lg shadow-sm">
        {/* Search input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-9 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-justgo-green"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={14}/>
            </button>
          )}
        </div>

        {/* Category filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-justgo-green"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "all" ? "All Categories" : cat}
            </option>
          ))}
        </select>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-auto">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2">
            <Package size={40}/>
            <p>No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg bg-white p-4 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {product.category}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="font-semibold text-justgo-green">
                    ${product.price}
                  </span>
                  <button className="text-sm text-justgo-green hover:underline">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSearchPage;
