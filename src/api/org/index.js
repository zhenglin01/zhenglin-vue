import axios from 'axios'
export default {
  query: async () => {
    let resp = await axios.get(`/api/depts/`)
    return resp
  },
  queryMgr: async (mgr) => {
    let resp = await axios.get(`/api/depts/actions?mgr=${mgr}`)
    return resp
  },
  create: async (org) => {
    let resp = await axios.post('/api/depts/', org)
    return resp
  },
  remove: async (id) => {
    let resp = await axios.delete(`/api/depts/${id}`)
    return resp
  },
  modify: async (org) => {
    let resp = await axios.put(`/api/depts/`, org)
    return resp
  },
  queryDeptName: async (deptName) => {
    let resp = await axios.get(`/api/depts/actions/names?deptName=${deptName}`)
    return resp
  }
}
