<template>
  <div ref="box" class="s-svg-carousel" @mouseenter="onMouseEnterImageView" @mouseleave="onMouseLeaveImageView">
    <div v-show="imageList.length > 0" class="pre-body" style="height: 100%" :class="{ full: full }">
      <!--左侧图片栏-->
      <div class="pre-left" :class="{ folded: folded }">
        <div class="pre-list" ref="pre-list">
          <div v-if="isShowGifConfig" class="check-all" style="text-align: center">
            <a-checkbox @change="onAllChange" :checked="allChecked" :indeterminate="indeterminate">全选</a-checkbox>
          </div>

          <div v-for="(img, index) in imageList" :key="index" class="img-box">
            <div class="img-box-text" @click="selImg(index)"
              :class="['img-box-text', index === position ? 'active' : '']">
              <img v-if="showThumbnail && img.thumbnailUrl" v-lazy="img.thumbnailUrl" class="img"
                :key="img.thumbnailUrl + index" />
              <span style="font-size: 13px">{{ img.imageTitle }}</span>
            </div>
            <a-checkbox @change="onItemsCheck(img, index)" :checked="img.checked" v-if="isShowGifConfig"
              style="margin-left: 10px" />
          </div>
        </div>
      </div>
      <div class="pre-right">
        <div class="slick-arrow slick-prev" @click="pre()"></div>
        <div class="slick-arrow slick-next" @click="next(false)"></div>
        <div id="mcol"></div>
      </div>
      <!--底部操作栏-->
      <div class="pre-bottom">
        <div class="fold-list-btn" @click="onFolded">
          <a-icon type="unordered-list" /> 图片列表
        </div>
        <div class="list-range">
          <a-select placeholder="请选择开始时间" style="width: 160px" v-model="startIndex" @change="startChange" allowClear
            :get-popup-container="(trigger) => trigger.parentElement">
            <a-select-option v-for="(image, index) in imageInfoes" :key="index" :disabled="index > endIndex"
              :value="index">{{
              image.imageTitle
              }}</a-select-option>
          </a-select>
          <span> ~ </span>
          <a-select placeholder="请选择结束时间" style="width: 160px" v-model="endIndex" @change="endChange" allowClear
            :get-popup-container="(trigger) => trigger.parentElement">
            <a-select-option v-for="(image, index) in imageInfoes" :key="index" :disabled="index < startIndex"
              :value="index">{{ image.imageTitle }}</a-select-option>
          </a-select>
        </div>
        <div class="operate">
          <button title="上一张" class="btn prev" @click="pre()">
            <a-icon class="icon-prev" type="step-backward" />
          </button>
          <button class="btn play" @click="run()">
            <a-icon title="暂停" v-if="isRun" class="icon-pause" type="pause" />
            <a-icon title="播放" v-else class="icon-play" type="caret-right" />
          </button>
          <button title="下一张" class="btn next" @click="next(false)">
            <a-icon class="icon-next" type="step-forward" />
          </button>
        </div>
        <div class="speed">
          <div v-for="(seepd, index) in speedList" :key="index" :class="seepd.activate ? 'active' : null"
            :_data="seepd.index" @click="onSpeedChange">
            {{ seepd.name }}
          </div>
        </div>
      </div>
      <!--右边工具栏-->
      <div class="pre-toolbox">
        <button title="放大" class="btn" @click="scaleCarta('plus')">
          <a-icon class="icon-zoom-in" type="zoom-in" />
        </button>
        <button title="缩小" class="btn" @click="scaleCarta('minux')">
          <a-icon class="icon-zoom-out" type="zoom-out" />
        </button>
        <button title="还原" class="btn" @click="scaleCarta('home')">
          <a-icon class="icon-reset" type="reload" />
        </button>
        <button title="下载当前图片" class="btn" @click="downloadImage()">
          <a-icon class="icon-download" type="download" />
        </button>
        <button class="btn" @click="switchFull()">
          <a-icon title="还原" v-if="full" class="icon-exit" type="fullscreen-exit" />
          <a-icon title="全屏" v-else class="icon-fullscreen" type="fullscreen" />
        </button>
        <button title="下载gif" class="btn" @click="downloadGif">
          <a-icon class="icon-gif" :type="gifIcon" />
        </button>
        <!-- gif图form表单 -->
        <a-drawer title="Gif图导出配置" placement="right" :closable="false" :visible="isShowGifConfig" :get-container="false"
          :wrap-style="{ position: 'absolute', top: '100%', right: '-14px', height: '250px' }"
          :headerStyle="{ padding: '12px' }" :bodyStyle="{ width: '100%', padding: '3px 5px', fontSize: '14px' }"
          width="230" wrapClassName="gif-config-panel">
          <a-form-model layout="horizontal" label-align="left" :model="gifConfig" :rules="gifFormRules" ref="ruleForm"
            :wrapper-col="{ span: 12 }" :label-col="{ span: 10 }">
            <a-form-model-item v-for="item in gifForm" :key="item.key" :label="item.label" :prop="item.key">
              <a-input v-model="gifConfig[item.key]" :suffix="item.suffix" />
            </a-form-model-item>
          </a-form-model>
          <div class="drawer-footer">
            <a-button @click="onCloseGifPanel">关闭</a-button>
            <a-button type="primary" @click="gifDownload" :loading="gifIcon == 'loading'">导出</a-button>
          </div>
        </a-drawer>
      </div>
    </div>
    <div v-show="imageList.length <= 0" class="empty">
      <a-empty />
    </div>
  </div>
</template>
<script>
import { cartaSvg } from './cartasvg'
import GifCreator from './gif-creator/make-gif'
export default {
  props: {
    imageInfoes: {
      type: Array,
      default() {
        return []
      }
    },
    gifFileName: {
      type: String,
      default: '图片名称'
    },
    showThumbnail: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      full: false,
      speedList: [
        {
          index: 2000,
          name: '慢',
          activate: false
        },
        {
          index: 1000,
          name: '中',
          activate: false
        },
        {
          index: 500,
          name: '快',
          activate: true
        }
      ],
      same: 500,
      startIndex: 0,
      endIndex: this.imageInfoes.length - 1,
      imageList: [],
      imgurls: [],
      folded: false,
      dw: undefined,
      im: null,
      childs: [],
      isRun: false, // 是否开始
      position: 0, // 播放位置
      timer: null, // 计时器

      gifIcon: 'cloud-download',

      //gif配置
      indeterminate: false,
      isShowGifConfig: false,
      gifForm: [
        { label: '图片宽度', key: 'gifWidth', suffix: 'px' },
        { label: '图片高度', key: 'gifHeight', suffix: 'px' },
        { label: '每帧间隔时间', key: 'interval', suffix: '秒' }
      ],
      gifFormRules: {
        gifWidth: [
          { required: true, message: '不能为空' },
          { pattern: new RegExp(/^\d+$|^\d*\.\d+$/g), message: '请输入数值' }
        ],
        gifHeight: [
          { required: true, message: '不能为空' },
          { pattern: new RegExp(/^\d+$|^\d*\.\d+$/g), message: '请输入数值' }
        ],
        interval: [
          { required: true, message: '不能为空' },
          { pattern: new RegExp(/^\d+$|^\d*\.\d+$/g), message: '请输入数值' }
        ]
      },
      gifConfig: {
        gifWidth: 678,
        gifHeight: 678,
        interval: 1
      }
    }
  },
  computed: {
    allChecked() {
      const checked = this.imageList.every(item => item.checked)
      this.indeterminate = checked ? false : this.imageList.some(item => item.checked)
      return checked
    }
  },
  watch: {
    imageInfoes() {
      this.position = 0
      this.startIndex = 0,
        this.endIndex = this.imageInfoes.length - 1,
        this.init()
    },
    isRun(val) {
      if (val) {
        this.timer = window.setInterval(() => {
          this.next()
        }, this.same)
      } else {
        window.clearInterval(this.timer)
      }
    }
  },
  methods: {
    onMouseEnterImageView() {
      document.querySelector('body').style.overflow = 'hidden'
    },
    onMouseLeaveImageView() {
      document.querySelector('body').style.overflow = 'auto'
    },
    // 全选
    onAllChange(e) {
      const checked = e.target.checked
      this.imageList.forEach(ele => {
        ele.checked = checked
      })
      this.$emit('image-multiselect', {
        imageList: this.imageList
      })
    },
    // 选中项
    onItemsCheck(target, i) {
      target.checked = !target.checked
      this.$emit('image-multiselect', {
        imageList: this.imageList,
        index: i
      })
    },
    onFolded() {
      this.folded = !this.folded
      if (this.folded) {
        setTimeout(() => {
          let dom = document.querySelectorAll('.pre-left')
          dom[0].style.display = 'none'
        }, 200)
      } else {
        setTimeout(() => {
          let dom = document.querySelectorAll('.pre-left')
          dom[0].style.display = ''
        }, 0)
      }
    },
    switchFull(flag) {
      if (this.full) document.querySelector('body').style.overflow = 'auto'
      if (!this.full) document.querySelector('body').style.overflow = 'hidden'

      this.full = !this.full
      // this.init()
    },
    onSpeedChange(e) {
      let selectIndex = e.target.attributes._data.value
      this.isRun = false
      this.speedList.map((item, index) => {
        if (item.index === parseInt(selectIndex)) {
          item.activate = true
          this.same = selectIndex
        } else {
          item.activate = false
        }
      })
      this.$nextTick(() => {
        this.isRun = true
      })
    },
    // 结束时间改变
    endChange() {
      this.buildSelectList()
    },
    // 开始时间改变
    startChange() {
      this.buildSelectList()
      this.selImg(0)
    },
    // 下载图片
    downloadImage() {
      if (!this.im) {
        return false
      }
      const currentObj = this.imageList[this.position]
      const image = new Image()
      // 解决跨域 Canvas 污染问题
      image.setAttribute('crossOrigin', 'anonymous')
      image.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height

        const context = canvas.getContext('2d')
        context.drawImage(image, 0, 0, image.width, image.height)
        const url = canvas.toDataURL('image/png')
        // 生成一个a元素
        const a = document.createElement('a')
        // 创建一个单击事件
        const event = new MouseEvent('click')

        // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘图片名称’作为默认名称
        a.download = currentObj.fileName || currentObj.imageTitle || '图片名称'
        // 将生成的URL设置为a.href属性
        a.href = url
        // 触发a的单击事件
        a.dispatchEvent(event)
      }
      image.src = currentObj.sourceUrl
    },
    downloadGif() {
      this.isShowGifConfig = !this.isShowGifConfig
    },
    gifDownload() {
      if (this.gifIcon == 'loading') return

      // 表单校验
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          return
        }
        let images = this.imageList.filter(item => item.checked).map(ele => ele.sourceUrl)
        if (images.length < 2) {
          this.$message.warn('至少选择两张图片！')
          return
        }

        let data = { ...this.gifConfig, images }
        if (Number(data.gifHeight) <= 0 || Number(data.gifHeight) > 5000) {
          this.$message.warn('请输入适当的图片高度（1-5000）')
          return
        }
        if (Number(data.gifWidth) <= 0 || Number(data.gifWidth) > 5000) {
          this.$message.warn('请输入适当的图片宽度（1-5000）')
          return
        }
        if ((Number(data.gifWidth) / Number(data.gifHeight) >= 1.4) || (Number(data.gifWidth) / Number(data.gifHeight) < 1)) {
          this.$message.warn('请输入图片宽高比控制在1:1至4:3以内！')
          return
        }
        if (Number(data.interval) <= 0 || Number(data.interval) > 100) {
          this.$message.warn('请输入适当的间隔时间（1-100）')
          return
        }

        let gif = new GifCreator(data, this.gifFileName)
        this.gifIcon = 'loading'
        let self = this
        gif.createGIF(() => {
          self.gifIcon = 'cloud-download'
        })
        this.$emit('gif-save', this.imageList.filter(item => item.checked))
      })
    },
    onCloseGifPanel() {
      this.isShowGifConfig = false
    },
    // 切换比例
    scaleCarta(key) {
      let curr_scale = this.dw.m.scale
      switch (key) {
        case 'minux':
          if (curr_scale > 1) {
            curr_scale -= 0.5
          } else if (curr_scale > 0.1) {
            curr_scale -= 0.1
          } else if (curr_scale > 0.01) {
            curr_scale -= 0.01
          } else {
            curr_scale = 0.01
          }
          break
        case 'home':
          curr_scale = 1
          break
        case 'plus':
          curr_scale += 0.5
          break
      }
      this.dw.scaleCarta(curr_scale)
    },
    // 点击播放
    run() {
      this.isRun = !this.isRun
    },
    // 上一张
    pre() {
      let pre_index = this.position - 1
      if (pre_index < 0) {
        this.selImg(this.imgurls.length - 1)
        this.$refs['pre-list'].scrollTop = 100000
      } else {
        this.selImg(pre_index)
        let activeImgEl = document.querySelector('.pre-list .img-box .active')
        this.$refs['pre-list'].scrollTo({ top: activeImgEl.offsetTop - 250, behavior: 'smooth' })
      }
      this.isRun = false
    },
    // 下一张
    next(need_stop) {
      let next_index = this.position + 1
      if (next_index > this.imgurls.length - 1) {
        this.$refs['pre-list'].scrollTop = 0
        this.selImg(0)
      } else {
        let activeImgEl = document.querySelector('.pre-list .img-box .active')
        this.$refs['pre-list'].scrollTo({ top: activeImgEl.offsetTop - 100, behavior: 'smooth' })
        this.selImg(next_index)
      }
      if (need_stop) {
        this.isRun = false
      }
    },
    // 选中图片
    selImg(index) {
      this.position = index
      this.im ? (this.im.src = this.imgurls[index]) : null
      this.$emit('image-select',{
        index:index,
        imageList:this.imageList
      })
    },
    // 根据开始和结束日期显示对应范围内的图片
    buildSelectList() {
      this.imageList = []
      this.imgurls = []

      const start = this.startIndex
      const end = this.endIndex
      for (let index = start; index <= end; index++) {
        const item = this.imageInfoes[index];
        if (!item.sourceUrl) item.sourceUrl = require('../../assets/images/empty-img.png')
        if (!item.thumbnailUrl) item.thumbnailUrl = require('../../assets/images/empty-img-s.png')
        this.imageList.push(item)
        this.imgurls.push(item.sourceUrl)
      }
    },
    // 构建图片集合
    buildImages() {
      // 数据集合转换
      this.imageInfoes.map(item => {
        this.$set(item, 'checked', false)
      })
      this.buildSelectList()
    },
    // 初始化
    init() {
      this.buildImages()
      let self = this
      if (!this.dw) {
        let width = this.$refs.box.clientWidth - 160
        let height = this.$refs.box.clientHeight - 59
        this.dw = new cartaSvg({
          id: 'mcol',
          bg: 'transparent',
          sbar: false,
          sbarpos: 'right',
          width: width,
          height: height
        })
      }
      // img
      // TODO: 存在一个bug，当同一个页面有多个svg-carousel时，除了第一个其他无法加载图片
      this.im = new Image()
      this.im.src = this.imgurls[self.position] // default img
      this.im.onload = function () {
        for (let i = 0; i < self.childs.length; i++) {
          self.dw.vp.removeChild(self.childs[i])
        }
        self.childs = []
        let ratio = this.width / this.height
        let pts = [self.dw.toPoints([90 * ratio, -90]), self.dw.toPoints([-90 * ratio, 90])]
        const img = self.dw.append('image', {
          width: pts[0][0] - pts[1][0],
          height: pts[0][1] - pts[1][1],
          x: pts[1][0],
          y: pts[1][1],
          preserveAspectRatio: 'none'
        })
        img.setAttributeNS('http://www.w3.org/1999/xlink', 'href', this.src)
        self.dw.attr(img, {
          title: 'Image',
          cursor: 'pointer'
        })
        self.childs.push(img)
      }
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="less">
.s-svg-carousel {
  height: 100%;
  position: relative;

  .pre-body {
    position: relative;
    display: flex;
    height: 860px;
    box-sizing: border-box;
    padding-bottom: 56px;
    overflow: hidden;
    background-color: #fff;

    &.full {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 999;
    }

    .pre-left {
      box-shadow: 4px 0 20px 0 rgba(0, 0, 0, 0.08);
      z-index: 123;
      flex: 0 0 190px;
      overflow: hidden;
      position: relative;

      &.folded {
        opacity: 0;
        transform: translateX(-200px);
        transition: all 0.5s ease;
        // display: none;
      }

      .pre-list {
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: #f7f7f7;
        padding-bottom: 0px !important;
        box-sizing: border-box;
        padding: 10px;

        .check-all {
          // padding: 10px;
          margin-bottom: 10px;
        }

        .active {
          border: 1px solid #1d83f0 !important;
          background-color: #dceaff !important;
        }

        .img-box {
          // width: 140px;
          text-align: center;
          // margin: 10px 10px 0;
          cursor: pointer;
          // background: #fff;
          margin-bottom: 10px;

          display: flex;
          align-items: center;

          &:last-child {
            margin-bottom: 10px;
          }

          .img-box-text {
            width: 100%;
            background: #fff;
            transition: all 0.5s;
            border: 1px solid #fff;

            &:hover {
              .active();
            }

            >span {
              display: block;
            }
          }

          .img {
            border: 2px transparent solid;
            box-sizing: border-box;
            display: inline-block;
            vertical-align: top;
            vertical-align: middle;
            width: 124px;
            margin: 7px 7px 5px;
          }
        }
      }
    }

    .pre-right {
      position: relative;
      height: 100%;
      flex: 1;
      overflow: hidden;

      #mcol {
        height: 100%;

        div {
          height: 100%;

          svg {
            width: 100%;
            height: 100%;
          }
        }
      }

      .slick-arrow {
        position: absolute;
        top: 50%;
        z-index: 99;
        transform: translateY(-50%);
        width: 120px;
        height: 100%;
        background: transparent;
      }

      .slick-prev {
        left: 1px;

        &:hover {
          cursor: url('./assets/left-arrow.png'), auto;
        }
      }

      .slick-next {
        right: 1px;

        &:hover {
          cursor: url('./assets/right-arrow.png'), auto;
        }
      }
    }

    .pre-toolbox {
      position: absolute;
      right: 15px;
      top: 15px;
      width: 34px;
      z-index: 100;

      .btn {
        outline: none;
        width: 30px;
        height: 30px;
        padding: 0;
        border-radius: 4px;
        text-align: center;
        line-height: 30px;
        background: #dde0e5;
        backdrop-filter: blur(10px);
        color: #333;
        font-weight: normal;
        margin: 0 0 5px;
        cursor: pointer;
        transition: all 0.5s;
        font-size: 16px;

        .iconfont {
          font-size: 16px;
        }

        &:hover {
          color: #fff;
          background: #1890ff;
        }
      }

      .gif-config-panel {
        width: '300px';
        // padding: 10px;
        box-sizing: border-box;

        .ant-form-item {
          margin-bottom: 10px;
        }

        .ant-form-item-label>label::after {
          margin-right: 10px;
        }

        .ant-form-item-label {
          line-height: 40px;
        }

        .drawer-footer {
          text-align: right;
          margin-top: 18px;
        }
      }
    }

    .pre-bottom {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      // padding: 10px;
      border-top: 1px solid #ddd;
      height: 50px;
      box-sizing: border-box;
      background-color: #f7f7f7;
      display: flex;
      align-items: center;

      .list-range {
        position: absolute;
        left: 180px;

        span {
          font-size: 14px;
        }

        // select {
        // 	height: 32px;
        // 	width: 145px;
        // 	padding: 0 15px 0 5px;
        // 	background: #fff;
        // 	border: 1px solid #dcdee2;
        // 	border-radius: 4px;
        // 	appearance: none;
        // }
      }

      .fold-list-btn {
        position: absolute;
        width: 160px;
        height: 55px;
        top: 0;
        left: 0;
        font-size: 14px;
        line-height: 55px;
        text-align: center;
        cursor: pointer;

        &:hover {
          color: #1890ff;
        }
      }

      .speed {
        position: absolute;
        left: 55%;
        top: 13px;
        margin-left: 140px;

        div {
          display: inline-block;
          vertical-align: top;
          width: 25px;
          height: 25px;
          margin: 0 5px;
          font-size: 12px;
          line-height: 25px;
          cursor: pointer;
          text-align: center;
          background: #ddd;
          border-radius: 50%;
          transition: all 0.5s;
          margin-right: 20px;

          &:hover {
            background-color: #1890ff;
            box-shadow: 0 0 5px #1890ff;
            color: #fff;
          }

          &.active {
            background-color: #1890ff;
            color: #fff;
          }
        }
      }

      .operate {
        width: 240px;
        text-align: center;
        left: 45%;
        position: absolute;
        display: flex;
        align-items: center;

        .btn {
          outline: none;
          cursor: pointer;
        }

        .next,
        .prev {
          background-color: transparent;
          color: #333;

          &:hover {
            color: #1890ff;
          }

          .iconfont {
            font-size: 20px;
          }
        }

        .play {
          border-radius: 50%;
          width: 34px;
          height: 34px;
          padding: 0;
          text-align: center;
          font-size: 22px;
          line-height: 27px;
          color: #fff;
          margin: 0 10px;
          background-image: linear-gradient(90deg, #508aff 0%, #16b0ff 100%);
          box-shadow: 0px 3px 7px 0px rgba(43, 158, 239, 0.35);

          .icon-play {
            margin-left: 3px;
          }

          &:hover {
            box-shadow: 0 0 5px #1890ff;
          }
        }
      }
    }
  }

  .btn {
    margin: 0 10px;
    height: 32px;
    background-color: rgb(106, 131, 244);
    border: none;
    border-radius: 5px;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    padding: 0 15px;
  }

  .empty {
    z-index: 1999;
    width: 100%;
    height: 100%;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;

    >img {
      width: 45%;
      top: 25%;
      left: 30%;
      position: absolute;
    }
  }
}
</style>
