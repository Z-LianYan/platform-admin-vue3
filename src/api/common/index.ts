import request, { post } from '@/utils/request'
export default class CommonApi {
  static async getQiniuToken() {
    return post({
      url: '/api/v1/common/getQiNiuToken',
      data: {},
      loading: true,
    })
  }
}
