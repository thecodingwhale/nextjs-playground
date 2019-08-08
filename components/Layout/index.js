
import Router, { withRouter } from 'next/router'
import { compose } from 'redux'
import { connect } from 'react-redux'
import React, { useEffect } from 'react'
import { Layout, Menu, notification } from 'antd'
import { closeSuccessNotification } from '../../containers/Notification/actions'
import { logoutUser } from '../../containers/Authentication/actions'

const { Header, Content } = Layout

const onClickMenu = (url) => {
  Router.push(url);
};

const BaseLayout = ({
  children,
  router,
  isOpenNotification,
  error,
  isAuthenticated,
  fullname,
  closeSuccessNotification,
  logoutUser,
}) => {

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
    if (error.error !== null) {
      notification['error']({
        message: 'Error',
        description: error.error,
        onClose: () => {
          closeSuccessNotification();
        }
      })
    }
  })

  const TotalDonation = () => {
    const style = {
      color: '#1890ff',
      fontWeight: 'bold',
    };
    return (
      <span style={style}>
        $459
      </span>
    )
  }

  const DisplayName = () => {
    const style = {
      textTransform: 'capitalize',
      color: '#ffffff',
      fontWeight: 'bold',
    }
    return (
      <span style={style}>
        {fullname}!
      </span>
    )
  }

  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, { router })
  );

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
          {isAuthenticated !== false && (
            <React.Fragment>
              <Menu.Item
                onClick={() => logoutUser()}
                style={{
                  float: 'right'
                }}
              >
                Logout
              </Menu.Item>
              <div onClick={() => {}} style={{ float: 'right' }}>
                Welcome, <DisplayName /> | Total Donation: <TotalDonation />&nbsp;|&nbsp;
              </div>
            </React.Fragment>
          )}
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
    error: state.error,
    isAuthenticated: state.authentication.authenticated,
    fullname: state.authentication.user && `${state.authentication.user.firstName} ${state.authentication.user.lastName}`
  }
}

const mapDispatchActions = {
  closeSuccessNotification,
  logoutUser,
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