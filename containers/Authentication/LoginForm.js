import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Row, Col, Form, Icon, Input, Button } from 'antd'
import { onLogin } from './actions'

class LoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, { username, password }) => {
      if (!err) {
        this.props.onLogin({ username, password })
      }
    })
  }

  render() {
    const { inProgress } = this.props
    const { getFieldDecorator } = this.props.form
    return (
      <Row>
        <Col span={6} offset={9}>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                  disabled={inProgress}
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                  disabled={inProgress}
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" disabled={inProgress}>
                {inProgress ? 'Logging In...' : 'Log in'}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    )
  }
}

const WrappedLoginForm = Form.create({ name: 'login_form' })(LoginForm)

const mapStateToProps = state => {
  return {
    inProgress: state.progress.inProgress,
  }
}

const mapDispatchActions = {
  onLogin,
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchActions),
)

export default enhance(WrappedLoginForm)