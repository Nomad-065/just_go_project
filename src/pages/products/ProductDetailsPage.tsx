import {useCurrency} from "../../hooks/useCurrency.ts";
import ImageWithSkeleton from "../../components/ui/images/image-with-skeleton.tsx";
import {ArrowBigLeft, StarIcon} from "lucide-react";
import {useNavigate, useParams} from "react-router-dom";
import {useProducts} from "../../hooks/useProducts.ts";
import {cn} from "../../utils/cn.ts";
import LoadingOverlay from "../../components/ui/loading/loading-overlay.tsx";
import {useToast} from "../../hooks/useToast.tsx";
import {useEffect, useState} from "react";
import GhostButton from "../../components/ui/button/ghost-button.tsx";


const ProductDetailsPage = () => {
  const {id} = useParams<{ id: string }>();
  const {useFetchProductById} = useProducts();
  const {currencySymbol} = useCurrency();
  const {showToast, ToastComponent} = useToast();
  const navigate = useNavigate();

  const [activeImage, setActiveImage] = useState<number>(0);

  const productID = Number(id);

  const {
    data: productData,
    isLoading,
    isError,
    error,
  } = useFetchProductById(productID);

  useEffect(() => {
    if (isError && error) {
      showToast(error.message ?? "Failed to load product details", "error");
    }
  }, [isError, error, showToast]);

  // console.log('productData', productData)

  return (
    <div className={'flex flex-col flex-1 w-full items-center justify-start p-4 overflow-hidden relative'}>
      {ToastComponent}
      <LoadingOverlay visible={isLoading}/>
      <div className="w-full max-w-5xl h-full flex flex-col items-start gap-8 overflow-y-auto">
        <div
          className={'h-fit flex-shrink-0 flex flex-col sm:flex-row w-full  items-start gap-8 border border-gray-300 p-4 rounded-lg overflow-hidden'}>
          {/* Product Images */}
          <div
            className="w-full sm:w-1/2 flex flex-col items-start gap-2 p-2 bg-black/10 rounded-lg overflow-hidden flex-shrink-0">
            <GhostButton
              className={'w-30 h-8 '}
              icon={ArrowBigLeft}
              onClick={() => {
                navigate('/products');
              }}
            >
              Go Back
            </GhostButton>
            <ImageWithSkeleton
              src={productData?.images[activeImage]}
              alt={productData?.title}
              className="w-full rounded-lg bg-white"
            />
            <div className="flex gap-2 h-26 w-full overflow-x-auto overflow-y-hidden whitespace-nowrap p-1">
              {productData?.images.map((img, idx) => (
                <div
                  className={cn('aspect-square h-20 bg-white/20 rounded-md cursor-pointer flex-shrink-0',
                    idx === activeImage && "ring-2 ring-justgo-green"
                  )}
                  onClick={() => setActiveImage(idx)}
                >
                  <ImageWithSkeleton
                    key={idx}
                    src={img}
                    alt={`${productData.title} ${idx + 1}`}
                    className="h-full w-full"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full sm:w-1/2 flex flex-col gap-4">
            <h1 className="text-2xl font-bold">{productData?.title}</h1>
            <p className="font-medium">Brand: {productData?.brand ?? 'Unknown Brand'}</p>
            <p className="font-medium">SKU: {productData?.sku ?? 'N/A'}</p>

            <div className="flex items-center gap-2">
          <span className="text-xl font-bold">
            {currencySymbol} {productData?.price.toFixed(2)}
          </span>
              <span className="flex items-center gap-1 text-yellow-400">
            {Array.from({length: 5}).map((_, i) => (
              <StarIcon
                key={i}
                className={cn('w-5 h-5',
                  i < Math.floor(productData?.rating ?? 0) ? "stroke-yellow-400 fill-amber-400" : "text-gray-300"
                )}
              />
            ))}
                <span className="text-gray-500 ml-1">({productData?.rating})</span>
          </span>
            </div>

            <p className="bg-justgo-green/10 rounded-lg p-1 px-2">{productData?.description}</p>
            {productData?.tags && productData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {productData.tags.map((tag) => (
                  <div
                    key={tag}
                    className="px-2 py-1 text-xs rounded-md bg-justgo-green text-white place-content-center"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-center justify-start gap-2">
              <span className="p-1 px-2">Stock: {productData?.stock ?? 'N/A'}</span>
              <span
                className={cn('font-semibold bg-white rounded-md w-fit px-2',
                  productData?.availabilityStatus === "In Stock" ? "text-green-600" : "text-red-600"
                )}
              >
              {productData?.availabilityStatus}
            </span>
            </div>
            <div className="flex flex-col items-start justify-start rounded-lg p-1 px-2 border border-gray-300">
              <span className="text-sm font-semibold mb-1">Product Specifications</span>
              <span className="text-sm">Weight: {productData?.weight ?? 'N/A'}</span>
              <span className="text-sm">
              Dimensions: {productData?.dimensions
                ? `W: ${productData.dimensions.width} × H: ${productData.dimensions.height} × D: ${productData.dimensions.depth}`
                : 'N/A'}
            </span>
            </div>
            <div className="flex flex-col items-start justify-start rounded-lg p-1 px-2 border border-gray-300">
              <span className="text-sm font-semibold mb-1">Policy Information</span>
              <span className="text-sm">Min Order: {productData?.minimumOrderQuantity ?? 'N/A'}</span>
              <span className="text-sm">Warranty: {productData?.warrantyInformation ?? 'N/A'}</span>
              <span className="text-sm">Shipping: {productData?.shippingInformation ?? 'N/A'}</span>
              <span className="text-sm">Return Policy: {productData?.returnPolicy ?? 'N/A'}</span>
            </div>


          </div>
        </div>

        <div className="w-full flex flex-col rounded-lg bg-justgo-blue/20 p-4 gap-3">
          <span className="font-semibold ">Customer Reviews</span>

          {productData?.reviews?.length ? (
            <div className="flex flex-col gap-3 overflow-y-auto">
              {productData.reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="flex flex-col gap-1 rounded-md bg-white/30 p-3"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">
                      {review.reviewerName}
                    </span>
                    <span className="text-xs">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 text-sm">
                    {/*<span className="font-semibold">{review.rating}/5</span>*/}
                    {Array.from({length: 5}).map((_, i) => (
                      <StarIcon
                        key={i}
                        className={cn('w-5 h-5',
                          i < Math.floor(review?.rating ?? 0) ? "stroke-yellow-400 fill-amber-400" : "text-gray-300"
                        )}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-sm  ">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm ">
              No reviews available
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProductDetailsPage;