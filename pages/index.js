
import * as React from 'react';
import stylesheet from 'antd/dist/antd.min.css'

import { Layout, Menu } from 'antd';
const { Header, Content } = Layout;

export default class App extends React.Component {
  render() {
    return <Layout>
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
          <Menu.Item key='1'>Home</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Layout style={{ padding: '24px', minHeight: 'calc(100vh - 64px)' }}>
          <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
            Content
          </Content>
        </Layout>
      </Layout>
    </Layout>
  }
}