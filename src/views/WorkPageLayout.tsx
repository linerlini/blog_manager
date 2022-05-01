import { Layout } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import * as React from 'react'
import { Outlet } from 'react-router-dom'
import { EmptyReactPops } from 'types/index'

const WorkPageLayout: React.FC<EmptyReactPops> = function PageLayout() {
  return (
    <Layout>
      <Header />
      <Outlet />
    </Layout>
  )
}
export default WorkPageLayout
