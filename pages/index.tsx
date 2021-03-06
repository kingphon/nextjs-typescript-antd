import React, { FC } from 'react'
import { Layout } from 'antd'

import SideBar from '../components/organisms/SideBar'

const { Header, Content, Footer } = Layout

const App: FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideBar />
      <Layout style={{ marginLeft: 200 }}>
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '2rem 1rem' }}>
          <p>Home</p>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Kin</Footer>
      </Layout>
    </Layout>
  )
}

export default App
