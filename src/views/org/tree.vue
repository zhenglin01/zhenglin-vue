<template>
  <el-container>
    <el-aside width="255px">
      <div class="custom-tree-container">
        <el-button type="primary" size="size" @click="addNode" class="el-icon-plus">添加新部门</el-button>

        <div class="grid-content bg-purple">
          <el-tree :props="pr"
                   :load="loadDept"
                   :key="id"
                   :expand-on-click-node="false"
                   lazy>
            <!--自定义树节点的内容，参数为 { node, data }-->
            <span  class="custom-tree-node"  slot-scope="{ node, data }">
                <span @click="search(data)">{{node.label}}</span>
           <span>
             <el-button  type="text"
                         size="mini"
                         @click="updateDept(data)">
               <i class="el-icon-edit"></i>修改
             </el-button>
             <el-button type="text"
                        size="mini"
                        @click="deleteDept(node, data)">
               <i class="el-icon-delete"></i>删除
          </el-button>
        </span>
        </span>
          </el-tree>
        </div>
        <!--树形结构-->

        <!--操作弹框-->
        <el-dialog :title="treeTitle" :visible.sync="isShow" >
          <div>
            <el-form ref="treeForm" label-width="100px" :model="treeForm" :rules="rules">
              <el-input v-model="treeForm.id" type="hidden"></el-input>
              <el-form-item label="部门号" prop="id">
                <el-input v-model="treeForm.id"></el-input>
              </el-form-item>
              <el-form-item label="部门名" prop="deptName">
                <el-input v-model="treeForm.deptName"></el-input>
              </el-form-item>
              <el-form-item label="上级部门" prop="mgr">
                <el-select :disabled="disabled" v-model="treeForm.mgr">
                  <el-option key="0" label="请选择" value="0"></el-option>
                  <el-option
                    v-for="item in treeDept"
                    :label="item.deptName"
                    :value= "item.id"
                    :key="item.mgr">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer">
            <el-button type="primary" @click="saveOrg">保存</el-button>
            <el-button type="primary" @click="close">关闭</el-button>
          </div>
        </el-dialog>

      </div>
    </el-aside>
    <el-main>
      <UserIndex :partId="checkId"></UserIndex>
    </el-main>
  </el-container>

</template>

<script>
import OrgApi from '@/api/org'
import UserIndex from '@/views/user/index'
export default {
  // 展示数据
  components: {
    UserIndex
  },
  data () {
    return {
      disabled: false,
      checkId: null,
      pr: {
        // 指定节点标签为节点对象的某个属性值
        label: 'deptName',
        // 指定子树为节点对象的某个属性值
        id: 'id',
        children: 'child',
        isLeaf: 'leaf'
      },
      treeDept: {
        id: '',
        deptName: '',
        mgr: ''
      },
      // 树形结构数据
      treeData: [],
      visible: false,
      // 弹出框标题
      treeTitle: '',
      // 弹出框是否展示
      isShow: false,
      title: '',
      // 弹出框数据
      treeForm: {
        id: '',
        deptName: '',
        mgr: ''
      },
      org: {
        id: '',
        deptName: '',
        mgr: ''
      },
      id: '',
      rules: {
        deptName: {
          required: true, message: '请输入新的部门名称'},
        id: {
          required: true, message: '请输入组织简称'}
      }
    }
  },
  async mounted () {
    // 把所有的部门号都查询出来
    let list = await OrgApi.query()
    console.log(123456 + list)
    this.treeDept = list.data.list
    console.log(list)
    console.log('我的部门' + this.treeDept)
  },

  methods: {
    // 加载
    async loadTree (flag) {
      this.visible = flag
      this.$router.push({
        name: 'tree',
        query: {
          _t: Date.now()
        }
      }
      )
    },

    // 把所有的上下树形级关系遍历到数组中
    async loadDept (node, resolve) {
      // let treeData = []
      let res = []
      if (node.level === 0) {
        console.log(node)
        res = await OrgApi.queryMgr(0)// 查询上级领导为0的部门
        console.log(res)
      } else {
        console.log(node)
        res = await OrgApi.queryMgr(node.data.id)// c查询该部门的下属部门
      }
      resolve(res.data)
    },

    addNode () {
      this.treeForm = {
        id: null,
        deptName: null,
        mgr: null
      }
      this.isShow = true
      this.treeTitle = '添加新的部门'
      this.disabled = false
    },
    updateDept (data) {
      this.isShow = true
      this.treeTitle = '修改部门信息'
      this.treeForm = {
        id: data.id,
        deptName: data.deptName,
        mgr: data.mgr
      }
      this.disabled = false
    },
    saveOrg (id) {
      this.$refs['treeForm'].validate(async valid => {
        if (valid) {
          let record = []
          if (this.treeTitle === '修改部门信息') {
            record = await OrgApi.modify(this.treeForm)
          } else {
            record = await OrgApi.create(this.treeForm)
            console.log(record.data.message)
          }
          if (record.data.state === 1) {
            this.isShow = false
            this.$message({
              message: record.data.message,
              type: 'success'
            })
          } else {
            this.isShow = false
            this.$message({
              message: record.data.message,
              type: 'fail'
            })
          }
          this.loadTree()
        }
      })
    },
    deleteDept (node, data) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let resp = await OrgApi.remove(data.id)
        console.log(resp)
        if (resp.status === 200) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '删除失败',
            type: 'fail'
          })
          this.loadDept()
        }
        this.loadTree()
      }).catch(() => {

      })
    },
    close () {
      this.isShow = false
    },
    async search (data) {
      this.checkId = data.id
    }
  }
}
</script>

<style scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .el-icon-plus{
    width: 100px;
    height: 30px;
    font-size: 50%;
  }
</style>
