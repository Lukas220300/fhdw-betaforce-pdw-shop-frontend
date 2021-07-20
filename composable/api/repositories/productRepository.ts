import {AxiosRequestConfig} from "axios";
import AbstractRepository from "~/composable/api/repositories/abstractRepository";
import {Product} from "~/composable/api/interfaces/product";

export class ProductRepository extends AbstractRepository<Product> {
  baseUrl = '/api/products'

  findOneById(id: number, _?:AxiosRequestConfig): Promise<Product> {
    return new Promise<Product>((resolve => {
      const product: Product = {
        id: id+'',
        category: {
          id: '5',
          title: 'Wasser',
        },
        cover: 'https://res.cloudinary.com/deloma/image/upload/q_85/v1/images/product/74099737-40c2-4dc0-bfd2-8a6e8230abf6.jpg',
        name: 'Merkur classic',
        variants: [
          {
            id: '1',
            stock: '20',
            price: '0.50',
            unit: {
              id: '1',
              title: 'Flasche',
              amount: '0.7',
              numberOfContainer: '1'
            },
          },
          {
            id: '2',
            stock: '2',
            price: '4.0',
            unit: {
              id: '2',
              title: 'Kiste',
              amount: '0.7',
              numberOfContainer: '12'
            },
          },
        ],
        producer: 'GV Getränke Vertriebs GmbH',
        allergens: 'A,B,E,F',
      }

      resolve(product)
    }))
  }

  findByCategoryId(categoryId: number, config?:AxiosRequestConfig): Promise<Product[]> {
    return this.httpClient.$get(this.baseUrl+'?category='+categoryId,config)
  }

}
