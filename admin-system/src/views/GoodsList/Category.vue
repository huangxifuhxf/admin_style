<template>
<div class="category">
  <!-- 导航地址（面包屑） -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item><a href="javascript:;">商品管理</a></el-breadcrumb-item>
    <el-breadcrumb-item>商品分类</el-breadcrumb-item>
  </el-breadcrumb>

  <el-button type="primary" plain @click="showClassify">添加分类</el-button>

  <!-- 表格 -->
  <tree-grid
    class="mt-15 mb-15"
    v-loading="loading"
    element-loading-text="加载数据中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    :treeStructure="true"
    :columns="columns"
    :data-source="dataSource"
    @deleteCate="deleteCategory"
    @editCate="editCategory"
  >
  </tree-grid>

  <!-- 分页器 -->
  <el-pagination
    class="pageBox"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="pageNum"
    :page-sizes="[5, 10, 2]"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="pageTotal">
  </el-pagination>

  <!-- 添加分类对话框 -->
  <el-dialog title="添加分类" :visible.sync="addClassifyDialogFormVisible">
    <el-form :model="addClassifyForm" :rules="addRules" ref="addClassifyForm">
      <el-form-item label="分类名称" :label-width="formLabelWidth" prop="cat_name">
        <el-input v-model="addClassifyForm.cat_name" auto-complete="off" placeholder="输入分类名称"></el-input>
      </el-form-item>
      <el-form-item label="父级名称" :label-width="formLabelWidth">
        <el-cascader
          :options="options"
          :show-all-levels="false"
          @change="handleChange"
          :change-on-select="true"
          :clearable="true"
          :props="defaultProps">
        ></el-cascader>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addClassifyDialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="upClassifyTable('addClassifyForm')">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import TreeGrid from '@/components/TreeGrid/TreeGrid.vue'
import { getCategoryList, getCategoryData, addCategoryData } from '@/api'
export default {
  // 挂载应用这个TreeGrid 子组件
  components: {
    TreeGrid
  },
  data () {
    return {
      pageNum: 1, // 页码
      pageSize: 5, // 每页显示多少条
      pageTotal: 0, // 初始总条数
      dataSource: [], // 表格数据
      loading: true, // 动画加载
      nameMd: '45646546', // 动画加载
      // 添加分类
      addClassifyDialogFormVisible: false, // 添加分类对话框
      formLabelWidth: '120px',
      addClassifyForm: {
        cat_name: '',
        cat_level: 0,
        cat_pid: 0
      },
      addRules: {
        cat_name: [{ required: true, message: '请输入分类名', trigger: 'blur' }]
      },
      columns: [
        {
          text: '分类名称',
          dataIndex: 'cat_name',
          width: '300'
        },
        {
          text: '是否有效',
          dataIndex: 'cat_deleted',
          width: '200'
        },
        {
          text: '排序',
          dataIndex: 'cat_level',
          width: '200'
        }
      ],
      // 匹配字段
      defaultProps: {
        children: 'children',
        label: 'cat_name',
        value: 'cat_id'
      },
      options: []
    }
  },
  created () {
    this.initTableData()
  },
  methods: {
    // 分页筛选每页条数
    handleSizeChange (val) {
      this.pageSize = val
      this.initTableData()
    },

    // 页码跳转到指定页面
    handleCurrentChange (val) {
      this.pageNum = val
      this.initTableData()
    },
    deleteCategory (cid) {
      console.log(cid)
    },
    editCategory (cid) {
      console.log(cid)
    },
    // 初始化表格
    initTableData () {
      getCategoryList(this.pageNum, this.pageSize).then(result => {
        // console.log(result)
        if (result.meta.status === 200) {
          this.loading = false
          this.dataSource = result.data.result
          this.pageTotal = result.data.total
        }
      })
    },
    // 添加分类话框值改变触发的事件
    handleChange (value) {
      if (value.length === 1) {
        this.addClassifyForm.cat_level = value.length
        this.addClassifyForm.cat_pid = value[0]
      } else {
        this.addClassifyForm.cat_level = value.length
        this.addClassifyForm.cat_pid = value[value.length - 1]
      }
    },
    // 弹出添加分类对话框
    showClassify () {
      this.addClassifyDialogFormVisible = true
      // 初始化分类列表
      getCategoryData().then(result => {
        console.log(result)
        this.options = result.data
      })
    },
    // 分类确定按钮
    upClassifyTable (formName) {
      this.$refs[formName].validate(valid => {
        // console.log(this.addClassifyForm)
        if (valid) {
          addCategoryData(this.addClassifyForm).then(result => {
            if (result.meta.status === 201) {
              this.addClassifyDialogFormVisible = false
              this.initTableData()
              this.addClassifyForm.cat_name = ''
              this.$message({
                message: result.meta.msg,
                type: 'success',
                duration: 800
              })
            } else {
              this.$message({
                message: result.meta.msg,
                type: 'error',
                duration: 800
              })
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.pageBox {
  padding: 5px 5px;
  background-color: #f5f5f5;
}
.US-search {
  width: 300px;
}
</style>
