import {AxiosRequestConfig} from "axios";
import AbstractRepository from "~/composable/api/repositories/abstractRepository";
import {Product} from "~/composable/api/interfaces/product";

export class ProductRepository extends AbstractRepository<Product> {
  baseUrl = '/products'

  findByCategoryId(categoryId: number, config?:AxiosRequestConfig): Promise<Product[]> {
    return this.httpClient.$get(this.baseUrl+'/search/findByCategoryId?id='+categoryId,config)
  }

  findAll(config?: AxiosRequestConfig): Promise<Product[]> {
    return this.httpClient.$get(this.baseUrl+'?size=1000',config)
  }

}
