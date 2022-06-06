import { Avatar, Tooltip, Button } from 'antd'
import { requestLogOut } from 'api/user'
import * as React from 'react'
import { EmptyReactPops } from 'types/index'

type Props = {
  userName: string
  avatarUrl?: string
}
const HeaderBar: React.FC<Props> = function HeaderBar(props) {
  const { userName, avatarUrl } = props
  async function logOut() {
    await requestLogOut()
    window.location.assign('/')
  }
  return (
    <div className="flex w-full items-center justify-between">
      <div className="text-2xl text-white font-bold">Blog Manger</div>

      <Tooltip placement="top" color="white" title={<Button onClick={logOut}>退出登录</Button>}>
        <div>{avatarUrl ? <Avatar src={avatarUrl} /> : <Avatar>{userName}</Avatar>}</div>
      </Tooltip>
    </div>
  )
}
HeaderBar.defaultProps = {
  avatarUrl: '',
}
export default React.memo(HeaderBar)
