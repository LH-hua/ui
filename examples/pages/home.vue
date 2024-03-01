<template>
  <div class="pg-index">
    <img class="welcome" src="../assets/img/welcome.jpg">
    <div class="about">
      <router-link :to="{ name: 'env' }">开始使用</router-link>
    </div>
  </div>
</template>

<style lang="less">
.pg-index {
  overflow-x: hidden;
  .welcome {
    display: inline-block;
    width: 100%;
  }

  .about {
    position: absolute;
    bottom: 180px;
    left: 50%;
    transform: translateX(-50%);

    a {
      color: #fff;
      background-image: linear-gradient(90deg, #00aeff 0%, #3369e7 100%);
      box-shadow: 0 2px 8px 0 rgba(51, 105, 231, 0.4);
      display: inline-block;
      font-size: 18px;
      border-radius: 6px;
      transition: all 0.3s;
      cursor: pointer;
      text-align: center;
      padding: 10px 40px;
    }
  }

}
</style>
