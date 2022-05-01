import React, { useState } from 'react'
import { Layout } from 'antd'

const { Header, Content, Sider } = Layout
function App() {
  return (
    <Layout>
      <Header />
      <Layout>
        <Sider />
        <Content />
      </Layout>
    </Layout>
  )
}

export default App
