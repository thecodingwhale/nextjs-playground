import { useState } from 'react'
import Router, { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Select, Button, Icon } from 'antd'
import queryString from 'query-string'
import { locationTypes } from '../../db/contants'

function Filters({
  router,
}) {
  const filterLocation = router.query.location ? router.query.location : null
  const [isOrderByNameAscending, setOrderByNameAscending] = useState(true)
  const [isOrderByDateAscending, setOrderByDateAscending] = useState(true)

  const onClickOrderByName = () => {
    const condition = !isOrderByNameAscending;
    setOrderByNameAscending(condition)
    const setupQuery = queryString.stringify({
      orderByName: condition ? 'ASC' : 'DESC'
    })
    router.push(`/sample-second?${setupQuery}`)
  }
  const onClickOrderByDate = () => {
    const condition = !isOrderByDateAscending;
    setOrderByDateAscending(condition)
    const setupQuery = queryString.stringify({
      orderByDate: condition ? 'ASC' : 'DESC'
    })
    router.push(`/sample-second?${setupQuery}`)
  }

  const handleChange = (value) => {
    router.push(`/sample-second?page=1&location=${value}`)
    const baseQuery = queryString.parse(router.asPath.split(/\?/)[1]);
    const setupQuery = queryString.stringify({
      ...baseQuery,
      ...{
        location: value,
      }
    })
    router.push(`/sample-second?${setupQuery}`)

  }
  const onClickReset = () => {
    router.push(`/sample-second`)
  }
  return (
    <div>
      <Select placeholder="Location" defaultValue={filterLocation} style={{ width: 200 }} onChange={handleChange}>
        {locationTypes.map(({ label, value }, index) => (
          <Option
            key={index}
            value={value}
          >
            {label}
          </Option>
        ))}
      </Select>{' '}
      <Button onClick={onClickOrderByName}>
        Order by Name
        <Icon type={isOrderByNameAscending ? 'up' : 'down'} />
      </Button>{' '}
      <Button onClick={onClickOrderByDate}>
        Order by Date
        <Icon type={isOrderByDateAscending ? 'up' : 'down'} />
      </Button>{' '}
      <Button onClick={onClickReset}>
        Reset
      </Button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchActions = {}

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchActions),
)

export default enhance(Filters)