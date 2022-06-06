import { Menu } from 'antd'
import * as React from 'react'
import { EmptyReactPops } from 'types/index'
import {
  FileFilled,
  SwitcherFilled,
  HddFilled,
  FolderFilled,
  ProjectFilled,
  HomeFilled,
  UserOutlined,
} from '@ant-design/icons'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { useNavigate } from 'react-router-dom'
import type { MenuInfo } from 'rc-menu/lib/interface'
import { TableType, UserRole } from 'utils/constants'
import { useAppSelector } from 'utils/hooks'
import { selectRole } from 'store/slices/user_slice'

const { useMemo } = React
const SiderMenu: React.FC<EmptyReactPops> = function SiderMenu() {
  const navigate = useNavigate()
  const menuItemClickHandle = ({ key }: MenuInfo) => {
    navigate(key)
  }
  const loginStatus = useAppSelector(selectRole)
  const filterMenuItems = useMemo(() => {
    const result: ItemType[] = [
      {
        icon: <FileFilled />,
        label: '文章管理',
        title: '文章管理',
        key: 'articleManager',
        children: [
          {
            icon: <SwitcherFilled />,
            label: '我的文章',
            title: '我的文章',
            key: `/work/directory/normal/${TableType.ARTICLE}`,
          },
          {
            icon: <HddFilled />,
            label: '我的文章类型',
            title: '我的文章类型',
            key: `/work/directory/normal/${TableType.ARTICLE_TYPE}`,
          },
        ],
      },
      {
        icon: <FolderFilled />,
        label: '项目管理',
        title: '项目管理',
        key: 'projectManager',
        disabled: loginStatus !== UserRole.BLOG,
        children: [
          {
            icon: <ProjectFilled />,
            label: '我的项目',
            title: '我的项目',
            key: `/work/directory/admin/${TableType.RESULT}`,
          },
        ],
      },
      {
        icon: <HomeFilled />,
        label: '博客管理',
        title: '博客管理',
        key: 'manager',
        children: [
          {
            icon: <UserOutlined />,
            label: '个人中心',
            title: '个人中心',
            key: '/work/directory/personal',
          },
          {
            icon: <UserOutlined />,
            label: '公告管理',
            title: '公告管理',
            key: `/work/directory/admin/${TableType.ANNOUNCEMENT}`,
            disabled: ![UserRole.ADMIN, UserRole.BLOG].includes(loginStatus),
          },
          {
            icon: <UserOutlined />,
            label: '角色管理',
            title: '角色管理',
            key: `/work/directory/blog/role`,
            disabled: loginStatus !== UserRole.BLOG,
          },
        ],
      },
    ]
    return result
  }, [loginStatus])
  return <Menu items={filterMenuItems} theme="dark" mode="inline" onClick={menuItemClickHandle} />
}

export default React.memo(SiderMenu)
