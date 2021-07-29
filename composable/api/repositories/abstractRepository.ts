import {NuxtAxiosInstance} from "@nuxtjs/axios";
import {AxiosRequestConfig} from 'axios'

interface RepositoryInterface<T> {
  findAll(): Promise<T[]>
  findOneById(id: number): Promise<T>
}

export default abstract class AbstractRepository<T> implements RepositoryInterface<T>{
  protected readonly httpClient: NuxtAxiosInstance
  protected abstract baseUrl: string

  constructor(httpClient: NuxtAxiosInstance) {
    this.httpClient = httpClient
  }

  findAll(config?: AxiosRequestConfig): Promise<T[]> {
    return this.httpClient.$get(this.baseUrl,config)
  }

  findOneById(id: number, config?: AxiosRequestConfig): Promise<T> {
    return this.httpClient.$get(this.baseUrl+'/'+id,config)
  }

}
