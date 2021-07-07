import {NuxtAxiosInstance} from "@nuxtjs/axios";
import {UserRepository} from "~/composable/api/repositories/userRepository";
import {CategoryRepository} from "~/composable/api/repositories/categoryRepository";

let repositories: {
  user: UserRepository,
  category: CategoryRepository,
} | null = null

const createRepositories = ($axios: NuxtAxiosInstance) => ({
  user: new UserRepository($axios),
  category: new CategoryRepository($axios),
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
