<template>
  <div>
    <h1 text="2xl" font="bold">Posts 文章列表</h1>

    <ul>
      <li>
        <h5 text="lg"><a href="#post1" @click.prevent>文章1</a></h5>
        <div>2021/06/01</div>
      </li>

      <li>
        <h5 text="lg"><a href="#post2" @click.prevent>文章2</a></h5>
        <div>2021/06/02</div>
      </li>
    </ul>

    <!-- <hr>
    <div class="px-4 py-2">
      <ReadmeMd />
    </div> -->
  </div>
</template>

<script setup lang="ts">
// import { useCollection } from 'vite-plugin-vue-collection'

// const posts = useCollection('posts').all()
// console.log(posts)

// const model: Model = useCollection('posts').find('slug', 'test')
// model.title: string
// model.slug: string
// model.path: string
// model.tags: Tag[]
// model.prev(): Model
// model.next(): Model

// useCollection('posts').all(): Model[]

// useCollection('posts').paginate(16).data(): Model[]
// useCollection('posts').paginate(16).links(): PaginatorLinks
</script>
