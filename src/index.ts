import path from 'path'
import type { Plugin } from 'vite'
import { Options, ResolvedOptions } from './types'
import { getCollectionFiles } from './files'
import { resolveOptions } from './options'
import { slash, debug } from './utils'
import { MODULE_IDS, MODULE_ID_VIRTUAL } from './constants'
// import { pathToFileURL } from 'url'
// import fs from 'fs-extra'
// import fg from 'fast-glob'
// import matter from 'gray-matter'

export default function collectionPlugin(userOptions: Options = {}): Plugin {
  let options: ResolvedOptions

  let generatedCollections: Map<string, any> | null = null
  let modulePath: string | null = null

  // userOptions.collections

  return {
    name: 'vite-plugin-vue-collection',
    enforce: 'pre',
    async configResolved({ root }) {
      options = await resolveOptions(userOptions, root)
      debug.options(options)
    },
    configureServer(server) {
      const { ws, watcher } = server

      watcher.on('add', (file) => {
        const path = slash(file)
        // if (isTarget(path, options)) {
        //   debug.hmr('add', path)
        //   fullReload()
        // }
      })
      watcher.on('unlink', (file) => {
        const path = slash(file)
        // if (isTarget(path, options)) {
        //   debug.hmr('remove', path)
        //   fullReload()
        // }
      })
      watcher.on('change', (file) => {
        const path = slash(file)
        // if (isTarget(path, options) && generatedRoutes) {
        //   const needReload = isRouteBlockChanged(path, options)
        //   if (needReload) {
        //     debug.hmr('change', path)
        //     fullReload()
        //   }
        // }
      })
    },
    resolveId(id) {
      return MODULE_IDS.includes(id) || MODULE_IDS.some(i => id.startsWith(i))
        ? MODULE_ID_VIRTUAL
        : null
    },
    async load(id) {
      if (id !== MODULE_ID_VIRTUAL) {
        return
      }

      if (!generatedCollections) {
        generatedCollections = new Map<string, any>()

        for (const collectionId in options.collections) {
          const collectionOptions = options.collections[collectionId]

          if (collectionOptions.source && typeof collectionOptions.fullpath === 'string') {
            if (collectionOptions.isDirectory) {
              const files = await getCollectionFiles(collectionOptions.fullpath)

              if (!modulePath) modulePath = slash(path.resolve(collectionOptions.fullpath, files[0]))

              // const md = fs.readFileSync(files[0], 'utf-8')
              // const { data } = matter(md)
            } else if (collectionOptions.isFile) {
              // console.log(collectionOptions.fullpath)
            }
          }
        }
      }

      // const clientCode = generateClientCode(generatedCollections)

      return ''

//       debug.gen(`const md = await import('${modulePath}')`)

//       const optionsCode = JSON.stringify(options)
//       return `import { createCollector } from 'vite-plugin-vue-collection'
// // import matter from 'gray-matter'

// // const md = await import('${modulePath}')
// // console.log(md)

// // const md = fs.readFileSync(file, 'utf-8')
// // const { data } = matter(md)

// export default createCollector(${optionsCode})
// `
    },
    transform(code, id) {
      if (id.endsWith('.md')) {
        debug.hmr(id)
        return code
      }
    },
  }
}

export * from './types'
