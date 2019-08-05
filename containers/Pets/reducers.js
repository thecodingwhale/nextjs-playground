
import faker from 'faker'
import { actionTypes } from './actions'

const pets = [];
for (let i = 0; i < 6; i++) {
  pets.push({
    id: faker.random.number(),
    name: faker.name.firstName(),
    image: faker.image.cats(),
    type: 'CAT',
    date: {
      year: 2019,
      month: 8,
      day: 1,
    },
    location: faker.address.city(),
    owner: {
      name: faker.name.findName(),
      phoneNumber: faker.phone.phoneNumber(),
    }
  });
}

const initialState = {
  pets: pets,
}

function reducer (state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}

export default reducer