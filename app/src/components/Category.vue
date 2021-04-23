<template>
  <div class="category">
    <div @click="onOpen" class="category__title">
      {{ page.name }}
      <i
        :class="[ 'iconfont', 'icon-' + page.icon ]"
        style="font-weight: normal;font-size: 14px;margin-left: 5px;"
      ></i>
    </div>

    <div class="category__body is-opened">
      <router-link
        v-for="( category, category_index ) in categories"
        class="category__link"
        :to="'/questions/' + page.id + '/' + category.id"
      >
        {{ category.name }}（{{ category.questions ? category.questions.length : 0 }}）
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      selected: {
        type: Boolean,
        default: false
      },
      opened: {
        type: Boolean,
        default: false
      },
      page: {
        type: Object,
        default() {
          return {}
        }
      }
    },

    data() {
      return {
        categories: this.page.categories || []
      }
    },

    methods: {
      onOpen() {
        this.$emit( 'open' )
      },
    },
  }
</script>

<style lang="less">
  .category {
    width: 640px;
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border-radius: 5px;
    box-shadow: rgb(35 46 60 / 4%) 0 2px 4px 0;
    border: 1px solid rgba(101,109,119,.16);
    margin-bottom: 15px;
    min-height: 70px;

    &__title {
      position: absolute;
      top: .75rem;
      right: -.25rem;
      z-index: 1;
      padding: .25rem .75rem;
      font-size: 12px;
      font-weight: 600;
      line-height: 1.5rem;
      color: #fff;
      text-align: center;
      text-transform: uppercase;
      background: #333;
      border-color: #333;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 1rem;
      min-width: 2rem;
      border-radius: 3px 0 2px 3px;
      width: 150px;
      cursor: default;

      &::before {
        position: absolute;
        right: 0;
        bottom: 100%;
        width: 0;
        height: 0;
        content: "";
        filter: brightness(70%);
        border: .125rem solid;
        border-color: inherit;
        border-top-color: transparent;
        border-right-color: transparent;
      }
    }

    &__body {
      flex: 1 1 auto;
      padding: 3.6rem 1rem 1.5rem 1rem;
    }

    &__link {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      align-items: center;
      cursor: pointer;
      background-color: #fff;
      color: #666;
      text-decoration: none;
      font-size: 15px;
      border-radius: 3px;

      &:hover {
        color: #333;
        background-color: #f2f2f2;
        font-weight: bold;
      }
    }
  }

  .iconfont {
    font-size: 19px;
  }
</style>
