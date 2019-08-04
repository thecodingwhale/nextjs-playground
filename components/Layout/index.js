import Router, { withRouter } from 'next/router'
import * as React from 'react'
import stylesheet from 'antd/dist/antd.min.css'
import { Layout, Menu } from 'antd'

const { Header, Content } = Layout

const onClickMenu = (url) => {
  Router.push(url);
};

const BaseLayout = (props) => {
  return (
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
          defaultSelectedKeys={[props.router.asPath]}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item
            key='/'
            onClick={() => onClickMenu('/')}
          >
            Exam 1
          </Menu.Item>
          <Menu.Item
            key='/exam-second'
            onClick={() => onClickMenu('/exam-second')}
          >
            Exam 2
          </Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Layout style={{ padding: '24px', minHeight: 'calc(100vh - 64px)' }}>
          <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
const withLayout = Page => {
  const SampleLayout = withRouter(BaseLayout);
  return () => (
    <SampleLayout>
      <Page />
    </SampleLayout>
  )
}

export default withLayout
