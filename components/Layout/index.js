
import Router, { withRouter } from 'next/router'
import { compose } from 'redux'
import { connect } from 'react-redux'
import React, { useEffect } from 'react'
import { Layout, Menu, notification } from 'antd'
import { closeSuccessNotification } from '../../containers/Notification/actions'

const { Header, Content } = Layout

const onClickMenu = (url) => {
  Router.push(url);
};

const BaseLayout = ({
  children,
  router,
  isOpenNotification,
  closeSuccessNotification,
}) => {

  console.log('isOpenNotification: ', isOpenNotification);

  useEffect(() => {
    if (isOpenNotification) {
      notification['success']({
        message: 'Thank You!',
        description: 'We appreciate your suppor!',
        onClose: () => {
          closeSuccessNotification();
        }
      })
    }
  })

  return (
    <Layout>
      <Header className='header'>
        <div className='logo' />
        <Menu
          theme='dark'
          mode='horizontal'
          defaultSelectedKeys={[router.asPath]}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item
            key='/'
            onClick={() => onClickMenu('/')}
          >
            Exam 1
          </Menu.Item>
          <Menu.Item
            key='/sample-second'
            onClick={() => onClickMenu('/sample-second')}
          >
            Exam 2
          </Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Layout style={{ padding: '24px', minHeight: 'calc(100vh - 64px)' }}>
          <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

const mapStateToProps = state => {
  return {
    isOpenNotification: state.notification.open,
  }
}

const mapDispatchActions = {
  closeSuccessNotification,
}

const withLayout = Page => {
  const enhance = compose(
    withRouter,
    connect(mapStateToProps, mapDispatchActions),
  )
  const SampleLayout = enhance(BaseLayout)
  return () => (
    <SampleLayout>
      <Page />
    </SampleLayout>
  )
}

export default withLayout
