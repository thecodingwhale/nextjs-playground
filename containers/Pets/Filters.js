import Router, { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Select, Button } from 'antd'
import { locationTypes } from '../../db/contants'

function Filters({
  router,
}) {
  const filterLocation = router.query.location ? router.query.location : null;
  const handleChange = (value) => {
    router.push(`/sample-second?page=1&location=${value}`)
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