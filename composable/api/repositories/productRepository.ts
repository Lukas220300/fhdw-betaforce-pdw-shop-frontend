import AbstractRepository from "~/composable/api/repositories/abstractRepository";
import {Product} from "~/composable/api/interfaces/product";

export class ProductRepository extends AbstractRepository<Product> {
  baseUrl = '/api/products'
}
