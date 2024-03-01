# 图片播放组件s-svg-carousel

::: demo

```html
<div>
  <div>
    <a-button @click="imagesChange">切换图片</a-button>
    <a-button @click="removeImages">清除图片</a-button>
    <a-switch checked-children="显示图片" un-checked-children="隐藏图片" v-model="isShowThumbnail" />
  </div>
  <div style="width:100%; height:800px;">
    <s-svg-carousel :image-infoes="imageList" :gif-file-name="gifFileName" :show-thumbnail="isShowThumbnail" @image-select="imageSelect" @gif-save="gifSave" @image-multiselect="imageMultiSelect"/>
  </div>
</div>
<script>
export default {
  data() {
    return {
      isShowThumbnail: true,
      gifFileName: '自定义gif图片名称',
      imageList: [
        {
          imageTitle: '2022-03-16 01:00',
          sourceUrl: require('../../../../examples/assets/img/examples-image/chart/smoothLine.png'),
          thumbnailUrl: require('../../../../examples/assets/img/examples-image/chart/smoothLine.png'),
          fileName:'文件下载名称'
        },
        {
          imageTitle: '2020-03-16 02:00',
          sourceUrl: require('../../../../examples/assets/img/examples-image/chart/line.png'),
          thumbnailUrl: require('../../../../examples/assets/img/examples-image/chart/line.png')
        },
        {
          imageTitle: '2020-03-16 03:00',
          sourceUrl: require('../../../../examples/assets/img/examples-image/chart/stackAreaLine.png'),
          thumbnailUrl: require('../../../../examples/assets/img/examples-image/chart/stackAreaLine.png')
        },
        {
          imageTitle: '2020-03-16 04:00',
          sourceUrl: require('../../../../examples/assets/img/examples-image/chart/line.png'),
          thumbnailUrl: require('../../../../examples/assets/img/examples-image/chart/line.png')
        },
        {
          imageTitle: '2020-03-16 05:00',
          sourceUrl: require('../../../../examples/assets/img/examples-image/chart/stackAreaLine.png'),
          thumbnailUrl: require('../../../../examples/assets/img/examples-image/chart/stackAreaLine.png')
        },
        {
          imageTitle: '2020-03-16 06:00',
          sourceUrl: require('../../../../examples/assets/img/examples-image/chart/line.png'),
          thumbnailUrl: require('../../../../examples/assets/img/examples-image/chart/line.png')
        },
        {
          imageTitle: '2020-03-16 07:00',
          sourceUrl: require('../../../../examples/assets/img/examples-image/chart/stackAreaLine.png'),
          thumbnailUrl: require('../../../../examples/assets/img/examples-image/chart/stackAreaLine.png')
        },
      ],
      gifLoading: false
    }
  },
  methods: {
    imagesChange(){
      this.imageList = [
        {
          imageTitle: '2022-03-16 01:00',
          sourceUrl: require('../../../../examples/assets/img/examples-image/chart/line.png'),
          thumbnailUrl: require('../../../../examples/assets/img/examples-image/chart/line.png')
        },
        {
          imageTitle: '2020-03-16 02:00',
          sourceUrl: require('../../../../examples/assets/img/examples-image/chart/smoothLine.png'),
          thumbnailUrl: require('../../../../examples/assets/img/examples-image/chart/smoothLine.png')
        },
        {
          imageTitle: '2020-03-16 03:00',
          sourceUrl: require('../../../../examples/assets/img/examples-image/chart/manyAreaLine.png'),
          thumbnailUrl: require('../../../../examples/assets/img/examples-image/chart/manyAreaLine.png')
        },
      ]
    },
    removeImages(){
      this.imageList = []
    },
    imageSelect(e){
      console.log('图片单选',e)
    },
    imageMultiSelect(e){
      console.log('图片多选',e)
    },
    gifSave(e){
      console.log('gif保存',e)
    }
  }
}
</script>
```

:::

### Attributes

| 参数           | 说明             | 类型          | 可选值 | 默认值     |
| -------------- | ---------------- | ------------- | ------ | ---------- |
| image-infoes   | 图片信息数据集合 | Array<object> | —      | []         |
| show-thumbnail | 是否显示图片     | Boolean       | —      | true       |
| gif-file-name  | gif 导出文件名   | String        | —      | '文件名称' |

### imageInfoes 图片信息字段

| 参数         | 说明                                | 类型   | 可选值 | 默认值 |
| ------------ | ----------------------------------- | ------ | ------ | ------ |
| imageTitle   | 图片标题                            | string | —      | —      |
| sourceUrl    | 图片 url                            | string | —      | —      |
| thumbnailUrl | 图片缩略图 url,用于左侧列表中的小图 | string | —      | —      |
| fileName     | png图片下载的文件名              | string | —      | `imageTitle / 图片名称` |

### 事件
| 参数         | 说明                                | 传出参数
| ------------ | ----------------------------------- | ------ | ------ | ------ |
| image-select	| 图片单选事件	| { index:0,//当前选择索引 ,imageList:[]//图片列表 }
| image-multiselect| 	图片多选事件	| { index:0,//当前选择索引 ,imageList:[]//图片列表 }
| gif-save	| gif保存事件	| imageList//要导出的图片