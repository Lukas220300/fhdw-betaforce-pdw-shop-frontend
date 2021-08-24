import AbstractRepository from "~/composable/api/repositories/abstractRepository";
import {OrderItem} from "~/composable/api/interfaces/orderItem";

export class OrderItemRepository extends AbstractRepository<OrderItem> {
  protected baseUrl = '/orderItems'

}
