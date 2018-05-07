<template>
  <div>
    <!-- 导航地址（面包屑） -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="javascript:;">用户管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索框 -->
    <el-input placeholder="请输入搜索内容" v-model="searchValue" @keydown.enter.native="initDateList" class="US-search">
      <el-button slot="append" type="primary" icon="el-icon-search" @click="initDateList"></el-button>
    </el-input>
    <el-button type="primary" plain @click="addUearDialogFormVisible = true">添加用户</el-button>

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
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            @change="changeState(scope.row)"
            active-text="开"
            inactive-text="关">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 编辑 -->
          <el-button type="warning" icon="el-icon-edit" size="mini"  @click="idDataFill(scope.row.id, scope.row.username)"></el-button>
          <!-- 删除 -->
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUserId(scope.row.id, scope.row.username)"></el-button>
          <!-- 分配角色 -->
          <el-button type="primary" icon="el-icon-check" size="mini" @click="roleUserData(scope.row.id, scope.row.username)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <el-pagination
      class="pageBox"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[2, 3, 4, 10]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageTotal">
    </el-pagination>

    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="addUearDialogFormVisible">
      <el-form :model="addUearForm" :rules="addRules" ref="addUearForm">
        <el-form-item label="用户名称" :label-width="formLabelWidth" prop="username">
          <el-input v-model="addUearForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="addUearForm.password" auto-complete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="addUearForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="mobile">
          <el-input v-model="addUearForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addResetForm('addUearForm')">重置</el-button>
        <el-button @click="addUearDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUearCheckData('addUearForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑对话框 -->
    <el-dialog title="编辑用户" :visible.sync="editUearDialogFormVisible">
      <el-form :model="editUearForm" :rules="addRules" ref="editUearForm">
        <el-form-item label="用户名称" :label-width="formLabelWidth" prop="username">
          <el-tag type="info">{{editUearForm.username}}</el-tag>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="editUearForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="mobile">
          <el-input v-model="editUearForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editUearDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUearCheckData('editUearForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 角色权限对话框 -->
    <el-dialog title="角色权限" :visible.sync="roleUearDialogFormVisible">
      <el-form :model="roleUearForm" :rules="addRules" ref="roleUearForm">
        <el-form-item label="用户名称" :label-width="formLabelWidth" prop="username">
          <el-tag type="info">{{roleUearForm.username}}</el-tag>
        </el-form-item>
        <el-form-item label="角色列表" :label-width="formLabelWidth" prop="rid">
          <el-select v-model="roleUearForm.rid" placeholder="请选择角色属性">
            <el-option v-for="(item, index) in roleUearForm.roleListArr"
            :key="index"
            :label="item.roleName"
            :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleUearDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sbuUserRole('roleUearForm')">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
// 引入请求接口
import {queryUserDataList, changeUserState, addUserData, deleteUserData, idQueryUserData, editUserDataUp, roleList, allotUserRole} from '@/api'
export default {
  data () {
    return {
      searchValue: '', // 搜索框的输入值
      pageNum: 1, // 页码
      pageSize: 10, // 每页显示多少条
      tableData: [], // 表格数据数组
      pageTotal: 0, // 初始总条数
      loading: true, // 数据加载动画
      // 添加用户对话框
      formLabelWidth: '80px', // 对话框属性宽度
      addUearDialogFormVisible: false, // 显示隐藏 添加用户对
      editUearDialogFormVisible: false, // 显示隐藏 编辑用户
      roleUearDialogFormVisible: false, // 显示隐藏 角色列表
      addUearForm: {
        username: '', // 用户名称
        password: '', // 用户密码
        email: '', // 邮箱
        mobile: '' // 手机号
      },
      // 添加表单验证
      addRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 - 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
          // { min: 6, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入11位手机号', trigger: 'blur' }
          // { min: 11, max: 11, message: '长度在 11位 字符', trigger: 'blur' }
        ]
      },
      // 编辑对话框
      editUearForm: {
        username: '', // 用户名称
        email: '', // 邮箱
        mobile: '', // 手机号
        id: '' // 用户id
      },
      // 角色权限对话框
      roleUearForm: {
        username: '', // 用户名称
        rid: '', // 选中角色 id
        id: '', // 用户 id
        roleListArr: [] // 角色列表选项
      }
    }
  },
  created () {
    this.initDateList()
  },
  methods: {
    // 分页筛选每页条数
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.initDateList()
    },

    // 页码跳转到指定页面
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pageNum = val
      this.initDateList()
    },

    // 用户数据列表
    initDateList () {
      let serValue = this.searchValue.trim()
      queryUserDataList(serValue, this.pageNum, this.pageSize).then(result => {
        if (result.meta.status === 200) {
          // console.log(result)
          this.tableData = result.data.users
          this.pageTotal = result.data.total
          // 数据回来之后关闭这个动画
          setTimeout(() => {
            this.loading = false
          }, 500)
        }
      })
    },

    // 修改用户状态
    changeState (row) {
      // console.log(row)
      changeUserState(row.id, row.mg_state).then(result => {
        if (result.meta.status === 200) {
          this.$message({message: result.meta.msg, type: 'success', duration: 800})
        } else {
          this.$message({message: '修改状态失败', type: 'error', duration: 1200})
        }
      })
    },

    // 添加用户 检查数据 上传数据
    addUearCheckData (formName) {
      // 检查数据不能为空
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 发送添加数据请求
          addUserData(this.addUearForm).then(result => {
            if (result.meta.status === 201) {
              this.$message({message: result.meta.msg, type: 'success', duration: 800})
              this.addUearDialogFormVisible = false
              // 清空输入框
              this.addResetForm('addUearForm')
              this.initDateList()
            } else {
              // 用户名已存在
              this.$message({message: '用户名已存在', type: 'error', duration: 800})
            }
          })
        } else {
          this.$message({message: '数据错误', type: 'error', duration: 800})
        }
      })
    },

    // 更新用户数据 检查数据 上传数据
    editUearCheckData (formName) {
      // 检查数据不能为空
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 发送添加数据请求
          editUserDataUp(this.editUearForm).then(result => {
            console.log(result)
            if (result.meta.status === 200) {
              this.$message({message: result.meta.msg, type: 'success', duration: 800})
              this.editUearDialogFormVisible = false
              this.initDateList()
            } else {
              this.$message({message: '更新失败', type: 'error', duration: 800})
            }
          })
        } else {
          this.$message({message: '数据错误，不能为空', type: 'error', duration: 800})
        }
      })
    },

    // 删除单个用户
    deleteUserId (id, name) {
      // 先排除不能删除admin
      if (name === 'admin') {
        this.$message({message: 'admin不能删除', type: 'error', duration: 800})
        return false
      } else {
        this.$confirm('是否删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteUserData(id).then(result => {
            if (result.meta.status === 200) {
              this.$message({message: result.meta.msg, type: 'success', duration: 800})
              this.initDateList()
            } else {
              this.$message({message: result.meta.msg, type: 'error', duration: 800})
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },

    // 编辑数据填充（根据ID查询用户信息）
    idDataFill (id, name) {
      idQueryUserData(id).then(result => {
        if (result.meta.status === 200) {
          this.editUearForm.username = result.data.username
          this.editUearForm.email = result.data.email
          this.editUearForm.mobile = result.data.mobile
          this.editUearForm.id = id
          this.editUearDialogFormVisible = true
        } else {
          this.$message({message: '获取数据失败', type: 'error', duration: 800})
        }
      })
    },

    // 表单重置
    addResetForm (formName) {
      this.$refs[formName].resetFields()
    },

    // 角色权限(渲染角色列表)
    roleUserData (id, name, row) {
      this.roleUearDialogFormVisible = true
      this.roleUearForm.username = name
      this.roleUearForm.id = id
      // 角色得到预览
      idQueryUserData(id).then(result => {
        // console.log(result)
        // console.log(result.data.rid)
        if (result.data.rid <= 0) {
          // console.log(11111111111111111)
          this.roleUearForm.rid = ''
        } else {
          // console.log(22222222222222)
          this.roleUearForm.rid = result.data.rid
        }
      })
      roleList().then(result => {
        this.roleUearForm.roleListArr = result.data
      })
    },

    // 分配用户角色
    sbuUserRole (formName) {
      if (this.roleUearForm.rid !== '') {
        allotUserRole(this.roleUearForm).then(result => {
          if (result.meta.status === 200) {
            this.roleUearDialogFormVisible = false
            this.roleUearForm.rid = ''
            this.$message({message: result.meta.msg, type: 'success', duration: 800})
          } else {
            this.$message({message: result.meta.msg, type: 'error', duration: 800})
          }
        })
      } else {
        this.$message({message: '请选择角色', type: 'warning', duration: 800})
      }
    }
  }
}

</script>
<style lang="scss" scoped>
.pageBox{
  padding: 5px 5px;
  background-color: #f5f5f5;
}
.US-search{
  width: 300px;
}
</style>
