import { Collector } from './src/client/types'

declare module 'collector' {
  const collector: Collector
  export default collector
}

declare module 'virtual:collector' {
  const collector: Collector
  export default collector
}
