import { EmptyProps } from 'antd'
import * as React from 'react'
import { matchRoutes, useLocation } from 'react-router-dom'
import { selectRole } from 'store/slices/user_slice'
import { useAppSelector } from 'utils/hooks'

const RouterAuth: React.FC<EmptyProps> = function RouterAuth({ children }) {
  const userRole = useAppSelector(selectRole)
  const location = useLocation()
  // const matchs = matchRoutes( ,location)
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>
}

export default RouterAuth
