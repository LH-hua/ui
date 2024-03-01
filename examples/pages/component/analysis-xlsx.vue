<template>
  <div>
     <a-tabs v-model="activeKey">
      <a-tab-pane v-for="(item,i) in sheetNames" :tab="item" :key="item">
        <s-table :data-source="datas[i]" :columns="getColumns(item)" :pagination="false">
          <!-- <div slot="head" class="table-title">{{ item }}</div> -->
          <template slot="名称" slot-scope="row">
            <div>
              <a :href="row.scope['使用文档路径']">{{ row.scope['名称'] }}</a>
            </div>
          </template>
        </s-table>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import * as Xlsx from 'xlsx'
import axios from 'axios'
import collect from 'collect.js'
export default {
  name:'analysis-xlsx',
  props:{
    url:{
      type:String,
      required:true
    }
  },
  data() {
    return {
      activeKey: '',
      datas:[],
      sheetNames:[],
      workbook:[]
    }
  },
  methods: {
    getData(){
      const obj = {
        url: this.url,
        methods:'GET',
        responseType:'arraybuffer'
      }
      axios(obj).then(res=>{
        let workbook = Xlsx.read(res.data,{ type: 'buffer' })
        this.workbook = workbook
        this.sheetNames = workbook.SheetNames
        this.activeKey = workbook.SheetNames[0]

        const json = this.readWorkbook(workbook)
        this.datas = json.map(item => this.filterDatas(item))
      })
    },
    readWorkbook(workbook) {
      var sheetContent = []
      // 遍历每张表读取
      for (var sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
              sheetContent.push(Xlsx.utils.sheet_to_json(workbook.Sheets[sheet]))
              // break; // 如果只取第一张表，就取消注释这行
          }
      }
      return sheetContent
    },
    // 获取表头
    getColumns(name){
      const sheetList = this.workbook.Sheets
      const obj = {}
      for(const attr in sheetList[name]){
        const key = attr.substring(0,1)
        const reg = /^[A-Za-z]+$/ // 检验字母正则
        const is = reg.test(key)
        if( is && !obj[key + 1]){
          obj[key + 1] = obj[key + 1]  // 存放表头
        }
      }
      // 生成表头数据
      const columns = []
      Object.keys(obj).forEach(item=>{
        const title = sheetList[name][item].v
        const obj = { title, key:title }
        if(item === 'A1' && title==='名称'){
          obj.scopedSlots = { customRender: title }
        }
        if(title === '使用文档路径'){ // 隐藏该项
          obj.width = 0
        }
        columns.push(obj)
      })
      return columns
    },
    // 过滤表格内容数据(相同项只获取最新的项渲染展示)
    filterDatas(data){
      const array = [...data]
      const datas = []
      const collection = collect(array).groupBy('名称')
      for(let attr in collection.items){
        const items = collection.items[attr]
        const arr = collect(items).sortByDesc('入库时间')
        datas.push(arr.items[0])
      }
      return datas
    }
  },
  created() {
    this.getData()
  },
}
</script>
<style lang="less" scoped>
  .xlsx-contanier{
    margin-bottom: 20px;
    .table-title{
      font-size: 20px;
      padding: 5px 0;
      color: #124474;
      font-weight: 600;
    }
  }
</style>