import {AxiosRequestConfig} from "axios";
import AbstractRepository from "~/composable/api/repositories/abstractRepository";
import {Order} from "~/composable/api/interfaces/Order";

export class OrderRepository extends AbstractRepository<Order> {
  protected baseUrl = '/orders'

  findByMe(config?: AxiosRequestConfig): Promise<Order[]>
  {
    return this.httpClient.$get('api/orders/me', config)
  }

  findAll(config?: AxiosRequestConfig): Promise<Order[]> {
    return this.httpClient.$get(this.baseUrl + '?size=10000',config)
  }
}
