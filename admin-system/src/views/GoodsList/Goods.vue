<template>
<div class="goods">
  <!-- 导航地址（面包屑） -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item><a href="javascript:;">商品管理</a></el-breadcrumb-item>
    <el-breadcrumb-item>商品列表</el-breadcrumb-item>
  </el-breadcrumb>

  <!-- 搜索框 -->
  <el-input placeholder="请输入搜索内容" v-model="initObj.query" @keydown.enter.native="initTableData" class="US-search">
    <el-button slot="append" type="primary" icon="el-icon-search" @click="initTableData"></el-button>
  </el-input>
  <el-button type="primary" plain @click="$router.push({name: 'Toadd'})">添加商品</el-button>

  <!-- 表格 -->
  <el-table
    class="mt-15 mb-15"
    :data="tableData"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    border
    stripe
    style="width: 100%">
    <el-table-column
      label="编号"
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      prop="goods_name"
      label="商品名称"
      width="400px">
    </el-table-column>
    <el-table-column
      prop="goods_price"
      label="商品价格"
      width="100px">
    </el-table-column>
    <el-table-column
      prop="goods_state"
      label="商品状态"
      width="100px">
    </el-table-column>
    <el-table-column
      prop="goods_weight"
      label="商品重量">
    </el-table-column>
    <el-table-column
      prop="upd_time"
      label="创建时间">
      <template slot-scope="scope">
        {{scope.row.upd_time | moment}}
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <!-- 编辑 -->
        <el-button type="warning" icon="el-icon-edit" size="mini"></el-button>
        <!-- 删除 -->
        <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
        <!-- 分配角色 -->
        <el-button type="primary" icon="el-icon-check" size="mini"></el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 分页器 -->
  <el-pagination
    class="pageBox"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="initObj.pagenum"
    :page-sizes="[5, 50, 100, 200, 300, 1000]"
    :page-size="5"
    layout="total, sizes, prev, pager, next, jumper"
    :total="tableTotal">
  </el-pagination>

</div>
</template>
<script>
import { initListData } from '@/api'
export default {
  data () {
    return {
      initObj: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      tableData: [], // 表格数据
      tableTotal: 0, // 表格数据
      loading: true
    }
  },
  created () {
    this.initTableData()
  },
  methods: {
    initTableData () {
      initListData(this.initObj).then(result => {
        if (result.meta.status === 200) {
          this.loading = false
          this.tableData = result.data.goods
          this.tableTotal = result.data.total
        }
      })
    },
    // 分页器器
    handleSizeChange (val) {
      this.initObj.pagesize = val
      this.initTableData()
    },
    handleCurrentChange (val) {
      this.initObj.pagenum = val
      this.initTableData()
    }
  }
}
</script>
<style lang="scss">
.pageBox {
  padding: 5px 5px;
  background-color: #f5f5f5;
}
.US-search {
  width: 300px;
}

</style>
