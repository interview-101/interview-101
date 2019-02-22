<template>
  <div class="categories">
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

<style lang="less" scoped>
  .categories {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 0;
  }
</style>
