import {User} from "~/composable/api/interfaces/user";
import {OrderItem} from "~/composable/api/interfaces/orderItem";

export interface Order {
  id: number
  createdAt: string
  orderItemList: Array<OrderItem>
  status: string
  user?: User
}
