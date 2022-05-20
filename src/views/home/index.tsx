import * as React from 'react'
import { EmptyReactPops } from 'types/index'

const HomePage: React.FC<EmptyReactPops> = function HomePage() {
  return <div className="h-full flex items-center justify-center w-full">欢饮来到博客管理系统</div>
}

export default React.memo(HomePage)
