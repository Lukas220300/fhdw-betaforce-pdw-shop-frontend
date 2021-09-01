import AbstractRepository from "~/composable/api/repositories/abstractRepository";
import {Role} from "~/composable/api/interfaces/role";

export class RoleRepository extends AbstractRepository<Role> {
  baseUrl = '/roles'
}
