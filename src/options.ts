import { Collections, Options, ResolvedCollectionOptions, ResolvedOptions } from './types'
import { slash } from './utils'
import fs from 'fs-extra'
import path from 'path'
// import fs from 'fs-extra'
// import fg from 'fast-glob'
// import matter from 'gray-matter'

export async function resolveOptions(options: Options, root: string = process.cwd()): Promise<ResolvedOptions> {
  let collections: Collections<ResolvedCollectionOptions> = {}

  for (const collectionKey in options.collections) {
    let collectionOptions: Partial<ResolvedCollectionOptions> = options.collections[collectionKey]

    if (collectionOptions.source) {
      const fullpath = slash(path.resolve(root, collectionOptions.source))
      collectionOptions.fullpath = fullpath

      const stat = fs.statSync(fullpath)

      if (stat.isDirectory()) {
        collectionOptions.isDirectory = true

        // const files = await fg(`${collectionOptions.fullpath}/*.md`, {
        //   onlyFiles: true,
        // })

        // collectionOptions.mdFilesContent = files.map(file => {
        //   const md = fs.readFileSync(file, 'utf-8')
        //   const { data } = matter(md)
        //   return JSON.stringify(data)
        // })
      } else if (stat.isFile()) {
        collectionOptions.isFile = true
      }
    }

    collections[collectionKey] = collectionOptions as ResolvedCollectionOptions
  }

  return {
    collections,
    relations: null,
    ...options,
  } as ResolvedOptions
}
