import { ColumnsType } from 'antd/lib/table'
import React from 'react'
import { TableRecordBase } from 'types/server'
import { UserRole } from 'utils/constants'

const commonConfig: ColumnsType<TableRecordBase> = [
  {
    title: '账号',
    dataIndex: 'account',
    key: 'account',
  },
  {
    title: '用户名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '个人简介',
    dataIndex: 'desc',
    key: 'desc',
  },
  {
    title: '个人状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '点赞数',
    dataIndex: 'thumbUpCount',
    key: 'thumbUpCount',
  },
  {
    title: '角色',
    dataIndex: 'role',
    key: 'role',
    render(text, record: any) {
      return '管理员'
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
]
export default commonConfig
