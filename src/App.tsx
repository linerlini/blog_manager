import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useRoutes } from 'react-router-dom'
import { useAppDispatch } from 'utils/hooks'
import useAppRoutes from './router'

function App() {
  const dispatch = useAppDispatch()
  const location = useLocation()
  // useEffect(() => {
  //   const { pathname } = location
  //   requestAutoLogign().then((result) => {
  //     if (result.code === ResponseCode.SUCCESS) {
  //       const { data } = result
  //       dispatch(setUser(data))
  //       dispatch(setLogin(true))
  //     }
  //   })
  // }, [])
  const routes = useAppRoutes()
  const pages = useRoutes(routes)
  return pages
}

export default App
