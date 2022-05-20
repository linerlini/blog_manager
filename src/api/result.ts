import server from 'api/server'
import {
  ResponseData,
  ResponsePageData,
  ProfileResultModel,
  RequestPageData,
  RequestEditResult,
  AnnouncementModel,
} from 'types/server'
// 项目
export async function requestResultsList(params: RequestPageData) {
  const result = await server.post<ResponsePageData<ProfileResultModel>>('/results/list', params)
  return result.data
}
export async function requestAddResult(params: Partial<ProfileResultModel>) {
  const result = await server.post<ResponseData<null>>('/results/add', params)
  return result.data
}
export async function requestEditResult(params: Partial<ProfileResultModel>) {
  const result = await server.post<ResponseData<null>>('/results/edit', params)
  return result.data
}
export async function requestResultInfo(id: string) {
  const result = await server.get<ResponseData<ProfileResultModel>>('/results/info', {
    params: {
      id,
    },
  })
  return result.data
}
export async function requestDeleteResult(id: string) {
  const result = await server.get<ResponseData<null>>('/results/delete', {
    params: {
      uuid: id,
    },
  })
  return result.data
}

// 公告
export async function requestAnnouncementList(params: RequestPageData) {
  const result = await server.post<ResponsePageData<AnnouncementModel>>('/blog/announcement/list', params)
  return result.data
}
export async function requestAddAnnouncement(content: string) {
  const result = await server.get<ResponseData<AnnouncementModel>>('/blog/announcement/add', {
    params: {
      content,
    },
  })
  return result.data
}
