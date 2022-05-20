export function normalizeStr(value: string) {
  return value.replace(/\s*/g, '')
}
export function setLocalStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value))
}
export function getLocalStorage(key: string) {
  const result = localStorage.getItem(key)
  if (result === null) {
    return null
  }
  return JSON.parse(result)
}
export function isUrl(url: string) {
  return /^(https?:\/\/(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+))(:\d+)?(\/.*)?(\?.*)?(#.*)?$/.test(
    url,
  )
}
