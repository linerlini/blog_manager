import { Layout } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import Sider from 'antd/lib/layout/Sider'
import SiderMenu from 'components/SiderMenu'
import * as React from 'react'
import { Outlet } from 'react-router-dom'
import { EmptyReactPops } from 'types/index'

const DirectoryPageLayout: React.FC<EmptyReactPops> = function DirectoryPageLayout() {
  return (
    <Layout className="flex-row" hasSider>
      <Sider>
        <SiderMenu />
      </Sider>
      <Content className="p-5">
        <Outlet />
      </Content>
    </Layout>
  )
}

export default DirectoryPageLayout
