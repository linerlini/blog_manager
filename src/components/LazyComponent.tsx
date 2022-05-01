import * as React from 'react'
import FullLoading from './FullLoading'

function createLazyComponent(Component: React.FunctionComponent) {
  return (
    <React.Suspense fallback={<FullLoading />}>
      <Component />
    </React.Suspense>
  )
}

export default createLazyComponent
