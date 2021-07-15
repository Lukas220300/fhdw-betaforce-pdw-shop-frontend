import {ProductVariant} from "~/composable/api/interfaces/productVariant";

export interface Unit {
  id: string
  title: string
  amount: string
  numberOfContainer: string
  productVariants?: ProductVariant []
}
