<template>
<div class="roleList">
<el-row>
  <el-col :span="24">
  <!-- 导航地址（面包屑） -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item><a href="javascript:;">权限管理</a></el-breadcrumb-item>
    <el-breadcrumb-item>角色列表</el-breadcrumb-item>
  </el-breadcrumb>
  </el-col>
</el-row>

<el-button type="primary" plain>添加角色</el-button>

<!-- 表格 -->
<el-table
  class="mt-15 mb-15"
  :data="tableData"
  v-loading="loading"
  @expand-change='roleChange'
  border
  stripe
  style="width: 100%">
  <el-table-column type="expand">
    <template slot-scope="scope">
      <!-- 第一层 -->
      <el-row v-for="(item1, index) in scope.row.children" :key="index">
        <el-col :span="3"><el-tag closable @close="delAssignRole(scope.row, item1.id)">{{item1.authName}}</el-tag><i class="el-icon-arrow-right arrow"></i></el-col>
        <el-col :span="21">
          <!-- 第二层 -->
          <el-row v-for="(item2, index) in item1.children" :key="index">
            <el-col :span="4"><el-tag closable type='danger' @close="delAssignRole(scope.row, item2.id)">{{item2.authName}}</el-tag><i class="el-icon-arrow-right arrow"></i></el-col>
            <el-col :span="20">
              <!-- 第三层 -->
              <el-tag closable @close="delAssignRole(scope.row, item3.id)" type='warning' v-for="(item3, index) in item2.children" :key="index">{{item3.authName}}</el-tag>
            </el-col>
          </el-row>
          <hr>
        </el-col>
      </el-row>
      <el-row v-if="scope.row.children.length === 0">
        <el-col :span="24">
          还 没 有 角 色 属 性，请 前 往 添 加
        </el-col>
      </el-row>
    </template>
  </el-table-column>
  <el-table-column
    type="index"
    width="50">
  </el-table-column>
  <el-table-column
    prop="roleName"
    label="角色名称">
  </el-table-column>
  <el-table-column
    prop="roleDesc"
    label="描述">
  </el-table-column>
  <el-table-column label="操作">
    <template slot-scope="scope">
      <el-button type="warning" icon="el-icon-edit" size="mini"></el-button>
      <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
      <el-button type="primary" icon="el-icon-check" size="mini"  @click="roleShow(scope.row)"></el-button>
    </template>
  </el-table-column>
</el-table>

  <!-- 角色授权对话框 -->
<el-dialog title="角色授权" :visible.sync="roleDialogTableVisible">
<el-tree
:data="initRoleList"
show-checkbox
node-key="id"
ref="tree"
:default-expand-all='true'
:default-expanded-keys="[1, 2, 3]"
:default-checked-keys="currentCkeckedArr"
:props="defaultProps">
</el-tree>
<div slot="footer" class="dialog-footer">
<el-button @click="roleDialogTableVisible = false">取 消</el-button>
<el-button type="primary" @click="roleSubmit">确 定</el-button>
</div>
</el-dialog>

</div>
</template>

<script>
import { roleList, deleteRole, jurisdictionList, submitRole } from '@/api'
export default {
  data () {
    return {
      tableData: [], // 表格数据数组
      loading: true, // 加载动画
      roleDialogTableVisible: false, // 角色列表选项
      initRoleList: [], // 角色列表展示
      currentRole: [], // 当前这一条的数据里面的角色
      currentCkeckedArr: [], // 选中框数的角色
      // 匹配字段
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  created () {
    this.initTableData()
  },
  methods: {
    // 初始化表格
    initTableData () {
      roleList().then(result => {
        if (result.meta.status === 200) {
          this.tableData = result.data
          setTimeout(() => {
            this.loading = false
          }, 500)
        }
      })
    },
    // 删除角色指定权限
    delAssignRole (row, rightId) {
      deleteRole(row.id, rightId).then(result => {
        if (result.meta.status === 200) {
          this.$message({
            message: result.meta.msg,
            type: 'success',
            duration: 500
          })
          // 清空原来的数据
          row.children.splice(0, row.children.length)
          // 添加新的数据
          row.children.push(...result.data)
        } else {
          this.$message({
            message: result.meta.msg,
            type: 'error',
            duration: 500
          })
        }
      })
    },
    // 角色列表选项渲染
    roleShow (row) {
      // 这一组数据里面
      this.currentRole = row
      this.roleDialogTableVisible = true
      // 请求所有权限列表
      jurisdictionList('tree').then(result => {
        // 当前的选初始列表
        this.initRoleList = result.data
        // 每次要先清空里面值
        this.currentCkeckedArr = []
        // 筛选里面的id
        this.currentRole.children.forEach(item1 => {
          if (item1.children && item1.children.length !== 0) {
            item1.children.forEach(item2 => {
              if (item2.children && item2.children.length !== 0) {
                item2.children.forEach(item3 => {
                  // 要被勾选的 id
                  this.currentCkeckedArr.push(item3.id)
                })
              }
            })
          }
        })
      })
    },
    // 角色授权确认 上传
    roleSubmit () {
      var ckeckedArr = this.$refs.tree.getCheckedNodes() // 得到里面选中的id 集合
      // 返回一个新数组 有多个数组
      var tempArrs = ckeckedArr.map(item => {
        return item.id + ',' + item.pid
      })
      // 结果 ["116,104,101", "117,104,101", "150,104,101"]
      // 通过 join ',' 分割成字符串
      var tempStr = tempArrs.join(',') // 结果 116,104,101,117,104,101,150,104,101
      // 组合一个数组
      var tempArr = tempStr.split(',') // 结果 ["116", "104", "101", "150", "104", "101"]
      // 数组去重复 ...是展开显示 否则是结果是 Set{_c: Set(4)}
      var idArr = [...new Set(tempArr)] // 结果 ["116", "104", "101", "150"]
      var idArrString = idArr.toString() // 结果116,104,101,150
      submitRole(this.currentRole.id, idArrString).then(result => {
        if (result.meta.status === 200) {
          this.roleDialogTableVisible = false
          this.initTableData()
          this.$message({
            message: result.meta.msg,
            type: 'success',
            duration: 1000
          })
        } else {
          this.$message({ message: '更新失败', type: 'error', duration: 1000 })
        }
      })
    },
    // 当用户对某一行展开或者关闭的时候会触发该事件
    roleChange (row, expandedRows) {
      console.log(row)
      console.log('---------------------------------------')
      console.log(expandedRows)
      console.log('展开显示出来的')
    }
  }
}
</script>
<style>
.el-tag {
  margin-left: 5px;
}
.authlist {
  border-top: solid 1px #d3dce6;
  padding-top: 5px;
  padding-bottom: 5px;
}
.arrow {
  font-size: 18px;
  font-weight: bold;
}
.el-table__expanded-cell[class*="cell"] {
  padding: 0 !important;
}
</style>
