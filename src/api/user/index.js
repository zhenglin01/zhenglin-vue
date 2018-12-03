import axios from 'axios'

export default {
  query: async (query) => {
    let resp = await axios.get(`/api/users?username=${query.username}&pageNum=${query.pageNum}&pageSize=${query.pageSize}`)
    return resp.data
  },
  create: async (user) => {
    let resp = await axios.post('/api/users', user)
    return resp
  },
  remove: async (id) => {
    let resp = await axios.delete(`/api/users/${id}`)
    return resp
  },
  modify: async (user) => {
    let resp = await axios.put(`/api/users`, user)
    return resp
  },
  login: async (user) => {
    let resp = await axios.post('/api/users/actions/login', user)
    return resp
  },
  queryUsers: async (partId) => {
    let resp = await axios.get(`/api/users/actions/users?partId=${partId}`)
    return resp
  }
}
