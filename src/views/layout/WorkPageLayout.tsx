import { Layout } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import * as React from 'react'
import { Outlet } from 'react-router-dom'
import { EmptyReactPops } from 'types/index'
import HeaderBar from 'components/HeaderBar'
import { useAppSelector } from 'utils/hooks'
import { selectUser } from 'store/slices/user_slice'

const WorkPageLayout: React.FC<EmptyReactPops> = function PageLayout() {
  const user = useAppSelector(selectUser)
  return (
    <Layout className="h-screen">
      <Header>
        <HeaderBar userName={user.name} avatarUrl={user.imgURL} />
      </Header>
      <Outlet />
    </Layout>
  )
}
export default WorkPageLayout
