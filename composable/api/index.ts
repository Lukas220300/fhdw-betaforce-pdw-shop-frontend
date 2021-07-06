import {NuxtAxiosInstance} from "@nuxtjs/axios";
import {UserRepository} from "~/composable/api/repositories/userRepository";

let repositories: {
  user: UserRepository
} | null = null

const createRepositories = ($axios: NuxtAxiosInstance) => ({
  user: new UserRepository($axios)
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
