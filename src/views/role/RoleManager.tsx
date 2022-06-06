/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from 'react'
import { EmptyReactPops } from 'types/index'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ResponseCode, TableType, UserRole, WorkType } from 'utils/constants'
import { message, PaginationProps, Table, Input, Button, Modal } from 'antd'
import { ColumnsType, TableProps } from 'antd/lib/table'
import { DeleteFilled, EditFilled, InfoCircleFilled } from '@ant-design/icons'
import { requestChangeAdmin, requestUserList } from 'api/user'
import commonConfig from './config/index'
import TableModal from './TableModal'

const { useEffect, useState, useMemo } = React

const SearchTable: React.FC<EmptyReactPops> = function SearchTable() {
  const navigate = useNavigate()

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
  // 模态框
  const [modalVisible, setModalVisible] = useState(false)

  async function toggleRole(account: string, type: 'cancel' | 'add') {
    const result = await requestChangeAdmin(account, type)
    if (result.code === ResponseCode.SUCCESS) {
      message.success('操作成功')
      setPaginationProps({
        current: 1,
        pageSize: 10,
        total: 0,
        hideOnSinglePage: true,
      })
      getTableData(1, 10, '')
    } else {
      message.error(result.msg)
    }
    setModalVisible(false)
  }
  const okHandle = async (params: string) => {
    if (!params) {
      return
    }
    await toggleRole(params, 'add')
    setModalVisible(false)
  }
  const cancelHandle = () => {
    setModalVisible(false)
  }
  // table
  const tableTypeColumns = [
    ...commonConfig,
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      render(text: any, record: any) {
        return (
          <div className="flex justify-between items-center">
            <div
              className="text-sky-500 cursor-pointer"
              onClick={() => toggleRole(record.account, record.role === UserRole.NORMAL_USER ? 'add' : 'cancel')}
            >
              {record.role === UserRole.NORMAL_USER ? '授权' : '取消授权'}
            </div>
          </div>
        )
      },
    },
  ]
  const [tableData, setTableData] = useState<Array<any>>([])

  const tableChangeHandle: TableProps<any>['onChange'] = (pagination) => {
    console.log(pagination)
  }
  const getTableData = async (current: number, pageSize: number, search: string) => {
    const result = await requestUserList({
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

  // 处理搜索
  const searchHandle = async () => {
    setSearchLoading(true)
    await getTableData(1, 10, searchValue)
    setSearchLoading(false)
  }

  const toAddPage = () => {
    setModalVisible(true)
  }

  useEffect(() => {
    getTableData(1, 10, '')
  }, [])
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
          columns={tableTypeColumns}
          dataSource={tableData}
          bordered
          onChange={tableChangeHandle}
          pagination={paginationProps}
          rowKey="uuid"
        />
      </div>
      <TableModal onOK={okHandle} onCancel={cancelHandle} visible={modalVisible} />
    </div>
  )
}

export default SearchTable
