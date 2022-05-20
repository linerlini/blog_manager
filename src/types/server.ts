import { UserRole } from 'utils/constants'

export interface ResponseData<T> {
  code: number
  data: T
  msg: string
}
export type ResponsePageData<T> = ResponseData<{ count: number; data: T[] }>

export interface TableRecordBase {
  uuid: string
  createdAt: string
  updatedAt: string
}
export interface UserModel extends TableRecordBase {
  name: string
  account: string
  password: string
  imgURL?: string
  desc: string
  status: string
  thumbUpCount: number
  role: UserRole
}
export interface CatalogueModel extends TableRecordBase {
  name: string
  desc: string
  imgURL?: string
  artilcesCount: number
  authorUUID: string
  authorName: string
}
export interface ArticleModel extends TableRecordBase {
  type: string // 文章类型
  typeName: string
  name: string
  desc: string
  imgURL?: string // 封面图
  commentCount: number
  thumbUpCount: number
  contentURL?: string
  authorUUID: string
  authorName: string
  uuid: string
}
export interface ProfileResultModel extends TableRecordBase {
  name: string
  desc: string
  showAddress: string
  respository: string
}
export interface AnnouncementModel extends TableRecordBase {
  content: string
}
// 请求
export interface RequestRegisterBody {
  password: string
  account: string
  userName: string
}
export interface RequestLoginBody {
  password: string
  account: string
}
export interface RequestPageData {
  offset: number
  size: number
  searchText?: string
}

export interface RequestAddArticle {
  name: string
  desc: string
  type: string
  typeName: string
  uuid: string
}
// 项目
export interface RequestEditResult {
  name: string
  desc: string
  showAddress: string
  respository: string
}
// 响应
