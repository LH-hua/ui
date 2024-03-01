<template>
  <a-config-provider :locale="locale">
    <div id="app" ref="scrollBox">
      <!-- 头部 -->
      <mainHeader @onJump="onJump"></mainHeader>
      <div class="main-container" ref="containerRef">
        <!-- 不带侧边栏  -->
        <router-view class="page" v-if="isIndex"></router-view>

        <!-- 带侧边栏  -->
        <template v-else>
          <sideNav class="nav rolling" :navKey="navKey"></sideNav>
          <div class="view rolling">
            <div class="global-anchor" v-if="anchors.length">
              <s-anchor :scroll-offset="100" ref="anchorRef">
                <s-anchor-link v-for="item in anchors" :key="item.id" :href="`#${item.id}`" :title="item.text"
                  :style="`margin-left:${item.intent}px;font-weight:${item.fontWeight}`">
                </s-anchor-link>
              </s-anchor>
            </div>
            <router-view></router-view>
          </div>
        </template>

        <s-back-top></s-back-top>
      </div>
    </div>
  </a-config-provider>
</template>

<script>
import mainHeader from './components/header.vue'
import sideNav from './components/side-nav.vue'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

export default {
  components: {
    mainHeader,
    sideNav
  },
  data() {
    return {
      isIndex: true,
      navKey: '',
      locale: zhCN,
      anchors: []
    }
  },
  watch: {
    $route() {
      const arr = ['home', 'codeView']
      this.isIndex = arr.includes(this.$route.name)
    },
    '$route.path'() {
      this.$nextTick(() => {
        if (this.$route.meta.desc) {
          this.$util.setDocumentTitle(this.$route.meta.desc + ' -Suncere-UI')
        }
        this.fetchAnchors()
      })
    }
  },
  mounted() { },
  methods: {
    onJump(key) {
      this.navKey = key
    },
    fetchAnchors() {
      if (!this.$refs.containerRef) return

      const content = this.$refs.containerRef.querySelector('.env-box')

      if (!content) return (this.anchors = [])
      // console.log('h1', Array.from(content.querySelector('body').childNodes).filter(item => ['H1', 'H2', 'H3'].includes(item.tagName)))

      //需要列出这些锚点
      const anchorNodes = ['H1', 'H2', 'H3', 'H4', 'H5']
      let allNodes = Array.from(content.querySelector('body').childNodes).filter(item => anchorNodes.includes(item.tagName))
      this.anchors = allNodes.map((item, index) => {
        const text = item.childNodes[0]?.textContent.trim()
        item.setAttribute('id', index)
        let intent = 0;
        let fontWeight = 'normal'
        if (item.tagName === 'H1') {
          fontWeight = 'bold'
        }
        if (item.tagName === 'H2') {
          intent = 20
        }
        if (item.tagName === 'H3') {
          intent = 40
        }
        if (item.tagName === 'H4') {
          intent = 60
        }
        if (item.tagName === 'H5') {
          intent = 80
        }
        return { id: index, text, intent, fontWeight }
      })
    }
  }
}
</script>

<style lang="less">

#app {
  width: 100%;
  min-height: 100vh;
}

.main-container {
  padding-top: 70px;
  width: 100%;
  height: 100%;

  .page {
    height: calc(100vh - 70px);
  }

  .nav {
    position: fixed;
    top: 70px;
    width: 200px;
    height: calc(100vh - 80px);
    overflow: auto;
    padding-top: 20px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #3f536e;
    background-color: #fff;
    border-right: 1px solid #dcdee2;
    z-index: 99;
  }

  .view {
    box-sizing: border-box;
    margin-left: 200px;
    background: #fff;
    padding: 24px 270px 24px 24px;
  }

  .global-anchor {
    position: fixed;
    top: 100px;
    right: 0;
    max-height: calc(100vh - 120px);
    padding: 5px;
    width: 250px;
    background: #fff;
    z-index: 5;
    overflow-y: auto;

    .anchor-link {
      padding-top: 10px !important;
      padding-bottom: 10px !important;
      a {
        margin: 0 !important;
        line-height: 18px;
      }
    }
  }

  .rolling {
    overflow: auto;

    /*滚动条整体样式*/
    &::-webkit-scrollbar {
      width: 4px;
    }

    /*滚动条里面小方块*/
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
      background-color: rgb(186, 198, 218);
    }

    /*滚动条里面轨道*/
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
      border-radius: 10px;
      background: transparent;
      border: none;
    }
  }
}
</style>
