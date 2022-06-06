import * as React from 'react'
import { RouteObject, Navigate } from 'react-router-dom'
import AppLayout from 'views/layout/AppLayout'
import WorkPageLayout from 'views/layout/WorkPageLayout'
import DirectoryPageLayout from 'views/layout/DirectoryPageLayout'
import LoginPage from 'views/login'
import { useAppSelector } from 'utils/hooks'
import createLazyComponent from 'components/LazyComponent'
import HomePage from 'views/home'
import SearchTable from 'views/directory'
import { selectRole } from 'store/slices/user_slice'
import { TableType, UserRole } from 'utils/constants'
import ArticleTypePage from 'views/detail/ArticleType'
import ArticlePage from 'views/detail/Article'
import ResultPage from 'views/detail/Result'
import PersonalPage from 'views/person_page'

const LazyWorkPageLayout = createLazyComponent(WorkPageLayout)
const LazyDirectoryPageLayout = createLazyComponent(DirectoryPageLayout)
const LazyHomePage = createLazyComponent(HomePage)
const LazySearchTable = createLazyComponent(SearchTable)
const LazyArticleTypePage = createLazyComponent(ArticleTypePage)
const LazyArticlePage = createLazyComponent(ArticlePage)
const LazyResultPage = createLazyComponent(ResultPage)
const LazyPersonPage = createLazyComponent(PersonalPage)
const LazyRoleManager = createLazyComponent(React.lazy(() => import('views/role/RoleManager')))
interface RouteObj extends RouteObject {
  meta?: {
    roles: UserRole[]
  }
  children?: RouteObj[]
}
const useAppRoutes = () => {
  const loginStatus = useAppSelector(selectRole)

  const route: RouteObj[] = [
    {
      path: '/',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <LoginPage />,
        },
        {
          path: 'work',
          meta: {
            roles: [UserRole.NORMAL_USER, UserRole.ADMIN, UserRole.BLOG],
          },
          element: loginStatus !== UserRole.TOURISTS ? LazyWorkPageLayout : <Navigate to="/" replace />,
          children: [
            {
              path: 'directory',
              element: LazyDirectoryPageLayout,
              children: [
                {
                  index: true,
                  element: LazyHomePage,
                },
                {
                  path: 'normal/:type',
                  element: LazySearchTable,
                },
                {
                  path: 'admin/:type',
                  element: [UserRole.ADMIN, UserRole.BLOG].includes(loginStatus) ? (
                    LazySearchTable
                  ) : (
                    <Navigate to="/work/directory" replace />
                  ),
                },
                {
                  path: 'blog/role',
                  element: loginStatus === UserRole.BLOG ? LazyRoleManager : <Navigate to="/work/directory" replace />,
                },
                {
                  path: 'personal',
                  element: LazyPersonPage,
                },
              ],
            },
            {
              path: `${TableType.ARTICLE}/:workType`,
              element: LazyArticlePage,
            },
            {
              path: `${TableType.ARTICLE_TYPE}/:workType`,
              element: LazyArticleTypePage,
            },
            {
              path: `${TableType.RESULT}/:workType`,
              element: LazyResultPage,
            },
          ],
        },
      ],
    },
  ]
  return route
}
export default useAppRoutes
