import AbstractRepository from "~/composable/api/repositories/abstractRepository";
import {Category} from "~/composable/api/interfaces/category";

export class CategoryRepository extends AbstractRepository<Category> {
  protected baseUrl = '/api/categories'
}
