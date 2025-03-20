import request from '@/utils/request'
import type { MenuQuery, MenuVO, MenuForm, RouteVO } from './model'

class MenuAPI {
  /**
   * 获取路由列表
   */
  // static getRoutes() {
  //   return request<any, RouteVO[]>({
  //     url: '/api/v1/menus/routes',
  //     method: 'get',
  //   })
  // }

  /**
   * 获取菜单树形列表
   *
   * @param queryParams
   */
  static getMenuList(queryParams: MenuQuery) {
    return request<any, MenuVO[]>({
      url: '/api/v1/menu/getList',
      method: 'post',
      data: queryParams,
    })
  }

  /**
   * 添加菜单
   *
   * @param body
   */
  static addMenu(body: MenuQuery) {
    return request<any, MenuVO[]>({
      url: '/api/v1/menu/add',
      method: 'post',
      data: body,
    })
  }

  /**
   * 编辑菜单
   *
   * @param body
   */
  static editMenu(body: MenuQuery) {
    return request<any, MenuVO[]>({
      url: '/api/v1/menu/edit',
      method: 'post',
      data: body,
    })
  }
}

export default MenuAPI
