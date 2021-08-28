import {AxiosRequestConfig} from "axios";
import AbstractRepository from "~/composable/api/repositories/abstractRepository";
import {Category} from "~/composable/api/interfaces/category";

export class CategoryRepository extends AbstractRepository<Category> {
  protected baseUrl = '/api/categories'

  addNew(object: Category, config?: AxiosRequestConfig): Promise<Category> {
    return this.httpClient.$post('/categories', object, config)
  }
}
