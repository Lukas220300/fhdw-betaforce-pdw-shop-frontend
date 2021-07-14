import {Category} from "~/composable/api/interfaces/category";
import {Quantity} from "~/composable/api/interfaces/quantity";

export interface Product {
  id: string
  category: Category
  cover: string
  title: string
  quantities: Quantity[]
}
