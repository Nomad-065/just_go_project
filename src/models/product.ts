import type {BaseEntity} from "./base-entity.ts";
import type {Dimensions} from "./dimensions.ts";
import type {Review} from "./review.ts";
import type {Meta} from "./meta.ts";

export interface Product extends BaseEntity {
  title: string;
  description: string;
  category: string;

  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;

  tags: string[];
  brand: string;
  sku: string;
  weight: number;

  dimensions: Dimensions;

  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string

  reviews: Review[];

  returnPolicy: string;
  minimumOrderQuantity: number;

  meta: Meta;

  thumbnail: string;
  images: string[];
}