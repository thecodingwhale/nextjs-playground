
import * as React from 'react'
import stylesheet from 'antd/dist/antd.min.css'
import { Layout, Menu } from 'antd'

const { Header, Content } = Layout

const withLayout = Page => {
  return () => (
    <Layout>
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      <style jsx>{`
        #components-layout-demo-top-side-2 .logo {
          width: 120px;
          height: 31px;
          background: #333;
          border-radius: 6px;
          margin: 16px 28px 16px 0;
          float: left;
        }
      `}</style>
      <Header className='header'>
        <div className='logo' />
        <Menu
          theme='dark'
          mode='horizontal'
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key='1'>Exam 1</Menu.Item>
          <Menu.Item key='2'>Exam 2</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Layout style={{ padding: '24px', minHeight: 'calc(100vh - 64px)' }}>
          <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
            <Page />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default withLayout
