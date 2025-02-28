// translate router.meta.title, be used in breadcrumb sidebar tagsview
import i18n from '@/lang/index'

export function translateRouteTitle(name: any, title: any) {
  // 判断是否存在国际化配置，如果没有原生返回
  const hasKey = i18n.global.te('route.' + name)
  if (hasKey) {
    const translatedTitle = i18n.global.t('route.' + name)
    return translatedTitle
  }
  return title || name
}
