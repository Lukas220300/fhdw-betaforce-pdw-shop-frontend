import AbstractRepository from "~/composable/api/repositories/abstractRepository";
import {User} from "~/composable/api/interfaces/user";

export class UserRepository extends AbstractRepository<User> {
  protected baseUrl = '/users'
}
