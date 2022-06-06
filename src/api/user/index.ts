import server from 'api/server'
import {
  RequestRegisterBody,
  ResponseData,
  UserModel,
  RequestLoginBody,
  RequestPageData,
  ResponsePageData,
} from 'types/server'

export async function requestRegister(params: RequestRegisterBody) {
  const result = await server.post<ResponseData<UserModel>>('/user/register', params)
  return result.data
}
export async function requestLogin(params: RequestLoginBody) {
  const result = await server.post<ResponseData<UserModel>>('/user/login', params)
  return result.data
}
export async function requestLogOut() {
  const result = await server.get<ResponseData<null>>('/user/logout')
  return result.data
}
export async function requestAutoLogign() {
  const result = await server.get<ResponseData<UserModel>>('/user/auto')
  return result.data
}
export async function requestUploadAvatar(data: FormData) {
  const result = await server.post<ResponseData<string>>('/user/avatar', data)
  return result.data
}
export async function reuestEditUserInfo(params: Partial<UserModel>) {
  const result = await server.post<ResponseData<null>>('/user/edit', params)
  return result.data
}
export async function requestUserList(params: RequestPageData) {
  const result = await server.post<ResponsePageData<UserModel>>('/user/list', params)
  return result.data
}
export async function requestChangeAdmin(account: string, type: 'cancel' | 'add') {
  const result = await server.post<ResponseData<null>>('/user/change/admin', {
    account,
    type,
  })
  return result.data
}
