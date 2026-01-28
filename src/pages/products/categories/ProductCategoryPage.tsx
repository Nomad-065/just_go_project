import {useEffect, useState} from "react";
import {useProducts} from "../../../hooks/useProducts.ts";
import type {Category} from "../../../models/category.ts";
import {cn} from "../../../utils/cn.ts";
import InputField from "../../../components/ui/input/input-field.tsx";
import {useToast} from "../../../hooks/useToast.tsx";
import GhostButton from "../../../components/ui/button/ghost-button.tsx";
import {ArrowBigLeft} from "lucide-react";
import type {Product} from "../../../models/product.ts";
import ImageWithSkeleton from "../../../components/ui/images/image-with-skeleton.tsx";


const ProductCategoryPage = () => {
  const {useGetAllCategories, useGetProductsByCategory} = useProducts()
  const {showToast, ToastComponent} = useToast();

  const [filter, setFilter] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const {data: categoryData, isLoading, isError, error} = useGetAllCategories();

  const {
    data: categoryProductsData,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
    error: errorProducts
  } = useGetProductsByCategory(selectedCategory?.slug || '');

  const categories: Category[] = categoryData || [];

  const products: Product[] = categoryProductsData?.products || [];

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(filter.toLowerCase())
  );


  useEffect(() => {
    if (isError && error) {
      showToast(error.message ?? "Failed to load categories", "error");
    }
    if (isErrorProducts && errorProducts) {
      showToast(errorProducts.message ?? "Failed to load products", "error");
    }
  }, [isError, error, isErrorProducts, errorProducts, showToast]);

  return (
    <div className="flex flex-col gap-2 p-4 h-full w-full">
      {ToastComponent}
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


      {/* Category cards */}
      {!selectedCategory ? (
        <>
          <div className="flex justify-center w-full">
            <InputField
              placeholder="Filter categories..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-start overflow-y-auto">
            {filteredCategories.length === 0 && (
              <div className="col-span-full text-center text-gray-500">
                No categories found
              </div>
            )}
            {filteredCategories.map((category, index) => (
              <div
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "flex flex-col h-20 items-center justify-center p-4 rounded-lg bg-justgo-green ",
                  "border border-white hover:shadow-lg hover:bg-justgo-blue transition-all cursor-pointer",
                )}
              >

                <span className="font-semibold text-center">{category.name}</span>
                <p className="text-sm text-center mt-1">{category.url}</p>
              </div>
            ))}
            {isLoading && (
              Array.from({length: 8}).map((_, idx) => (
                <div
                  key={`skeleton-${idx}`}
                  className="flex flex-col h-20 items-center justify-center p-4 rounded-lg bg-gray-300 animate-pulse"
                >
                  <div className="w-30 h-4 bg-gray-400 rounded mb-2"/>
                  <div className="w-26 h-3 bg-gray-400 rounded"/>
                </div>
              ))
            )}
          </div>
        </>

      ) : (
        <div className={'flex flex-col gap-2 h-full w-full border border-gray-300 rounded-lg p-2'}>
          <div className={'flex items-center justify-start gap-8'}>
            <GhostButton
              className={'w-30 h-8'}
              icon={ArrowBigLeft}
              onClick={() => {
                setSelectedCategory(null)
              }}>
              Go Back
            </GhostButton>
            <span className={'text-lg font-semibold'}>Category: {selectedCategory.name}</span>
          </div>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-start overflow-y-auto">
            {isLoadingProducts && products.length === 0 && (
              Array.from({length: 8}).map((_, idx) => (
                <div
                  key={`skeleton-${idx}`}
                  className="flex flex-col h-20 items-center justify-center p-4 rounded-lg bg-gray-300 animate-pulse"
                >
                  <div className="w-30 h-4 bg-gray-400 rounded mb-2"/>
                  <div className="w-26 h-3 bg-gray-400 rounded"/>
                </div>
              ))
            )}

            {products.map((product, index) => (
              <div
                key={index}
                className={cn(
                  "flex h-20 gap-8 items-center justify-between p-4 rounded-lg ",
                  "border-2 border-justgo-green hover:shadow-lg hover:bg-justgo-blue transition-all cursor-pointer",
                )}
              >
                <ImageWithSkeleton
                  src={product.thumbnail}
                  alt="Product Image"
                  className={'h-18 w-18 rounded-md object-contain flex-shrink-0 bg-black/20'}
                />
                <div className={'flex flex-col w-full'}>
                  <span className="font-semibold ">{product.title}</span>
                  <p className="text-sm mt-1">{product.brand}</p>
                </div>
              </div>
            ))}

          </div>
        </div>
      )}

    </div>
  );
};

export default ProductCategoryPage;
