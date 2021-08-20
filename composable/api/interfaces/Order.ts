import {User} from "~/composable/api/interfaces/user";

export interface Order {
  id: number
  createdAt: string
  orderItemList: Array<any>
  status: string
  user?: User
}
