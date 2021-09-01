import AbstractRepository from "~/composable/api/repositories/abstractRepository";
import {ProductVariant} from "~/composable/api/interfaces/productVariant";
import {AxiosRequestConfig} from "axios";
import {Product} from "~/composable/api/interfaces/product";

export class ProductVariantRepository extends AbstractRepository<ProductVariant> {
  baseUrl = '/productVariants'

  getProductToVariant(productVariantId: number, config: AxiosRequestConfig): Promise<Product>
  {
    return this.httpClient.$get(this.baseUrl+'/'+productVariantId+'/product', config)
  }
}
