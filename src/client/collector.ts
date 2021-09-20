import { inject } from 'vue'
import type { App } from 'vue'
import { Collection, Collector, Model, Paginator } from './types'
import { COLLECTOR_KEY } from './constants'

export interface VuePluginOptions {
  //
}

// export const loadedModels = new Map<string, any>()

// export function loadModules(): void {
//   loadedModels.set('mykey', 'LOADED')
// }

// ({
//   collections: {
//     posts: {
//       modules: [
//         {
//           resolve: () => import('../../../data/posts/2021-06-01-my-first-post.md'),
//           resolvedModule: null,
//         }
//       ]
//     },
//     tags: {
//       modules: []
//     },
//     postCollection: {
//       modules: []
//     },
//     images: {
//       source: './data/images',
//       static: true
//     }
//   }
// })

export function createCollector(options: VuePluginOptions = {}): Collector {
  function find<TModel>(id: string): Collection<TModel> | null {
    // if (typeof options.collections?.[id] === 'undefined') return null

    // const collectionOptions: CollectionOptions = options.collections?.[id]

    //

    function find(key: string, id: string) {
      const model = {
        prev() { return null },
        next() { return null },
      } as Model<TModel>

      return model
    }

    function all() {
      // ............

      return []
    }

    function paginate(perPage: number): Paginator<TModel> {
      return {
        data() { return [] },
        links() { return {} },
      }
    }

    const collection: Collection<TModel> = { find, all, paginate }

    return collection
  }

  const collector: Collector = {
    collection: find,

    install(app: App): void {
      const collector = this

      app.config.globalProperties.$collector = collector

      app.provide(COLLECTOR_KEY, collector)
    }
  }

  return collector
}

export function useCollection<TModel>(id: string) {
  const collector = inject(COLLECTOR_KEY) as Collector
  return collector.collection(id) as Collection<TModel>
}
