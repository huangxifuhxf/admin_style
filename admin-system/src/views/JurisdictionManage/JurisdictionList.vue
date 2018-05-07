<template>
<div class="jurisdictionList">
<el-row>
  <el-col :span="24">
    <!-- 导航地址（面包屑） -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="javascript:;">权限管理</a></el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/jurisdictionList' }">权限列表</el-breadcrumb-item>
    </el-breadcrumb>
  </el-col>
</el-row>

<!-- 表格 -->
<el-table
  class="mt-15 mb-15"
  :data="tableData"
  border
  stripe
  style="width: 100%">
  <el-table-column
    type="index"
    width="100">
  </el-table-column>
  <el-table-column
    prop="authName"
    label="权限名称"
    >
  </el-table-column>
  <el-table-column
    prop="path"
    label="路径"
    >
  </el-table-column>
  <el-table-column
    prop="level"
    label="层级">
    <template slot-scope="scope">
      {{scope.row.level | filtLevel}}
    </template>
  </el-table-column>
</el-table>
</div>
</template>

<script>
import {jurisdictionList} from '@/api'
export default {
  data () {
    return {
      tableData: [] // 表格数据数组
    }
  },
  created () {
    this.initTableData()
  },
  methods: {
    initTableData () {
      jurisdictionList('list').then(result => {
        console.log(result)
        if (result.meta.status === 200) {
          this.tableData = result.data
        }
      })
    }
  },
  filters: {
    // 过滤这个层级这一栏这个区域
    filtLevel: function (arg) {
      switch (arg) {
        case '0':
          arg = '一级'
          break
        case '2':
          arg = '二级'
          break
        default:
          arg = '三级'
          break
      }
      return arg
    }
  }
}
</script>
