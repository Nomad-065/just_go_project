import {useCurrency} from "../../hooks/useCurrency.ts";
import ImageWithSkeleton from "../../components/ui/images/image-with-skeleton.tsx";
import {StarIcon} from "lucide-react";
import OutlineButton from "../../components/ui/button/outline-button.tsx";

interface SampleProduct {
  id: number;
  title: string;
  brand: string;
  images: string[];
  price: number;
  rating: number;
  description: string;
  availabilityStatus: "In Stock" | "Out of Stock";
}

const sampleProduct: SampleProduct = {
  id: 123,
  title: "Smartphone XYZ",
  brand: "TechBrand",
  images: [
    "https://via.placeholder.com/300x300.png?text=Product+Image+1",
    "https://via.placeholder.com/300x300.png?text=Product+Image+2",
  ],
  price: 799,
  rating: 4.2,
  description:
    "This is a sample product description. It highlights key features and specifications of the product.",
  availabilityStatus: "In Stock",
};

const ProductDetailsPage = () => {
  const {currencySymbol} = useCurrency();

  return (
    <div className="max-w-5xl mx-auto p-4 flex flex-col md:flex-row gap-8">
      {/* Left: Product Images */}
      <div className="flex-1">
        <ImageWithSkeleton
          src={sampleProduct.images[0]}
          alt={sampleProduct.title}
          className="w-full h-80 md:h-[400px] rounded-lg"
          skeletonClassName="rounded-lg"
        />
        <div className="flex gap-2 mt-2">
          {sampleProduct.images.map((img, idx) => (
            <ImageWithSkeleton
              key={idx}
              src={img}
              alt={`${sampleProduct.title} ${idx + 1}`}
              className="w-20 h-20 rounded-md cursor-pointer object-cover"
              skeletonClassName="rounded-md"
            />
          ))}
        </div>
      </div>

      {/* Right: Product Info */}
      <div className="flex-1 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{sampleProduct.title}</h1>
        <p className="text-gray-600 font-medium">Brand: {sampleProduct.brand}</p>

        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">
            {currencySymbol} {sampleProduct.price.toFixed(2)}
          </span>
          <span className="flex items-center gap-1 text-yellow-400">
            {Array.from({length: 5}).map((_, i) => (
              <StarIcon
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(sampleProduct.rating) ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-gray-500 ml-1">({sampleProduct.rating})</span>
          </span>
        </div>

        <p className="text-gray-700">{sampleProduct.description}</p>

        <p
          className={`font-semibold ${
            sampleProduct.availabilityStatus === "In Stock" ? "text-green-600" : "text-red-600"
          }`}
        >
          {sampleProduct.availabilityStatus}
        </p>

        <OutlineButton className="w-40 h-10 mt-4" slim>
          Add to Cart
        </OutlineButton>
      </div>
    </div>
  );
};

export default ProductDetailsPage;