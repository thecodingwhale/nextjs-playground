
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Divider, Row, Col } from 'antd'
import AnimalCard from '../components/AnimalCard'
import withLayout from '../components/Layout'
import { withAuthentication } from '../utils/authentication'

const chunk = (arr, chunkSize = 1, cache = []) => {
  const tmp = [...arr]
  if (chunkSize <= 0) return cache
  while (tmp.length) cache.push(tmp.splice(0, chunkSize))
  return cache
}

function Index({
  pets,
}) {
  const donated = false;
  const donating = false;
  const onClickDonate = () => {};

  return pets.map(parent => {
    return (
      <Row gutter={16} style={{ marginBottom: '20px' }}>
        {parent.map(({
          id,
          name,
          owner,
          location,
          image,
        }) => (
          <Col lg={8}>
            <AnimalCard
              id={id}
              petName={name}
              image='http://placekitten.com/960/690'
              disabled={false}
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
                <span style={{ float: 'right' }}>{location}</span>
              </div>
              <Divider />
              <div>
                <strong>Owner</strong>
                <span style={{ float: 'right' }}>{owner.name}</span>
              </div>
              <div>
                <strong>Contact Number</strong>
                <span style={{ float: 'right' }}>{owner.phoneNumber}</span>
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
        ))}
      </Row>
    )
  })
}

const mapStateToProps = state => {
  const prepareDisplay = state.pets.pets;
  const pets = chunk(prepareDisplay, 3);
  return {
    pets,
  }
};

const enhance = compose(
  withLayout,
  withAuthentication,
  connect(mapStateToProps, {}),
)

export default enhance(Index)