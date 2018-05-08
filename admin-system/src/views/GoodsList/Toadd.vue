<template>
<div class="toadd">
<!-- 导航地址（面包屑） -->
<el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><a href="javascript:;">商品管理</a></el-breadcrumb-item>
  <el-breadcrumb-item>添加商品</el-breadcrumb-item>
</el-breadcrumb>

<el-row class="colHeader">
  <el-col :span="24"><div class="grid-content bg-purple-dark">添加商品信息</div></el-col>
</el-row>
<!-- 步骤条 -->
<el-steps :active="active" finish-status="success" class="mt-15 pl-20">
  <el-step title="步骤 1"></el-step>
  <el-step title="步骤 2"></el-step>
  <el-step title="步骤 3"></el-step>
  <el-step title="步骤 4"></el-step>
  <el-step title="步骤 5"></el-step>
</el-steps>

  <!-- Tabs 标签页 -->
<el-tabs v-model="activeName" @tab-click="handleClick" tab-position="left">
  <el-tab-pane label="基本信息" name="first">基本信息</el-tab-pane>
  <el-tab-pane label="商品参数" name="second">商品参数</el-tab-pane>
  <el-tab-pane label="商品属性" name="third">商品属性</el-tab-pane>

  <!-- 商品图片 -->
  <el-tab-pane label="商品图片" name="fourth">
    <!-- action 是上传地址 -->
    <el-upload
      class="upload-demo"
      action="http://localhost:8888/api/private/v1/upload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList2"
      :headers='myToken'
      :on-success="handleAvatarSuccess"
      :on-error="handleError"
      list-type="picture">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </el-tab-pane>

  <!-- 商品内容 -->
  <el-tab-pane label="商品内容" name="Concontent">
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)">
    </quill-editor>
  </el-tab-pane>
</el-tabs>
</div>
</template>

<script>
export default {
  data () {
    return {
      active: 0, // 步骤条
      activeName: 'first', // 标签页
      content: '我是文本编辑器', // 副文本里面的内容
      editorOption: {
      },
      // 上传图片预览地址
      fileList2: [],
      myToken: {
        Authorization: localStorage.getItem('loginToken')
      }
    }
  },

  methods: {
    // tab 标签页切换触发的事件
    handleClick (tab, event) {
      this.active = parseInt(tab.index)
      // console.log(tab, event)
    },
    // 富文本
    onEditorBlur (quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus (quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady (quill) {
      console.log('editor ready!', quill)
    },
    // 照片上传
    handleRemove (file, fileList) {
      console.log(7777)
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(9999)
      console.log(file)
    },
    // 成功回调
    handleAvatarSuccess (response, file, fileList) {
      // console.log(55555555)
      console.log(response)
      this.$message({message: response.meta.msg, type: 'success', duration: 1600})
    },
    // 失败回调
    handleError (err, file, fileList) {
      console.log(6666666)
      console.log(err, file, fileList)
    }
  },
  computed: {
    // 富文本
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  }
}
</script>
<style lang="scss" scoped>
.add-goods {
  .el-tabs {
    height: 400px;
  }
}
.quill-editor {
  height: 400px;
  .ql-container {
    height: 300px;
  }
}
.colHeader {
  padding: 12px;
  background-color: #d7e2ef;
}
</style>
