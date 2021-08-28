import {ProductVariant} from "~/composable/api/interfaces/productVariant";

export interface OrderItem {
  id: number,
  productVariant: ProductVariant
  quantity: number
}
