import { TableType } from 'utils/constants'
import { ColumnsType } from 'antd/lib/table'
import React from 'react'
import { AnnouncementModel, ArticleModel, CatalogueModel, ProfileResultModel, TableRecordBase } from 'types/server'

export const commonConfig: ColumnsType<TableRecordBase> = [
  {
    title: '编号',
    dataIndex: 'uuid',
    key: 'uuid',
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

export const articleTypeConfig: ColumnsType<ArticleModel> = [
  {
    title: '分类名',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: '简介',
    dataIndex: 'desc',
    key: 'desc',
  },
  {
    title: '文章数量',
    dataIndex: 'artilcesCount',
    key: 'artilcesCount',
  },
  {
    title: '创建者',
    dataIndex: 'authorName',
    key: 'authorName',
  },
]

export const articleConfig: ColumnsType<CatalogueModel> = [
  {
    title: '文章标题',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: '简介',
    dataIndex: 'desc',
    key: 'desc',
  },
  {
    title: '评论数量',
    dataIndex: 'commentCount',
    key: 'commentCount',
  },
  {
    title: '点赞数量',
    dataIndex: 'thumbUpCount',
    key: 'thumbUpCount',
  },
  {
    title: '作者',
    dataIndex: 'authorName',
    key: 'authorName',
  },
  {
    title: '类型',
    dataIndex: 'typeName',
    key: 'typeName',
  },
]

export const resultConfig: ColumnsType<ProfileResultModel> = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: '简介',
    dataIndex: 'desc',
    key: 'desc',
  },
  {
    title: '项目地址',
    dataIndex: 'showAddress',
    key: 'showAddress',
    render(text, record) {
      const url = record.showAddress
      return <div>{url ? <a href={url}>{url}</a> : '空'}</div>
    },
  },
  {
    title: '项目仓库地址',
    dataIndex: 'respository',
    key: 'respository',
    render(text, record) {
      const url = record.respository
      return <div>{url ? <a href={url}>{url}</a> : '空'}</div>
    },
  },
]
export const announcementConfig: ColumnsType<AnnouncementModel> = [
  {
    title: '内容',
    dataIndex: 'content',
    key: 'content',
  },
]
export function mergeColumnConfig(otherConfig: ColumnsType<any>) {
  const target = otherConfig.slice()
  target.splice(1, 0, commonConfig[0])
  target.push(...commonConfig.slice(1))
  return target
}

export function useColumnsConfig(type: TableType) {
  const finalConfig = React.useMemo<ColumnsType<any>>(() => {
    switch (type) {
      case TableType.ARTICLE:
        return mergeColumnConfig(articleConfig)
      case TableType.ARTICLE_TYPE:
        return mergeColumnConfig(articleTypeConfig)
      case TableType.RESULT:
        return mergeColumnConfig(resultConfig)
      case TableType.ANNOUNCEMENT:
        // eslint-disable-next-line no-case-declarations
        const columns: ColumnsType<any> = commonConfig.slice()
        columns.splice(1, 0, ...announcementConfig)
        return columns
      default:
        return commonConfig
    }
  }, [type])
  return finalConfig
}
