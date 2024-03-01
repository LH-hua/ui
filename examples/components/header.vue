<template>
  <header class="page-header"
    :style="$route.name === 'index' ? 'box-shadow:none' : 'box-shadow:0 10px 60px 0 rgba(29,29,31,0.07)'">
    <div class="header-container">
      <div class="header_left">
        <div class="header_logo">
          <router-link :to="{ name: 'home' }">
            <img src="../assets/img/common/logo.png" />
          </router-link>
        </div>

        <div class="header_select">
          <a-select show-search placeholder="文档搜索" option-filter-prop="children" class="env-select-top"
            :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur" @change="handleChange"
            :get-popup-container="(trigger) => trigger.parentElement" :show-arrow="false">
            <a-icon type="search" slot="suffixIcon" />
            <a-select-option v-for="item in components" :key="item.id" :value="item.value"> {{ item.label }}
            </a-select-option>
          </a-select>

        </div>
      </div>
      <div class="header_right">
        <template v-for="item in navData">
          <router-link v-if="!item.items && item.name !== 'index'" :key="item.id" :to="{ name: item.name }"
            @click.native="onJump(item.name)">
            <span> {{ item.label }}</span>
          </router-link>
          <a-dropdown v-if="item.items && item.items.length > 0"
            :get-popup-container="(trigger) => trigger.parentElement">
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              {{ item.label }}
              <a-icon type="down" />
            </a>
            <div slot="overlay">
              <router-link class="link" v-for="childItem in item.items" :key="childItem.path"
                :to="{ name: childItem.name }" @click.native="onJump(childItem.name)">
                <span> {{ childItem.label }}</span>
              </router-link>
            </div>
          </a-dropdown>
        </template>
      </div>
    </div>
  </header>
</template>

<script>
import headData from '../router/nav.config.js'
export default {
  data() {
    return {
      navData: headData.navData.filter(e => !e.hide),
      components: []
    }
  },
  mounted() {
    this.getComponentsData()
  },

  methods: {
    onJump(path) {
      this.$emit('onJump', path)
    },

    // 获取组件列表
    getComponentsData() {
      let data = []
      Object.keys(headData).forEach(item => {
        data = data.concat(headData[item])
      })

      // 遍历
      let addComponent = item => {
        item.forEach(list => {
          if (list.items) {
            addComponent(list.items)
            data = data.concat(list.items)
          } else {
            // 如果是组件路由
            if (['index', 'introduction', 'start', 'explanation', 'CONTRIBUTING'].indexOf(list.name) === -1) {
              this.components.push({
                value: list.path,
                label: list.label
              })
            }
          }
        })
      }
      addComponent(data)
    },

    handleChange(value) {
      this.$router.push({ path: value })
    },
    handleBlur() {
      // console.log('blur')
    },
    handleFocus() {
      // console.log('focus')
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  }
}
</script>

<style lang="less" scoped>
@header-height: 70px;

.page-header {
  background-color: rgba(24, 144, 255, 1);
  border-bottom: 1px solid #eee;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: @header-height;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  z-index: 999999999999;

  .header-container {
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: space-between;
    box-shadow: 0 10px 20px 0 rgba(24, 144, 255, 0.15);

    .header_left {
      display: flex;
      flex-direction: row;
      align-items: center;

      .header_logo {
        width: 200px;
        text-align: center;

        .header_logo_text {
          color: #fff;
        }
      }

      .header_select {
        color: #fff;


        /deep/.env-select-top {
          position: relative;
          width: 200px;

          .ant-select-selection {
            border: none;
            background-color: #1890ff;

            .ant-select-selection__placeholder {
              color: #fff;
              padding-left: 10px;
            }

            .ant-select-selection-selected-value {
              padding-left: 5px;
              color: #fff;
            }
          }

          .ant-select-search {
            color: #fff;
          }

          // .ant-select-arrow {
          //   display: none;
          //   color: #fff;
          // }

          .ant-select-selection__rendered {
            background-color: rgba(0, 0, 0, 0.1);
            margin: 0;
          }

          .ant-select-search--inline .ant-select-search__field {
            color: #fff;
            padding-left: 10px;
          }
        }
      }
    }

    .header_right {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      .router-link-active {
        color: #fff;

        &.link {
          background-color: rgba(24, 144, 255, 1);

          span {
            color: #fff !important;
          }

          &::before {
            width: 0;
            height: 0;
            display: none;
          }
        }

        &::before {
          position: absolute;
          content: '';
          width: 30%;
          height: 3px;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #fff;
          margin: 0 auto;
        }
      }

      a {
        color: #fff;
        padding: 0px 20px;
        position: relative;
        line-height: @header-height;
        font-size: 14px;
      }

      /deep/.ant-dropdown {
        background-color: #fff;
        box-sizing: border-box;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        top: @header-height !important;
        border-radius: 4px;
        box-sizing: border-box;
        overflow: hidden;

        .ant-dropdown-content {
          max-height: 500px;
          overflow: auto;
          width: 150px;
        }

        .link {
          display: block;
          text-align: center;
          padding: 0;
          line-height: 20px;
          padding: 14px 10px;
          // border-top: 0.5px solid #f1f1f1;

          &:hover {
            background-color: rgba(24, 144, 255, 1);
            color: #fff !important;

            span {
              color: #fff !important;
            }
          }

          span {
            color: #000;
          }
        }


      }
    }
  }
}
</style>
