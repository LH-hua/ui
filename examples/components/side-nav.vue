<template>
  <div class="side-nav" v-if="data.length !== 0">
    <div v-for="item in data" :key="item.id" class="group-container">
      <p class="side-nav-title">{{ item.label }}</p>
      <div class="side-nav-items" v-if="item.items">
        <div v-for="list in item.items" :key="list.id">
          <p v-if="list.desc" class="side-nav-group">{{ list.desc }}</p>
          <router-link :to="{ name: list.name }" :class="$route.name === list.name ? 'active' : ''"
            class="slid-nav-component">{{ list.label }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navConf from '../router/nav.config.js'
export default {
  data() {
    return {
      data: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.init()
      })
    })
  },
  watch: {
    $route: function () {
      this.init()
    }
  },
  // 函数集，
  methods: {
    init() {
      const data = navConf.navData.filter(e => e.name === this.$route.meta.group)
      if(data.length > 0 && data[0].items) {
        this.data = data[0].items.filter(item => item.name === this.$route.meta.parent)
      }
      else {
        this.data = []
      }
    },
  }
}
</script>
<style lang="less">
.side-nav {
  display: inline-block;
  margin: 0;
  padding: 0;
  color: #3f536e;
  background-color: #fff;
  z-index: 99;

  .group-container {
    margin-bottom: 32px;
  }

  .side-nav-title {
    position: relative;
    padding: 0 24px 8px;
    color: #000;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 1px;
    text-transform: uppercase;

    &::before {
      position: absolute;
      content: '';
      width: 80%;
      height: 1px;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #f2f2f2;
      margin: 0 auto;
    }
  }

  .side-nav-items {
    font-size: 12px;
    font-weight: normal;
    line-height: 15px;

    a {
      display: block;
      position: relative;
      padding: 8px 24px;
      color: #3f536e;
      font-weight: normal;
      line-height: 2;
      cursor: pointer;
    }

    .side-nav-group {
      display: block;
      position: relative;
      padding: 6px 0 6px 24px;
      color: #2c405a;
      font-weight: bold;
      margin: 0;
    }

    .slid-nav-component {
      display: block;
      position: relative;
      padding: 6px 24px 6px 32px;
      color: #606060;
      font-size: 12px;
    }

    .active {
      color: #1890ff;
      // background-color: #f7f7f7;
    }
  }
}
</style>
