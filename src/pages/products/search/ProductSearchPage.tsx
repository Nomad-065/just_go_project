import {useEffect,} from "react";
import {SearchIcon} from "lucide-react";
import InputField from "../../../components/ui/input/input-field.tsx";
import PrimaryButton from "../../../components/ui/button/primary-button.tsx";
import Table, {type Column} from "../../../components/ui/table/table.tsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useCurrency} from "../../../hooks/useCurrency.ts";
import {useToast} from "../../../hooks/useToast.tsx";
import {useProducts} from "../../../hooks/useProducts.ts";
import type {Product} from "../../../models/product.ts";
import ImageWithSkeleton from "../../../components/ui/images/image-with-skeleton.tsx";
import {useProductSearchStore} from "../../../store/product-search-store.ts";


const ProductSearchPage = () => {
  const {useSearchProductsInfinite} = useProducts();
  const {showToast, ToastComponent} = useToast();
  const {currencySymbol} = useCurrency();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = useProductSearchStore(state => state.query);
  const setQuery = useProductSearchStore(state => state.setQuery);
  const filter = useProductSearchStore(state => state.filter);
  const setFilter = useProductSearchStore(state => state.setFilter);

  const sortBy = useProductSearchStore((state) => state.sortBy);
  const setSortBy = useProductSearchStore(state => state.setSortBy);
  const order = useProductSearchStore((state) => state.order);
  const setOrder = useProductSearchStore(state => state.setOrder);
  const toggleSortBy = useProductSearchStore((state) => state.toggleSortBy);

  const limit = useProductSearchStore((state) => state.limit);
  const setLimit = useProductSearchStore(state => state.setLimit);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSearchProductsInfinite({
    q: query,
    limit: limit,
    select: 'id,title,brand,thumbnail,price,rating,availabilityStatus',
    sortBy,
    order,
    options: {enabled: true}
  });


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

  useEffect(() => {
    const params: Record<string, string> = {};

    if (query) params.q = query;
    if (filter) params.filter = filter;
    if (sortBy) params.sortBy = sortBy;
    if (order) params.order = order;
    if (limit) params.limit = String(limit);

    setSearchParams(params, {replace: true});
  }, [query, filter, sortBy, order, setSearchParams, limit]);

  useEffect(() => {
    const query = searchParams.get("q") ?? "";
    const filter = searchParams.get("filter") ?? "";
    const sortBy = searchParams.get("sortBy") ?? "";
    const order = searchParams.get("order") ?? "";
    const limit = searchParams.get("limit") ?? 0;

    setQuery(query);
    setFilter(filter);
    setSortBy(sortBy)
    if (limit) {
      const parsedLimit = Number(limit);
      if (!Number.isNaN(parsedLimit)) {
        setLimit(parsedLimit);
      }
    }

    if (order === "asc" || order === "desc") {
      setOrder(order);
    }
  }, [searchParams, setFilter, setLimit, setOrder, setQuery, setSortBy]);

  // console.log('searchParams', searchParams)
  return (
    <div className="flex flex-col gap-6 p-6 h-full">
      {ToastComponent}
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white bg-justgo-green px-2 py-1 rounded-full text-center w-fit">
          Search Products

        </h1>
        <p>
          Find products by name or category
        </p>
      </div>

      {/* Search controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white/20 p-4 rounded-lg shadow-lg">
        <div className={'flex gap-4 items-center'}>
          <InputField
            parentClassName={'w-40 sm:w-80'}
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <PrimaryButton
            slim
            className={'w-36 '}
            disabled={!query}
            onClick={() => setQuery("")}
            icon={SearchIcon}
          >
            Search
          </PrimaryButton>
        </div>
        <PrimaryButton
          slim
          className={' w-58'}
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

export default ProductSearchPage;
