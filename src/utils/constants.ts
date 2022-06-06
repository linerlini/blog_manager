export const enum ResponseCode {
  SUCCESS = 0,
  LENGTH_ERROR = 1, // 值长度不符合要求
  REPEAT_ERROR = 2, // 值重复
  LACK_OF_ERROR = 3, // 少值
  NO_MATCH_ERROR = 4, // 值不匹配
  RESPONSE_ERROR = 999, // 请求在响应时错误
  REQUEST_ERROR = 998, // 请求在前端出出错
  TOKEN_OUT = 997, // jwt过期
  TOKEN_WRONG = 996,
  NETWORK_ERROR = 995, // 网络问题
}
export const enum TableType {
  ARTICLE = 'article',
  ARTICLE_TYPE = 'articletype',
  RESULT = 'result',
  ANNOUNCEMENT = 'announcement',
}
export const enum UserRole {
  TOURISTS = 0,
  NORMAL_USER = 1,
  ADMIN = 2,
  BLOG = 3,
}
export const enum WorkType {
  ADD = 'add',
  EDIT = 'edit',
  VIEW = 'view',
}
export const enum LoadStatus {
  SUCCESS = 'success',
  LOADING = 'loading',
  ERROR = 'error',
}
export const KB = 1024
export const MB = 1024 * KB
