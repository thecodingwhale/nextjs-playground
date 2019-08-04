// pages/index.js

import { Row, Col, notification } from 'antd'
import { useState } from 'react'
import withLayout from '../components/Layout'
import CustomCard from '../components/CustomCard'

const openSuccessNotification = () => {
  notification['success']({
    message: 'Thank You!',
    description:
      'We appreciate your suppor!',
  })
};


function Index() {
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
              openSuccessNotification()
              setDonating(false);
              setDonated(true)
            }, 2000)
          }}
        />
      </Col>
    </Row>
  )
}

export default withLayout(Index)