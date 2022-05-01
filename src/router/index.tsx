import { RouteObject } from 'react-router-dom'
import AppLayout from 'views/AppLayout'
import WorkPageLayout from 'views/WorkPageLayout'
import * as React from 'react'
import DirectoryPageLayout from 'views/DirectoryPageLayout'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: 'login',
      },
      {
        path: 'work',
        element: <WorkPageLayout />,
        children: [
          {
            path: 'directory',
            element: <DirectoryPageLayout />,
          },
          {
            path: 'detail',
          },
        ],
      },
    ],
  },
]
