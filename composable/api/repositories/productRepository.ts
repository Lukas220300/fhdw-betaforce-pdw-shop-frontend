import {AxiosRequestConfig} from "axios";
import AbstractRepository from "~/composable/api/repositories/abstractRepository";
import {Product} from "~/composable/api/interfaces/product";

export class ProductRepository extends AbstractRepository<Product> {
  baseUrl = '/api/products'

  findByCategoryId(categoryId: number, config?:AxiosRequestConfig): Promise<Product[]> {
    return this.httpClient.$get(this.baseUrl+'?category='+categoryId,config)
  }

}
