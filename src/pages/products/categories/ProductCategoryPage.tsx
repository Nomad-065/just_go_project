import {useMemo} from "react";
import {Tag, PackageOpen} from "lucide-react";

interface ProductCategory {
  id: string;
  name: string;
  description: string;
  productCount: number;
}

const ProductCategoryPage = () => {
  // mock data (replace with API later)
  const categories: ProductCategory[] = useMemo(
    () => [
      {
        id: "electronics",
        name: "Electronics",
        description: "Mobile phones, laptops, gadgets, and accessories",
        productCount: 128,
      },
      {
        id: "fashion",
        name: "Fashion",
        description: "Clothing, shoes, and lifestyle products",
        productCount: 86,
      },
      {
        id: "home",
        name: "Home & Kitchen",
        description: "Furniture, appliances, and home essentials",
        productCount: 54,
      },
      {
        id: "sports",
        name: "Sports & Fitness",
        description: "Fitness gear, sportswear, and accessories",
        productCount: 42,
      },
    ],
    []
  );

  return (
    <div className="flex flex-col gap-6 p-6 h-full">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-justgo-green">
            Product Categories
          </h1>
          <p className="text-sm text-gray-500">
            Manage and browse product categories
          </p>
        </div>
      </div>

      {/* Categories grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="group border rounded-lg bg-white p-4 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-md bg-justgo-green/10 text-justgo-green flex items-center justify-center">
                <Tag size={18}/>
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 group-hover:text-justgo-green">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {category.description}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <PackageOpen size={14}/>
                <span>{category.productCount} products</span>
              </div>

              <span className="text-justgo-green font-medium group-hover:underline">
                View
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategoryPage;
