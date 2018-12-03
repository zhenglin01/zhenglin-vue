<template>
  <div>
    <el-container>
      <el-main><div>
        <div style="text-align: right;margin-bottom: 10px;">
          <el-input
            placeholder="请输入用户名"
            v-model="username" style="width: 200px;float: left;padding-right:30px">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button type="primary" icon="el-icon-search" @click="getData(username)" style="float: left;height: 38px">查询
          </el-button>
          <el-button type="primary" @click="openDialog">新增</el-button>
        </div>
        <el-table border :data="userData">
          <el-table-column align='center' label="用户名" prop="username"></el-table-column>
          <el-table-column align='center' label="密码" prop="password"></el-table-column>
          <el-table-column align='center' label="部门名称" prop="deptName"></el-table-column>
          <el-table-column align='center' label="操作" prop="id">
            <tamplate slot-scope="scope">
              <el-button @click="update(scope.row)" type="success">
                修改
              </el-button>
              <el-button @click="remove(scope.row.id)" type="danger">
                删除
              </el-button>
            </tamplate>
          </el-table-column>
        </el-table>
        <div class="pageStyle">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="query.pageSize"
            @current-change="pageChange">
          </el-pagination>
        </div>
        <UserForm :visible.sync="visible" @success="loadData"
                  :formData="formData" :title="title" ></UserForm><!--用":"表示为变量，否则为字符串-->
      </div></el-main>
    </el-container>
  </div>
</template>
<script>
import UserForm from './form.vue'
import UserApi from '@/api/user'

export default {
  components: {UserForm},
  props: {
    partId: {
      type: Number
    }
  },
  watch: {
    partId (val) {
      if (val) {
        this.getUsersList(this.partId)
      }
    }
  },
  data () {
    return {
      username: null,
      count: 1,
      visible: false,
      title: '',
      userData: [], // 必须声明
      total: 20,
      query: {
        pageNum: 1,
        pageSize: 4,
        username: ''
      },
      formData: {
        id: '',
        username: '',
        password: '',
        partId: ''
      },
      rules: {
        username: {
          required: true, message: '请输入用户名'
        },
        password: {
          required: true, message: '请输入密码'
        },
        id: {
          required: true, message: '请输入组织id'
        }
      }
    }
  },
  async mounted () {
    this.loadData()
  },
  methods: {
    async loadData () {
      this.query.username = ''
      let resp = await UserApi.query(this.query)
      this.userData = resp.list
      console.log(resp)
      this.total = resp.total
    },
    async getData (username) {
      this.query.username = username
      let resp = await UserApi.query(this.query)
      this.userData = resp.list
      this.total = resp.total
    },
    async openDialog () {
      this.visible = true
      this.title = '新增用户'
    },
    // 删除用户
    remove (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(async () => {
        let resp = await UserApi.remove(id)
        if (resp.data.state == null) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.loadData()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 根据partId查询
    async getUsersList (partId) {
      let resp = await UserApi.queryUsers(partId)
      this.userData = resp.data.list
      this.total = resp.data.total
    },
    async update (user) {
      this.formData = user
      this.visible = true
      this.title = '修改用户'
    },
    pageChange (page) {
      this.query.pageNum = page
      this.loadData()
    },
    queryUser (data) {
      this.query.partId = data
      this.loadData()
    }
  }
}
</script>
<style>
  .pageStyle{
    text-align: center;
  }
</style>
