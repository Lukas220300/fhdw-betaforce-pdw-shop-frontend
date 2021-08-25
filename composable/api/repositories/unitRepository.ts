import AbstractRepository from "~/composable/api/repositories/abstractRepository";
import {Unit} from "~/composable/api/interfaces/unit";

export class UnitRepository extends AbstractRepository<Unit> {
  baseUrl = '/units'
}
