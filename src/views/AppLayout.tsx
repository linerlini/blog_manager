import * as React from 'react'
import { Outlet } from 'react-router-dom'
import { EmptyReactPops } from 'types/index'

const AppLayout: React.FC<EmptyReactPops> = function PageLayout() {
  return <Outlet />
}
export default AppLayout
