import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import components from 'vite-plugin-components'
import pages from 'vite-plugin-pages'
import collector from 'vite-plugin-vue-collection'

export default defineConfig({
  resolve: {
    alias: {
      '~': resolve(__dirname, './src'),
    },
  },

  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),

    pages(),

    collector({
      collections: {
        posts: {
          source: './data/posts',
        },
        tags: {
          auto: true,
        },
        postCollection: {
          source: './data/postCollection.js',
        },
        images: {
          source: './data/images',
          static: true,
        },
      },
      relations: ({ hasMany }) => ({
        posts: hasMany('tags'),
        tags: hasMany('posts', 'post'),
        postCollection: hasMany('posts', 'post'),
      }),
    }),

    components({
      extensions: ['vue', 'md'],
      customLoaderMatcher: path => path.endsWith('.md'),
      globalComponentsDeclaration: true,
    }),
  ],
})
