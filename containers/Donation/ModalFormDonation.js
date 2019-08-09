
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Modal, Form, InputNumber, Button } from 'antd'
import { openSuccessNotification } from '../Notification/actions'

const DonationForm = (props) => {
  const { getFieldDecorator } = props.form
  const handleSubmit = (e) => {
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (!err) {
        props.onSubmitDonation(values)
      }
    })
  }

  useEffect(() => {
    if (props.resetForm) {
      props.form.resetFields()
    }
  }, [props.resetForm])

  return (
    <Form onSubmit={handleSubmit} className='login-form'>
      <Form.Item
        help='Max donation is $10'
      >
        {getFieldDecorator('amount', {
          rules: [{
            required: true,
            message: 'Please input your amount!'
          }],
        })(
          <InputNumber
            style={{ width: '100%' }}
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            size='large'
            min={1}
            max={10}
            disabled={props.submitting}
          />,
        )}
      </Form.Item>
      <Form.Item style={{ textAlign: 'right' }}>
        <Button onClick={props.onClickCancel} disabled={props.submitting}>
          Cancel
        </Button>{' '}
        <Button type='primary' htmlType='submit' disabled={props.submitting}>
          {props.submitting ? 'Donating...' : 'Donate'}
        </Button>
      </Form.Item>
    </Form>
  )
}

const WrapDonationForm = Form.create({ name: 'donation_form' })(DonationForm)

function ModalFormDonation({
  openSuccessNotification,
}) {
  const [isModalVisible, setModalVisible] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [resetForm, setResetFrom] = useState(false)
  const handleOk = () => console.log('handleOk')
  const handleCancel = () => console.log('handleCancel')

  return (
    <Modal
      title='Make a Donation'
      centered
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      closable={false}
    >
      <WrapDonationForm
        submitting={submitting}
        resetForm={resetForm}
        onClickCancel={() => {
          setModalVisible(false)
        }}
        onSubmitDonation={(values) => {
          setSubmitting(true)
          setTimeout(() => {
            setSubmitting(false)
            setResetFrom(true)
            setModalVisible(false)
            openSuccessNotification()
            console.log(values)
          }, 3000)
        }}
      />
    </Modal>
  )
}
const mapStateToProps = state => {
  return {

  }
}

const mapDispatchActions = {
  openSuccessNotification,
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchActions),
)

export default enhance(ModalFormDonation)