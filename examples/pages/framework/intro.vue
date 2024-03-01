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
      url:'http://10.10.204.156:8001/自研软件/旭诚自研软件资产登记表.xlsx'
    }
  }
}
</script>