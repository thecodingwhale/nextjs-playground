import faker from 'faker'
import { petTypes, locationTypes } from './contants'
import donations, { donatedIds } from './donations'

const petsIds = [
  89283,
  93849,
  29384,
  50392,
  49283,
  34045,
  35906,
  83495,
  29405,
  92014,
  78402,
  89403,
  58204,
  87494,
  80515,
  48506,
  83018,
  99019,
  22293,
  99934,
]

const shuffle = array => {
  return array.sort(() => Math.random() - 0.5);
}
const ids = shuffle([...donatedIds, ...petsIds])

const pets = []
const baseWidth = 950
const baseHeigh = 650
for (let i = 0; i < ids.length; i++) {
  const randomPetTypeIndex = faker.random.number({ 'min': 0, 'max': petTypes.length - 1 })
  const randomLocationIndex = faker.random.number({ 'min': 0, 'max': locationTypes.length - 1 })
  const randomYear = faker.random.number({ 'min': 2017, 'max': 2019 })
  const randomMonth = faker.random.number({ 'min': 1, 'max': 12 })
  const randomDay = faker.random.number({ 'min': 1, 'max': 30 })

  pets.push({
    id: ids[i],
    name: faker.name.firstName(),
    image: `${petTypes[randomPetTypeIndex].image}/${baseWidth + (i + 1)}/${baseHeigh + (i + 1)}`,
    type: petTypes[randomPetTypeIndex].value,
    date: {
      year: randomYear,
      month: randomMonth,
      day: randomDay,
    },
    location: locationTypes[randomLocationIndex].value,
    owner: {
      name: faker.name.findName(),
      phoneNumber: faker.phone.phoneNumber(),
    },
  })
}

export default pets