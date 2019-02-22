<template>
  <div class="category">
    <div @click="onOpen" class="category__title">
      <div><strong style="font-size: 16px;">{{ page.name }}</strong><span>（{{ categories.length }}）</span></div>
      <div class="category__icon">
        <i :class="[ 'iconfont', 'icon-' + page.icon ]"></i>
      </div>
    </div>
    <div class="category__body is-opened">
      <router-link
        v-for="( category, category_index ) in categories"
        class="category__item"
        :to="'/questions/' + page.id + '/' + category.id"
      >
        <div class="category__itemname">
          {{ category.name }}（{{ category.questions ? category.questions.length : 0 }}）
        </div>
        <div class="category__itemmore">
          <i class="iconfont icon-arrow"></i>
        </div>
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

    &__title {
      width: 100%;
      height: 60px;
      padding: 0 29px;
      display: flex;
      align-items: center;
      border-radius: 8px;
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      cursor: default;
      transition: transform ease .3s;
      user-select: none;
      background-color: #292940;
      color: #fff;
    }

    &__body {
      margin: 0 20px;
      box-sizing: border-box;
      border-radius: 0 0 5px 5px;
      transition: all ease-in-out .1s;
      transform-origin: top;
      height: 0;
      overflow: hidden;

      &.is-opened {
        height: auto;

        .category__item {
          transform: translate3d(0,0,0);
          opacity: 1;
        }
      }
    }

    &__item {
      padding: 15px 20px;
      margin-top: 10px;
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      background-color: #fff;
      color: #666;
      text-decoration: none;
      font-size: 15px;
    }
  }
</style>
