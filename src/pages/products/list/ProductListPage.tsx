import {useProducts} from "../../../hooks/useProducts.ts";
import LoadingOverlay from "../../../components/ui/loading/loading-overlay.tsx";
import Table, {type Column} from "../../../components/ui/table/table.tsx";
import type {Product} from "../../../models/product.ts";
import {useProductFilterStore} from "../../../store/product-filter-store.ts";
import ImageWithSkeleton from "../../../components/ui/images/image-with-skeleton.tsx";
import {useToast} from "../../../hooks/useToast.tsx";
import {useEffect} from "react";
import PrimaryButton from "../../../components/ui/button/primary-button.tsx";
import {useCurrency} from "../../../hooks/useCurrency.ts";
import {useNavigate} from "react-router-dom";
// import {useState} from "react";


const ProductListPage = () => {
  const {useGetAllProductsInfinite} = useProducts();
  const {showToast, ToastComponent} = useToast();
  const {currencySymbol} = useCurrency();
  const navigate = useNavigate();
  // const [filter, setFilter] = useState<string>('');
  const filter = useProductFilterStore(state => state.filter);
  const setFilter = useProductFilterStore(state => state.setFilter);

  const sortBy = useProductFilterStore((state) => state.sortBy);
  const order = useProductFilterStore((state) => state.order);
  const toggleSortBy = useProductFilterStore((state) => state.toggleSortBy);


  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAllProductsInfinite({
    limit: 20,
    select: 'id,title,brand,thumbnail,price,rating,availabilityStatus',
    sortBy,
    order,
    options: {enabled: true}
  });

  // if (isError) return <div className="p-8 text-center text-red-600">{(error as Error).message}</div>;

  const columns: Column<Product, keyof Product>[] = [
    {
      dataIndex: "id",
      header: "ID",
      width: 60,
      minWidth: 50,
      align: 'right',
    },
    {
      dataIndex: "title",
      header: "Product Title",
      render: (val) => val as string ?? 'N/A',
    },
    {
      dataIndex: 'brand',
      header: 'Brand',
      render: (val) => val as string ?? 'Unknown Brand',
    },
    {
      dataIndex: "thumbnail",
      header: "Thumbnail",
      align: 'center',
      // render: (val) => <img src={val as string} alt="product" className="w-16 h-16 rounded-md bg-white"/>,
      render: (val) => {

        return (
          <div className={'flex items-center justify-center'}>
            <ImageWithSkeleton src={val as string} alt="product" className="w-16 h-16 rounded-md bg-white"/>
          </div>
        );
      },
    },
    {
      dataIndex: "price",
      header: "Price",
      align: 'center',
      render: (val) => val != null ? `${currencySymbol}${val}` : 'N/A',
    },
    {
      dataIndex: "rating",
      header: "Rating",
      render: (val) => val as string ?? 'N/A',
    },
    {
      dataIndex: 'availabilityStatus',
      header: "Availability Status",
      render: (val) => val as string ?? 'N/A',
    }

  ];

  const products = data?.pages.flatMap(page => page.products) || [];

  const filteredProducts = products.filter(product => {
    if (!filter.trim()) return true;
    const lower = filter.toLowerCase();
    return (
      product.title.toLowerCase().includes(lower)
    );
  });

  useEffect(() => {
    if (isError && error) {
      showToast(error.message ?? "Failed to load products", "error");
    }
  }, [isError, error, showToast]);

  return (
    <div className="flex flex-col gap-2 p-4 h-full w-full relative">
      {ToastComponent}
      <LoadingOverlay visible={isLoading}/>
      <div className="flex w-full items-end justify-between">
        <div className="flex flex-col sm:flex-row w-fit items-center justify-center gap-2">
          <h1 className="text-2xl font-bold text-white bg-justgo-green px-3 py-1 rounded-full text-center">
            Product List
          </h1>
          <p> Browse through our products </p>
        </div>
        <PrimaryButton
          slim
          className={'h-8 w-58'}
          onClick={() => toggleSortBy("price")}
        >
          {sortBy === "price"
            ? `Sorting by price (${order === "asc" ? "↑" : "↓"})`
            : "Default Sorting"}
        </PrimaryButton>
      </div>
      <Table
        columns={columns}
        data={filteredProducts}
        onRowClick={(row: Product) => {
          navigate(`/products/${row.id}`);
        }}
        filterValue={filter}
        onFilterValueChange={(value) => {
          setFilter(value);
        }}
        onScrollEnd={() => {
          if (!isFetchingNextPage && hasNextPage) {
            fetchNextPage()
          }
        }}
        loading={isLoading || isFetchingNextPage}
        emptyText={'No products found'}
      />
    </div>
  );
};

export default ProductListPage;
