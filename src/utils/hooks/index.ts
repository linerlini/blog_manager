import { useParams } from 'react-router-dom'
import { RootState, RootDispatch } from 'store/index'
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import type { SearchProps } from 'antd/lib/input'
import { useState } from 'react'

export const useAppDispatch = () => useDispatch<RootDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useSearchInput = () => {
  const { type } = useParams()
  const [searchLoading, setSearchLoading] = useState(false)
  const onSearchHandle: SearchProps['onSearch'] = (value, event) => {
    setSearchLoading(true)
    console.log(value)
    setSearchLoading(false)
  }
  return {
    searchLoading,
    onSearchHandle,
  }
}
