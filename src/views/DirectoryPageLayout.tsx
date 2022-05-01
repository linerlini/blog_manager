import { Content } from 'antd/lib/layout/layout'
import Sider from 'antd/lib/layout/Sider'
import * as React from 'react'
import { Outlet } from 'react-router-dom'
import { EmptyReactPops } from 'types/index'

const DirectoryPageLayout: React.FC<EmptyReactPops> = function DirectoryPageLayout() {
  return (
    <>
      <Sider />
      <Content>
        <Outlet />
      </Content>
    </>
  )
}

export default DirectoryPageLayout
