import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useRoutes } from 'react-router-dom'
import { useAppDispatch } from 'utils/hooks'
import RouterAuth from 'components/RouterAuth'
import useAppRoutes from './router'

function App() {
  const dispatch = useAppDispatch()
  const location = useLocation()

  const routes = useAppRoutes()
  const pages = useRoutes(routes)
  return pages
}

export default App
