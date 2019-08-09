
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import queryString from 'query-string'
import dateFns from 'date-fns'
import { Button, Divider, Row, Col, Pagination, Spin, Typography, Modal } from 'antd'
import AnimalCard from '../components/AnimalCard'
import withLayout from '../components/Layout'
import { withAuthentication } from '../utils/authentication'
import { fetchPets } from '../containers/Pets/actions'
import Filters from '../containers/Pets/Filters'
import ModalFormDonation from '../containers/Donation/ModalFormDonation'
import { locationTypes, petTypes } from '../db/contants'

const { Title } = Typography;

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
  const pageSize = 6;
  const activePageNumber = router.query.page ? parseInt(router.query.page, 10) : 1;
  const filterLocation = router.query.location ? router.query.location : null;
  const orderByDate = router.query.orderByDate && router.query.orderByDate;
  const orderByName = router.query.orderByName && router.query.orderByName;

  const [idPet, setIdPet] = useState(null)
  const onClickDonate = (id) => {
    setIdPet(id)
  }

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
      <ModalFormDonation
        idPet={idPet}
        openModal={idPet !== null}
        onModalClose={() => {
          setIdPet(null)
        }}
      />
      <Title>Lost and Found Pets</Title>
      {total !== 0 && (
        <React.Fragment>
          <Filters />
          <Divider />
        </React.Fragment>
      )}
      {fetching || pets.length === 0 ? (
        <Spin size="large" />
      ) : (
        <React.Fragment>
          {pets.map((parent, index) => {
            return (
              <Row key={index} gutter={16} style={{ marginBottom: '20px' }}>
                {parent.map(({
                  id,
                  name,
                  owner,
                  location,
                  image,
                  type,
                  date,
                  amount,
                }) => (
                  <Col key={id} lg={8}>
                    <AnimalCard
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
                        <strong>${amount}</strong>
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
                              onClick={() => onClickDonate(id)}
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
    const amount = state.donation.donations.filter(donation => donation.idPet === pet.id).reduce(function (acc, obj) { return acc + obj.amount }, 0);

    return {
      ...pet,
      ...{
        location: location.label,
        type: type.label,
        date: formattedDate,
        amount,
      }
    }
  })
  return {
    fetching: fetching,
    donating: state.donation.donating,
    pets: state.donation.donations.length !== 0 ? chunk(filteredPets, 3) : [],
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