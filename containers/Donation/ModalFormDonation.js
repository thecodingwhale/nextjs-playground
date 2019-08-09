
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Modal, Form, InputNumber, Button } from 'antd'
import { openSuccessNotification } from '../Notification/actions'
import { makeDonation, setDonated } from '../Donation/actions'

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

function ModalFormDonation(props) {
  const { openSuccessNotification } = props
  const [isModalVisible, setModalVisible] = useState(setModalVisible)
  const [submitting, setSubmitting] = useState(false)
  const [resetForm, setResetFrom] = useState(false)
  const handleOk = () => console.log('handleOk')
  const handleCancel = () => console.log('handleCancel')

  useEffect(() => {
    setModalVisible(props.openModal)
  }, [props.openModal])

  useEffect(() => {
    if (props.donated) {
      props.setDonated(false)
      props.onModalClose()
      setResetFrom(true)
      openSuccessNotification()
    }
  }, [props.donated])

  return (
    <Modal
      title={`Make a Donation #${props.idPet}`}
      centered
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      closable={false}
    >
      <WrapDonationForm
        submitting={props.isDonating}
        resetForm={resetForm}
        onClickCancel={() => {
          props.onModalClose()
        }}
        onSubmitDonation={(values) => {
          props.makeDonation({
            idUser: props.idUser,
            idPet: props.idPet,
            amount: values.amount
          })
        }}
      />
    </Modal>
  )
}
const mapStateToProps = state => {
  return {
    isDonating: state.donation.donating,
    idUser: state.authentication.user && state.authentication.user.id,
    donations: state.donation.donations,
    donated: state.donation.donated,
  }
}

const mapDispatchActions = {
  openSuccessNotification,
  makeDonation,
  setDonated,
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchActions),
)

export default enhance(ModalFormDonation)