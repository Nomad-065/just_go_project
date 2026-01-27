// import {useMemo} from "react";
import Table, {type Column} from "../../../components/ui/table/table.tsx";
import {useState} from "react";

// interface ProductCategory {
//   id: string;
//   name: string;
//   description: string;
//   productCount: number;
// }

const ProductCategoryPage = () => {

  const [filter, setFilter] = useState<string>('');
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
    {
      dataIndex: "id",
      header: "Product ID",
      width: 120,
      minWidth: 100,
      align: 'right',
    },
    {
      dataIndex: "name",
      header: "Product Name",
      flex: 2,
      minWidth: 100,
    },
    {
      dataIndex: "price",
      header: "Price",
      align: 'center',
      flex: 3,
      // minWidth: 100,
      render: (val) => `$${val}`,
      onCellClick: (val, row) => alert(`Price clicked: $${val} (${row.name})`)
    },
    {
      dataIndex: "image",
      // minWidth: 400,
      header: "Image",
      render: (val) => <img src={val as string} alt="product" className="w-16 h-16 object-cover"/>,
      onCellClick: (val, row) => console.log("Image clicked", row, val)
    },
  ];

  const data: Product[] = [
    {id: 1, name: "Shoes", price: 50, image: "/images/shoes.jpg"},
    {id: 2, name: "Hat", price: 20, image: "/images/hat.jpg"},
    {id: 3, name: "Shoes", price: 50, image: "/images/shoes.jpg"},
    {id: 4, name: "Hat", price: 20, image: "/images/hat.jpg"},
    {id: 5, name: "Shoes", price: 50, image: "/images/shoes.jpg"},
    {id: 6, name: "Hat", price: 20, image: "/images/hat.jpg"},
    {id: 7, name: "Shoes", price: 50, image: "/images/shoes.jpg"},
    {id: 8, name: "Hat", price: 20, image: "/images/hat.jpg"},
    {id: 9, name: "Shoes", price: 50, image: "/images/shoes.jpg"},
    {id: 10, name: "Hat", price: 20, image: "/images/hat.jpg"},
    {id: 11, name: "Shoes", price: 50, image: "/images/shoes.jpg"},
    {id: 12, name: "Hat", price: 20, image: "/images/hat.jpg"},
    {id: 13, name: "Shoes", price: 50, image: "/images/shoes.jpg"},
    {id: 14, name: "Hat", price: 20, image: "/images/hat.jpg"},
    {id: 15, name: "Shoes", price: 50, image: "/images/shoes.jpg"},
    {id: 16, name: "Hat", price: 20, image: "/images/hat.jpg"},
    {id: 17, name: "Shoes", price: 50, image: "/images/shoes.jpg"},
    {id: 18, name: "Hat", price: 20, image: "/images/hat.jpg"},
    {id: 19, name: "Shoes", price: 50, image: "/images/shoes.jpg"},
    {id: 20, name: "Hat", price: 20, image: "/images/hat.jpg"},
    {id: 21, name: "Shoes", price: 50, image: "/images/shoes.jpg"},
    {id: 22, name: "Hat", price: 20, image: "/images/hat.jpg"},
    {id: 23, name: "Shoes", price: 50, image: "/images/shoes.jpg"},
    {id: 24, name: "Hat", price: 20, image: "/images/hat.jpg"},
    {id: 25, name: "Shoes", price: 50, image: "/images/shoes.jpg"},
    {id: 26, name: "Hat", price: 20, image: "/images/hat.jpg"},
    {id: 27, name: "Shoes", price: 50, image: "/images/shoes.jpg"},
    {id: 28, name: "Hat", price: 20, image: "/images/hat.jpg"},
    {id: 29, name: "Shoes", price: 50, image: "/images/shoes.jpg"},
    {id: 30, name: "Hat", price: 20, image: "/images/hat.jpg"},
  ];
  console.log('filter', filter)
  return (
    <div className="flex flex-col gap-2 p-4 h-full w-full">
      <div className="flex w-full items-center justify-center">
        <div>
          <h1 className="text-2xl font-bold text-white bg-justgo-green px-2 py-1 rounded-full text-center">
            Product Categories
          </h1>
          <p>
            Manage and browse product categories
          </p>
        </div>
      </div>
      <Table
        columns={columns}
        data={data}
        onRowClick={(row: Product) => console.log("Row clicked:", row)}
        onFilterValueChange={(value) => {
          setFilter(value);
        }}
        onScrollEnd={() => {
          console.log('ending')
        }}
        loading={false}
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
