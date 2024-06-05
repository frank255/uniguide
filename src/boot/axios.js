import { boot } from 'quasar/wrappers'
import axios from 'axios'

axios.defaults.withCredentials = true;

axios
  .get(`${process.env.SANCTUM_URL}/sanctum/csrf-cookie`)
  .then((response) => { });

const api = axios.create({
  baseURL: `${process.env.API_URL}/api/v1.0`,
  headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
})

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
