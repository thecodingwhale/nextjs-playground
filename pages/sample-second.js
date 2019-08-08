
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Divider, Row, Col, Pagination, Spin } from 'antd'
import AnimalCard from '../components/AnimalCard'
import withLayout from '../components/Layout'
import { withAuthentication } from '../utils/authentication'
import { fetchPets } from '../containers/Pets/actions'

const chunk = (arr, chunkSize = 1, cache = []) => {
  const tmp = [...arr]
  if (chunkSize <= 0) return cache
  while (tmp.length) cache.push(tmp.splice(0, chunkSize))
  return cache
}

function Index({
  pets,
  fetching,
  router,
  fetchPets,
  total,
}) {
  const donated = false
  const donating = false
  const onClickDonate = () => console.log('onClickDonate')
  const pageSize = 6;
  const activePageNumber = router.query.page ? parseInt(router.query.page, 10) : 1;

  useEffect(() => {
    if (fetching === false && pets.length === 0) {
      fetchPets({
        page: activePageNumber,
        size: pageSize
      })
    }
  })

  return (
    <React.Fragment>
      {total !== 0 && (
        <React.Fragment>
          <Pagination
            total={total}
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
            pageSize={pageSize}
            defaultCurrent={activePageNumber}
            onChange={(page, pageSize) => {
              router.push(`/sample-second?page=${page}`)
              fetchPets({
                page: activePageNumber,
                size: pageSize
              })
            }}
          />
          <Divider />
        </React.Fragment>
      )}

      {fetching ? (
        <Spin size="large" />
      ) : (
        <React.Fragment>
          {pets.map(parent => {
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
                      key={id}
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
          })}
        </React.Fragment>
      )}
    </React.Fragment>
  )

}

const mapStateToProps = state => {
  const { fetching, pets, total } = state.pets
  const prepareDisplay = chunk(pets, 3)
  return {
    fetching,
    pets: prepareDisplay,
    total,
  }
}

const mapDispatchActions = {
  fetchPets,
}

const enhance = compose(
  withLayout,
  withAuthentication,
  connect(mapStateToProps, mapDispatchActions),
)

export default enhance(Index)