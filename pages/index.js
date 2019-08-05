// pages/index.js

import { Row, Col } from 'antd'
import { useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import withLayout from '../components/Layout'
import AnimalCard from '../components/AnimalCard'
import { openSuccessNotification } from '../containers/Notification/actions'

import { Button, Divider } from 'antd'

function Index({
  openSuccessNotification,
}) {
  const [donated, setDonated]= useState(false)
  const [donating, setDonating] = useState(false)
  const onClickDonate = () => {
    setDonating(true)
    setTimeout(() => {
      openSuccessNotification();
      setDonating(false);
      setDonated(true)
    }, 2000)
  }
  return (
    <Row>
      <Col span={6} offset={9}>
        <AnimalCard
          id={12930}
          petName='Riscas'
          image='http://placekitten.com/960/690'
          disabled={donating}
        >
          <div>
            <strong>Type</strong>
            <span style={{ float: 'right' }}>Cat</span>
          </div>
          <div>
            <strong>Lost</strong>
            <span style={{ float: 'right' }}>September 12, 2019</span>
          </div>
          <div>
            <strong>Location</strong>
            <span style={{ float: 'right' }}>New York</span>
          </div>
          <Divider />
          <div>
            <strong>Owner</strong>
            <span style={{ float: 'right' }}>Oscar Melehandrez</span>
          </div>
          <div>
            <strong>Contact Number</strong>
            <span style={{ float: 'right' }}>+639019872399</span>
          </div>
          <Divider />
          <div>
            <strong>$50</strong>
            <span style={{ float: 'right' }}>
              {donated ? (
                <Button
                  type='primary'
                  disabled={donated}
                >
                  Donated
                </Button>
              ) : (
                <Button
                  type='primary'
                  onClick={onClickDonate}
                  disabled={donating}
                >
                  {donating ? 'Donating...' : 'Donate'}
                </Button>
              )}

            </span>
          </div>
          <Divider />
          <Button
            block
            type='primary'
            size='large'
            disabled={donating}
          >
            Phone
          </Button>
        </AnimalCard>
      </Col>
    </Row>
  )
}

const mapStateToProps = state => {
  return {}
};

const enhance = compose(
  withLayout,
  connect(mapStateToProps, { openSuccessNotification }),
)

export default enhance(Index)