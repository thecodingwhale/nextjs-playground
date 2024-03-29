import { withRouter } from 'next/router'
import { compose } from 'redux'
import { connect } from 'react-redux'
import LoginForm from '../containers/Authentication/LoginForm'

const BaseLayout = (props) => {
  const {
    wrappedComponent,
    isAuthenticated,
    router,
  } = props;
  const Component = isAuthenticated ? wrappedComponent : LoginForm;
  return <Component router={router} />
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authentication.authenticated,
  }
}

export const withAuthentication = (WrappedComponent) => {
  const enhance = compose(
    withRouter,
    connect(mapStateToProps, {}),
  )
  const EnhanceComponent = enhance(BaseLayout)

  return () => (
    <EnhanceComponent
      wrappedComponent={WrappedComponent}
    />
  )
}