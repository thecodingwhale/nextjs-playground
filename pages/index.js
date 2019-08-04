// pages/index.js

import { Row, Col, notification } from 'antd'
import { useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import withLayout from '../components/Layout'
import CustomCard from '../components/CustomCard'
import { openSuccessNotification } from '../containers/Notification/actions'

function Index({
  openSuccessNotification,
}) {
  const [donated, setDonated]= useState(false)
  const [donating, setDonating] = useState(false)
  return (
    <Row>
      <Col span={6} offset={9}>
        <CustomCard
          id={12930}
          name='Riscas'
          image='http://placekitten.com/960/690'
          date='Setembro 2018'
          gift='Jorge Seabra'
          price={50}
          donated={donated}
          disabled={donating}
          onClickDonate={() => {
            setDonating(true)
            setTimeout(() => {
              openSuccessNotification();
              setDonating(false);
              setDonated(true)
            }, 2000)
          }}
        />
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