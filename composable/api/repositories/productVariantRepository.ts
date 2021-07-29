import AbstractRepository from "~/composable/api/repositories/abstractRepository";
import {ProductVariant} from "~/composable/api/interfaces/productVariant";

export class ProductVariantRepository extends AbstractRepository<ProductVariant> {
  baseUrl = '/api/product_variants'
}
