import {NuxtAxiosInstance} from "@nuxtjs/axios";
import {UserRepository} from "~/composable/api/repositories/userRepository";
import {CategoryRepository} from "~/composable/api/repositories/categoryRepository";
import {UnitRepository} from "~/composable/api/repositories/unitRepository";
import {ProductRepository} from "~/composable/api/repositories/productRepository";
import {ProductVariantRepository} from "~/composable/api/repositories/productVariantRepository";

let repositories: {
  user: UserRepository,
  category: CategoryRepository,
  unit: UnitRepository,
  product: ProductRepository,
  productVariant: ProductVariantRepository,
} | null = null

const createRepositories = ($axios: NuxtAxiosInstance) => ({
  user: new UserRepository($axios),
  category: new CategoryRepository($axios),
  unit: new UnitRepository($axios),
  product: new ProductRepository($axios),
  productVariant: new ProductVariantRepository($axios),
})

export const useApi = ($axios: NuxtAxiosInstance) => {
  if (!$axios) {
    throw new Error('$axios Missing')
  }

  if (repositories === null) {
    repositories = createRepositories($axios)
  }

  return repositories
}
