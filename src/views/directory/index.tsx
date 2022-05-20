import * as React from 'react'
import { EmptyReactPops } from 'types/index'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ResponseCode, TableType, WorkType } from 'utils/constants'
import { message, PaginationProps, Table, Input, Button, Modal } from 'antd'
import { requestArticleList, requestArticleTypeList, requestDeleteArticle, requestDeleteArticleType } from 'api/article'
import { ColumnsType, TableProps } from 'antd/lib/table'
import { DeleteFilled, EditFilled, InfoCircleFilled } from '@ant-design/icons'
import { requestAddAnnouncement, requestAnnouncementList, requestDeleteResult, requestResultsList } from 'api/result'
import { useColumnsConfig } from './config'
import TableModal from './children/TableModal'

const { useEffect, useState, useMemo } = React

const SearchTable: React.FC<EmptyReactPops> = function SearchTable() {
  const { type } = useParams()
  const navigate = useNavigate()
  const requestFunc = useMemo(() => {
    if (type === TableType.ARTICLE) {
      return requestArticleList
    }
    if (type === TableType.RESULT) {
      return requestResultsList
    }
    if (type === TableType.ANNOUNCEMENT) {
      return requestAnnouncementList
    }
    return requestArticleTypeList
  }, [type])
  const requestDeleteFunc = useMemo(() => {
    if (type === TableType.ARTICLE) {
      return requestDeleteArticle
    }
    if (type === TableType.RESULT) {
      return requestDeleteResult
    }
    return requestDeleteArticleType
  }, [type])
  // 分页
  const [paginationProps, setPaginationProps] = useState<PaginationProps>({
    current: 1,
    pageSize: 10,
    total: 0,
    hideOnSinglePage: true,
  })
  // 搜索
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const searchValueChangeHandle: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target
    setSearchValue(value)
  }

  // table
  const tableTypeColumns = useColumnsConfig(type as TableType)
  const [tableData, setTableData] = useState<Array<any>>([])

  const tableChangeHandle: TableProps<any>['onChange'] = (pagination) => {
    console.log(pagination)
  }
  const getTableData = async (current: number, pageSize: number, search: string) => {
    const result = await requestFunc({
      offset: (current - 1) * pageSize,
      size: pageSize,
      searchText: search,
    })
    if (result.code === ResponseCode.SUCCESS) {
      setTableData(result.data.data)
      setPaginationProps((oV) => ({
        ...oV,
        total: result.data.count,
      }))
    } else {
      message.error(result.msg)
    }
  }
  const deleteRow = async (id: string) => {
    const result = await requestDeleteFunc(id)
    if (result.code === ResponseCode.SUCCESS) {
      message.success('删除成功')
      getTableData(paginationProps.current || 1, paginationProps.pageSize || 10, searchValue)
    } else {
      message.error(result.msg)
    }
  }
  const withActionTableColumns: ColumnsType<any> = [...tableTypeColumns]
  if (type !== TableType.ANNOUNCEMENT) {
    withActionTableColumns.push({
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: '120px',
      render(text, record) {
        return (
          <div className="flex justify-between items-center">
            <Link to={`/work/${type}/${WorkType.VIEW}?id=${record.uuid}`}>
              <InfoCircleFilled style={{ fontSize: '20px', cursor: 'pointer' }} />
            </Link>
            <Link to={`/work/${type}/${WorkType.EDIT}?id=${record.uuid}`}>
              <EditFilled style={{ fontSize: '20px', cursor: 'pointer' }} />
            </Link>
            <DeleteFilled
              style={{ fontSize: '20px', cursor: 'pointer', color: '#1890ff' }}
              onClick={() => deleteRow(record.uuid)}
            />
          </div>
        )
      },
    })
  }
  // 处理搜索
  const searchHandle = async () => {
    setSearchLoading(true)
    await getTableData(1, 10, searchValue)
    setSearchLoading(false)
  }
  // 模态框
  const [modalVisible, setModalVisible] = useState(false)
  const okHandle = async (params: string) => {
    if (!params) {
      return
    }
    if (type === TableType.ANNOUNCEMENT) {
      const result = await requestAddAnnouncement(params)
      if (result.code === ResponseCode.SUCCESS) {
        message.success('添加成功')
        getTableData(paginationProps.current || 1, paginationProps.pageSize || 10, searchValue)
      } else {
        message.error(result.msg)
      }
    }
    setModalVisible(false)
  }
  const cancelHandle = () => {
    setModalVisible(false)
  }
  // 工作页面切换初始化数据
  useEffect(() => {
    if (!type) {
      return
    }
    getTableData(1, 10, '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type])
  // 新增
  const toAddPage = () => {
    if (type === TableType.ANNOUNCEMENT) {
      setModalVisible(true)
    } else {
      navigate(`/work/${type}/${WorkType.ADD}`)
    }
  }
  return (
    <div className="h-full bg-white">
      <div className="flex">
        <Input.Search
          placeholder="input search text"
          enterButton
          loading={searchLoading}
          onChange={searchValueChangeHandle}
          onSearch={searchHandle}
          value={searchValue}
        />
        <Button type="primary" className="ml-5" onClick={toAddPage}>
          新增
        </Button>
      </div>
      <div>
        <Table
          columns={withActionTableColumns}
          dataSource={tableData}
          bordered
          onChange={tableChangeHandle}
          pagination={paginationProps}
          rowKey="uuid"
        />
      </div>
      <TableModal type={type as TableType} onOK={okHandle} onCancel={cancelHandle} visible={modalVisible} />
    </div>
  )
}

export default SearchTable
