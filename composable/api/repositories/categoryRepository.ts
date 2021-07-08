import {AxiosRequestConfig} from "axios";
import AbstractRepository from "~/composable/api/repositories/abstractRepository";
import {Category} from "~/composable/api/interfaces/category";

export class CategoryRepository extends AbstractRepository<Category> {
  protected baseUrl = '/api/categories'

  // TODO: remove this es-lint comment
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findAll(config?: AxiosRequestConfig): Promise<Category[]> {

    return new Promise<Category[]>((resolve) => {
      const cat = []

      const alcoholic: Category = {
        id: '1',
        title: 'Alkoholish',
        cover: 'categories/alcoholic.svg'
      }
      cat.push(alcoholic)

      const nonAlcoholic: Category = {
        id: '2',
        title: 'Nicht Alkoholish',
        cover: 'categories/nonAlcoholic.svg'
      }
      cat.push(nonAlcoholic)

      const spirits: Category = {
        id: '3',
        title: 'Spirituosen',
        cover: 'categories/alcoholic.svg'
      }
      cat.push(spirits)

      const softDrinks: Category = {
        id: '4',
        title: 'Soft Drinks',
        cover: 'categories/softDrinks.svg'
      }
      cat.push(softDrinks)

      const water: Category = {
        id: '5',
        title: 'Wasser',
        cover: 'categories/water.svg'
      }
      cat.push(water)

      const wine: Category = {
        id: '6',
        title: 'Wein',
        cover: 'categories/wine.svg'
      }
      cat.push(wine)

      const beer: Category = {
        id: '7',
        title: 'Bier',
        cover: 'categories/beer.svg'
      }
      cat.push(beer)

      const sparklingWine: Category = {
        id: '8',
        title: 'Sekt',
        cover: 'categories/sparklingWine.svg'
      }
      cat.push(sparklingWine)
      resolve(cat)
    })
  }

}
