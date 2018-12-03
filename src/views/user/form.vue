<template>

  <el-dialog
    :visible.sync="visible"
    :title="title"
  >
    <div>
      <el-form ref="form" label-width="100px" :model="userForm" :rules="rules">
        <el-input v-model="userForm.id" type="hidden"></el-input>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="userForm.password"></el-input>
        </el-form-item>
        <el-form-item label="部门号" prop="partId">
          <el-input v-model="userForm.partId"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer">
      <el-button type="primary" @click="save">保存</el-button>
      <el-button type="primary" @click="closeDialog">关闭</el-button>
    </div>
</el-dialog>

</template>
<script>
import UserApi from '@/api/user'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    formData: {type: Object},
    flag: {
      type: Number
    }
  },
  watch: {
    visible (val) {
      this.userForm = {
        username: null,
        password: null,
        partId: null
      }
      // this.userForm.partId = this.partId
      if (this.title === '修改用户') {
        this.userForm = this.formData
      }
      if (!val) {
        this.$emit('update:visible', false)
        if (this.title === '新增用户') {
          this.userForm = {
            username: null,
            password: null,
            partId: ''
          }
          this.$refs['form'].resetFields()
        }
      }
    }
  },
  async mounted () {

  },
  data () {
    return {
      rules: {
        username: [
          {required: true, trigger: 'change', message: '请输入姓名!'}
        ],
        password: [
          {required: true, trigger: 'change', message: '请输入密码!'}
        ],
        partId: [
          {required: true, trigger: 'change', message: '请输入部门id!'}
        ]
      },
      userForm: {
        username: null,
        password: null,
        partId: null
      }
    }
  },
  methods: {
    save () {
      this.$refs['form'].validate(async valid => {
        if (valid) {
          let record = null
          if (this.userForm.id !== '' && this.userForm.id != null) {
            record = await UserApi.modify(this.userForm)
            this.visible = false
          } else {
            record = await UserApi.create(this.userForm)
            this.visible = false
          }
          if (record.data.state === 1) {
            this.visible = false
            this.$emit('success')
            this.$message({
              message: record.data.message,
              type: 'success'
            })
          }
        }
      })
    },
    closeDialog () {
      this.visible = false
    }
  }
}
</script>
