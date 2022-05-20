import server from 'api/server'
import { ArticleModel, RequestPageData, CatalogueModel, ResponsePageData, ResponseData } from 'types/server'

export async function requestArticleTypeList(params: RequestPageData) {
  const result = await server.post<ResponsePageData<CatalogueModel>>('/article/types/list', params)
  return result.data
}
export async function requestEditArticleType(params: FormData) {
  const result = await server.post<ResponseData<null>>('/article/types/edit', params)
  return result.data
}
export async function requestAddArticleType(params: FormData) {
  const result = await server.post<ResponseData<null>>('/article/types/add', params)
  return result.data
}
export async function requestDeleteArticleType(id: string) {
  const result = await server.get<ResponseData<null>>('/article/types/delete', {
    params: {
      uuid: id,
    },
  })
  return result.data
}
export async function requestArticleTypeInfo(id: string) {
  const result = await server.get<ResponseData<CatalogueModel>>('/article/types/info', {
    params: {
      id,
    },
  })
  return result.data
}
export async function requestArticleTypes() {
  const result = await server.get<ResponseData<CatalogueModel[]>>('/article/types/all')
  return result.data
}
// 文章
export async function requestArticleInfo(id: string) {
  const result = await server.get<ResponseData<ArticleModel>>('/article/info', {
    params: {
      id,
    },
  })
  return result.data
}
export async function requestAddArticle(params: FormData) {
  const result = await server.post<ResponseData<null>>('/article/add', params)
  return result.data
}
export async function requestEditArticle(params: FormData) {
  const result = await server.post<ResponseData<null>>('/article/edit', params)
  return result.data
}
export async function requestDeleteArticle(id: string) {
  const result = await server.get<ResponseData<null>>('/article/delete', {
    params: {
      uuid: id,
    },
  })
  return result.data
}
export async function requestArticleList(params: RequestPageData) {
  const result = await server.post<ResponsePageData<ArticleModel>>('/article/list', params)
  return result.data
}
