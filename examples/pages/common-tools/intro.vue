<template>
  <div>
	  <analysis-xlsx :url="url" />
  </div>
</template>

<script>
import AnalysisXlsx from '../component/analysis-xlsx.vue'
export default {
  components:{ AnalysisXlsx },
  data() {
    return {
      url:'http://10.10.204.156:8001/第三方工具/旭诚第三方工具登记表.xlsx'
    }
  }
}
</script>