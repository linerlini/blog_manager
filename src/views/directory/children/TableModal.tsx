import { Input, Modal } from 'antd'
import * as React from 'react'
import { TableType } from 'utils/constants'

type Props = {
  type: TableType
  visible: boolean
  onOK: (params: string) => void
  onCancel: () => void
}

const { useState, useCallback, useEffect } = React
const TableModal: React.FC<Props> = function TableModal(props) {
  const { type, onOK, visible, onCancel } = props
  const [modalTitle, setModalTitle] = useState('标题')
  const [modalLoading, setModalLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const inputChangeHandle: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    const { value } = e.target
    setInputValue(value)
  }, [])
  useEffect(() => {
    if (type === TableType.ANNOUNCEMENT) {
      setModalTitle('添加公告')
    }
  }, [type])
  const okHandle = async () => {
    setModalLoading(true)
    await onOK(inputValue)
    setModalLoading(false)
  }
  return (
    <Modal title={modalTitle} visible={visible} onOk={okHandle} onCancel={onCancel} confirmLoading={modalLoading}>
      <Input allowClear maxLength={100} showCount value={inputValue} onChange={inputChangeHandle} />
    </Modal>
  )
}

export default TableModal
