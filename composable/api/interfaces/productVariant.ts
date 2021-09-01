import { Unit } from "~/composable/api/interfaces/unit";

export interface ProductVariant {
  id: string
  stock: string
  price: string
  unit: Unit
  model?: number
}
