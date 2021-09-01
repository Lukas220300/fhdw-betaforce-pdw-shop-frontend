import {AxiosRequestConfig} from "axios";
import AbstractRepository from "~/composable/api/repositories/abstractRepository";
import {User} from "~/composable/api/interfaces/user";

export class UserRepository extends AbstractRepository<User> {
  protected baseUrl = '/users'

  findAll(config?: AxiosRequestConfig): Promise<User[]> {
    return this.httpClient.$get(this.baseUrl+'?size=1000',config)
  }
}
