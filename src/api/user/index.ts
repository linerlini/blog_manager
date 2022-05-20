import server from 'api/server'
import { RequestRegisterBody, ResponseData, UserModel, RequestLoginBody } from 'types/server'

export async function requestRegister(params: RequestRegisterBody) {
  const result = await server.post<ResponseData<UserModel>>('/user/register', params)
  return result.data
}
export async function requestLogin(params: RequestLoginBody) {
  const result = await server.post<ResponseData<UserModel>>('/user/login', params)
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
