import { Input, Modal } from 'antd'
import * as React from 'react'

type Props = {
  visible: boolean
  onOK: (params: string) => void
  onCancel: () => void
}

const { useState, useCallback } = React
const TableModal: React.FC<Props> = function TableModal(props) {
  const { onOK, visible, onCancel } = props
  const [modalLoading, setModalLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const inputChangeHandle: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    const { value } = e.target
    setInputValue(value)
  }, [])
  const okHandle = async () => {
    setModalLoading(true)
    await onOK(inputValue)
    setModalLoading(false)
  }
  return (
    <Modal title="添加管理员" visible={visible} onOk={okHandle} onCancel={onCancel} confirmLoading={modalLoading}>
      <Input allowClear maxLength={100} showCount value={inputValue} onChange={inputChangeHandle} />
    </Modal>
  )
}

export default TableModal
