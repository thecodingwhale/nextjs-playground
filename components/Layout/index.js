
import Router, { withRouter } from 'next/router'
import { compose } from 'redux'
import { connect } from 'react-redux'
import React, { useEffect } from 'react'
import { Layout, Menu, notification } from 'antd'
import { closeSuccessNotification } from '../../containers/Notification/actions'
import { logoutUser } from '../../containers/Authentication/actions'
import { fetchDonations } from '../../containers/Donation/actions'

const { Header, Content } = Layout

const onClickMenu = (url) => {
  Router.push(url);
};

notification.config({
  placement: 'bottomRight',
});

const BaseLayout = ({
  children,
  router,
  isOpenNotification,
  error,
  isAuthenticated,
  fullname,
  closeSuccessNotification,
  logoutUser,
  userId,
  totalDonation,
  fetchDonations,
}) => {

  useEffect(() => {
    if (isAuthenticated) {
      fetchDonations()
    }
  }, [isAuthenticated])

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
        {totalDonation === 0 ? '---' : `$${totalDonation}`}
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
  const totalDonation = state.donation.donations.reduce(function (acc, obj) { return acc + obj.amount }, 0)
  return {
    isOpenNotification: state.notification.open,
    error: state.error,
    isAuthenticated: state.authentication.authenticated,
    userId: state.authentication.user && state.authentication.user.id,
    fullname: state.authentication.user && `${state.authentication.user.firstName} ${state.authentication.user.lastName}`,
    totalDonation,
  }
}

const mapDispatchActions = {
  closeSuccessNotification,
  logoutUser,
  fetchDonations,
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