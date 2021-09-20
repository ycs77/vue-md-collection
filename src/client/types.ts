import { App } from 'vue'

export type RelationKeys = string[]

export type DefineRelation = {
  hasMany(relations: string[]): RelationKeys
  hasMany(...relations: string[]): RelationKeys
}

export type Model<T> = T & {
  prev(): Model<T> | null
  next(): Model<T> | null
}

export interface PaginatorLinks {
  //
}

export interface Paginator<TModel> {
  data(): Model<TModel>[]
  links(): PaginatorLinks
}

export interface Collection<TModel> {
  find(key: string, id: string): Model<TModel> | null
  all(): Model<TModel>[]
  paginate(perPage: number): Paginator<TModel>
}

export interface Collector {
  collection<TModel>(name: string): Collection<TModel> | null
  install(app: App): void
}
