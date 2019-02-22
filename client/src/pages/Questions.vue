<template>
  <div class="questions">
    <div class="questions__head">
      <div class="questions__back" @click="onHome">
        <i class="iconfont icon-back"></i>
      </div>
      <h3 class="questions__title">{{ title }}</h3>
    </div>
    <div class="questions__body">
      <div
        v-for="(question, i) in questions"
        class="question"
      >
        <div class="question__fullscreenroot" :ref="'fullscreen_' + i">
          <div class="question__head">
            <div class="question__question">{{ question.question }}</div>
            <div>

            </div>
          </div>
          <div class="question__body" v-html="question.question_body"></div>
        </div>

        <div class="question__answer" v-html="question.answer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import pages from '../data.json'

export default {
  components: {
  },

  data() {
    const pid = this.$route.params.pid
    const cid = this.$route.params.cid

    const page = pages.find( p => p.id === pid )
    const categories = page.categories
    const category = categories.find( c => c.id === cid )
    const questions = category.questions || []

    return {
      title: category.name,
      questions: questions || [],
    }
  },
  methods: {
    onHome() {
      this.$router.push( { name: 'categories' } )
    },
  }
}
</script>

<style lang="less" scoped>
  .questions {
    width: 700px;
    min-height: 100%;
    box-sizing: border-box;
    margin: auto;
    background-color: #fff;
    box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.05);

    &__head {
      position: sticky;
      top: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: solid 1px #f2f2f2;
      background-color: #fff;
      z-index: 1;
    }

    &__back {
      cursor: pointer;
      padding: 0 30px;
      align-self: stretch;
      display: flex;
      align-items: center;
    }

    &__title {
      margin-right: 30px;
    }

    &__body {
      padding: 30px;
    }
  }

  .question {
    border-bottom: dashed 1px #d3d3d3;
    padding: 20px 0;

    &__head {
      font-weight: 600;
      font-size: 17px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__answer {
      font-weight: 400;
      font-size: 15px;
      color: #333;
      line-height: 2;

      strong {
        color: #000;
      }
    }
  }
</style>
