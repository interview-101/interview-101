<template>
  <div class="home">
    <div class="content">
      <div class="logo">
        <img src="https://i.imgur.com/rQ69ix5.png" alt="">
        <div class="name">Interview 101</div>
      </div>

      <div class="buttons">
        <a class="button" href="#/categories">See All Questions</a>
        <a class="button lucky" @click="onLucky">I'm Feeling Lucky</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onLucky() {
      console.log( 'TODO: popup a question' )
    }
  }
}
</script>

<style lang="less" scoped>
  .home {
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content {
    width: 600px;
    display: flex;
  }

  .buttons {
    flex: 1;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .button {
    display: block;
    outline: none;
    border: solid 1px #000;
    color: #000;
    border-radius: 3px;
    cursor: pointer;
    padding: 10px 6px;
    font-size: 17px;
    margin-bottom: 20px;
    width: 190px;
    text-align: center;
  }

  .logo {
    width: 190px;
    transition: transform .3s ease;
    text-align: center;

    .name {
      font-weight: bold;
      font-size: 19px;
      margin-top: 10px;
    }

    &.scale-in {
      transform: scale(.3);
    }
  }
</style>
