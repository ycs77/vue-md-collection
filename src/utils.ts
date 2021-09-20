import Debug from 'debug'

export function slash(str: string): string {
  return str.replace(/\\/g, '/')
}

export const debug = {
  hmr:     Debug('vite-plugin-vue-collection:hmr'),
  parser:  Debug('vite-plugin-vue-collection:parser'),
  gen:     Debug('vite-plugin-vue-collection:gen'),
  options: Debug('vite-plugin-vue-collection:options'),
  cache:   Debug('vite-plugin-vue-collection:cache'),
}
