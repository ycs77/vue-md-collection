import { DefineRelation, RelationKeys } from './client/types'

export interface CollectionOptions {
  /**
   * The collection source directory/file path.
   */
  source?: string

  /**
   * Will auto generate from relation or not.
   * @default false
   */
  auto?: boolean

  /**
   * If set the static option, copy directory/file directly.
   * @default false
   */
  static?: boolean
}

export interface ResolvedCollectionOptions extends CollectionOptions {
  fullpath?: string
  isDirectory?: boolean
  isFile?: boolean
  mdFilesContent?: string[]
}

export type Collections<T = CollectionOptions> = Record<string, T>

export interface Options<CollectionsInOptions = Collections> {
  /**
   * Define the collections.
   */
  collections?: CollectionsInOptions

  /**
   * Define the relations with collections.
   */
  relations?: ((defineRelation: DefineRelation) => Record<string, RelationKeys>) | null
}

export interface ResolvedOptions<CollectionsInOptions = Collections<ResolvedCollectionOptions>> extends Required<Options<CollectionsInOptions>> {
  //
}
