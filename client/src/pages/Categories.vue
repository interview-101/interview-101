<template>
  <div class="app">
    <div>
      <Category
        v-for="( page, page_index ) in pages"
        :page="page"
      ></Category>
    </div>
  </div>
</template>

<script>
  import Category from '../components/Category'
  import pages from '../data.json'

  export default {
    components: {
      Category,
    },

    data() {
      return {
        pages
      }
    },

    methods: {
    },
  }
</script>

<style lang="less">
  html {
    background-color: #f2f2f2;
  }
  .app {
    display: flex;
    justify-content: center;
    padding: 50px 0;
  }
</style>
