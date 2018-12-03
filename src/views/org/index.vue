<template>
  <div>
    <div style="margin-bottom: 10px;">
      <el-input
        placeholder="请输入部门名称"
        v-model="deptName" style="width: 300px">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="getData">搜索</el-button>
    </div>
    <el-table border :data="tableData" :stripe="true">
      <el-table-column label="部门编号" prop="id"></el-table-column>
      <el-table-column label="部门名称" prop="deptName"></el-table-column>
      <el-table-column label="上级部门号" prop="mgr"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import OrgApi from '@/api/org'
export default {
  data () {
    return {
      deptName: '',
      visible: false,
      visible1: false,
      itemId: 0,
      tableData: [],
      total: 0,
      query: {
      },
      mgr: ''
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    async loadData () {
      let resp = await OrgApi.query('')
      console.log(resp)
      this.tableData = resp.data.list
      this.total = resp.data.total
    },
    async getData () {
      await OrgApi.queryDeptName(this.deptName).then(data => {
        console.log(data)
        this.tableData = data.data
      })
    }
  }
}
</script>

<style scoped>

</style>
