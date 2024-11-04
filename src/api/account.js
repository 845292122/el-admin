import { service } from '@/utils'

const baseURL = '/account'

export const $AccountApi = {
  getAccountList: (params) => service.get(`${baseURL}/list`, { params }),
  getAccountInfo: (aid) => service.get(`${baseURL}/${aid}`),
  createAccount: (data) => service.post(`${baseURL}/create`, data),
  modifyAccount: (data) => service.post(`${baseURL}/modify`, data),
  removeAccount: (aid) => service.post(`${baseURL}/remove/${aid}`),
}
