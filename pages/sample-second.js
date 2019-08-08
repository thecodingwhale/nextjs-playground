
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import queryString from 'query-string'
import dateFns from 'date-fns'
import { Button, Divider, Row, Col, Pagination, Spin } from 'antd'
import AnimalCard from '../components/AnimalCard'
import withLayout from '../components/Layout'
import { withAuthentication } from '../utils/authentication'
import { fetchPets } from '../containers/Pets/actions'
import Filters from '../containers/Pets/Filters'
import { locationTypes, petTypes } from '../db/contants'

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
  const filterLocation = router.query.location ? router.query.location : null;
  const orderByDate = router.query.orderByDate && router.query.orderByDate;
  const orderByName = router.query.orderByName && router.query.orderByName;

  useEffect(() => {
    if (fetching === false) {
      fetchPets({
        page: activePageNumber,
        size: pageSize,
        location: filterLocation,
        orderByDate,
        orderByName,
      })
    }
  }, [activePageNumber, filterLocation, orderByDate, orderByName])

  return (
    <React.Fragment>
      {total !== 0 && (
        <React.Fragment>
          <Filters />
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
                  type,
                  date,
                }) => (
                  <Col lg={8}>
                    <AnimalCard
                      key={id}
                      id={id}
                      petName={name}
                      image={image}
                      disabled={false}
                    >
                      <div>
                        <strong>Type</strong>
                        <span style={{ float: 'right' }}>{type}</span>
                      </div>
                      <div>
                        <strong>Lost</strong>
                        <span style={{ float: 'right' }}>{date}</span>
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
      {total !== 0 && (
        <React.Fragment>
          <Divider />
          <Pagination
            total={total}
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
            pageSize={pageSize}
            defaultCurrent={activePageNumber}
            onChange={(page, pageSize) => {
              const baseQuery = queryString.parse(router.asPath.split(/\?/)[1]);
              const setupQuery = queryString.stringify({
                ...baseQuery,
                ...{
                  page: page
                }
              })
              router.push(`/sample-second?${setupQuery}`)

            }}
          />
        </React.Fragment>
      )}

    </React.Fragment>
  )

}

const mapStateToProps = state => {
  const { fetching, pets, total } = state.pets
  const filteredPets = pets.map(pet => {
    const location = locationTypes.find(locationType => locationType.value === pet.location)
    const type = petTypes.find(petType => petType.value === pet.type)
    const { year, month, day } = pet.date;
    const formattedDate = dateFns.format(new Date(year, month, day), 'MMMM DD, YYYY')
    return {
      ...pet,
      ...{
        location: location.label,
        type: type.label,
        date: formattedDate,
      }
    }
  })
  return {
    fetching,
    pets: chunk(filteredPets, 3),
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