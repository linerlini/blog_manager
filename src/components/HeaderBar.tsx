import { Avatar } from 'antd'
import * as React from 'react'
import { EmptyReactPops } from 'types/index'

type Props = {
  userName: string
  avatarUrl?: string
}
const HeaderBar: React.FC<Props> = function HeaderBar(props) {
  const { userName, avatarUrl } = props
  return (
    <div className="flex w-full items-center justify-between">
      <div className="text-2xl text-white font-bold">Blog Manger</div>
      <div>{avatarUrl ? <Avatar src={avatarUrl} /> : <Avatar>{userName}</Avatar>}</div>
    </div>
  )
}
HeaderBar.defaultProps = {
  avatarUrl: '',
}
export default React.memo(HeaderBar)
