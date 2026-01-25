// import {useMemo} from "react";
import Table, {type Column} from "../../../components/ui/grid/table.tsx";

// interface ProductCategory {
//   id: string;
//   name: string;
//   description: string;
//   productCount: number;
// }

const ProductCategoryPage = () => {
  // mock data (replace with API later)
  // const categories: ProductCategory[] = useMemo(
  //   () => [
  //     {
  //       id: "electronics",
  //       name: "Electronics",
  //       description: "Mobile phones, laptops, gadgets, and accessories",
  //       productCount: 128,
  //     },
  //     {
  //       id: "fashion",
  //       name: "Fashion",
  //       description: "Clothing, shoes, and lifestyle products",
  //       productCount: 86,
  //     },
  //     {
  //       id: "home",
  //       name: "Home & Kitchen",
  //       description: "Furniture, appliances, and home essentials",
  //       productCount: 54,
  //     },
  //     {
  //       id: "sports",
  //       name: "Sports & Fitness",
  //       description: "Fitness gear, sportswear, and accessories",
  //       productCount: 42,
  //     },
  //   ],
  //   []
  // );

  type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
  };

  const columns: Column<Product>[] = [
    {dataIndex: "name", header: "Product Name"},
    {
      dataIndex: "price",
      header: "Price",
      render: (val) => `$${val}`,
      onCellClick: (val, row) => alert(`Price clicked: $${val} (${row.name})`)
    },
    {
      dataIndex: "image",
      header: "Image",
      render: (val) => <img src={val as string} alt="product" className="w-16 h-16 object-cover"/>,
      onCellClick: (val, row) => console.log("Image clicked", row, val)
    },
  ];

  const data: Product[] = [
    {id: 1, name: "Shoes", price: 50, image: "/images/shoes.jpg"},
    {id: 2, name: "Hat", price: 20, image: "/images/hat.jpg"},
  ];

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
      <Table
        columns={columns}
        data={data}
        onRowClick={(row: Product) => console.log("Row clicked:", row)}
      />
      {/* Categories grid */}
      {/*<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">*/}
      {/*  {categories.map((category) => (*/}
      {/*    <div*/}
      {/*      key={category.id}*/}
      {/*      className="group border rounded-lg bg-white p-4 hover:shadow-md transition-all cursor-pointer"*/}
      {/*    >*/}
      {/*      <div className="flex items-start gap-3">*/}
      {/*        <div*/}
      {/*          className="w-10 h-10 rounded-md bg-justgo-green/10 text-justgo-green flex items-center justify-center">*/}
      {/*          <Tag size={18}/>*/}
      {/*        </div>*/}

      {/*        <div className="flex-1">*/}
      {/*          <h3 className="font-semibold text-gray-800 group-hover:text-justgo-green">*/}
      {/*            {category.name}*/}
      {/*          </h3>*/}
      {/*          <p className="text-sm text-gray-500 line-clamp-2">*/}
      {/*            {category.description}*/}
      {/*          </p>*/}
      {/*        </div>*/}
      {/*      </div>*/}

      {/*      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">*/}
      {/*        <div className="flex items-center gap-1">*/}
      {/*          <PackageOpen size={14}/>*/}
      {/*          <span>{category.productCount} products</span>*/}
      {/*        </div>*/}

      {/*        <span className="text-justgo-green font-medium group-hover:underline">*/}
      {/*          View*/}
      {/*        </span>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  ))}*/}
      {/*</div>*/}
    </div>
  );
};

export default ProductCategoryPage;
