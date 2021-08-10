import {Product} from "~/composable/api/interfaces/product";
import {ProductVariant} from "~/composable/api/interfaces/productVariant";

export interface CartEntry {
  product: Product
  variant: ProductVariant
  amount: number
}
