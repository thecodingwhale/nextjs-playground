import faker from 'faker'
import { petTypes, locationTypes } from './contants';

const ids = [
  89283,
  93849,
  29384,
  23242,
  25242,
  90902,
  82734,
  20940,
  34938,
  89892,
  29903,
  99203,
  90293,
  98303,
  28324,
  24232,
  59483,
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

const pets = []
const bar = 950
const foo = 650;
for (let i = 0; i < ids.length; i++) {
  const randomPetTypeIndex = faker.random.number({ 'min': 0, 'max': petTypes.length - 1 })
  const randomLocationIndex = faker.random.number({ 'min': 0, 'max': locationTypes.length - 1 })
  const randomYear = faker.random.number({ 'min': 2017, 'max': 2019 })
  const randomMonth = faker.random.number({ 'min': 1, 'max': 12 })
  const randomDay = faker.random.number({ 'min': 1, 'max': 30 })

  pets.push({
    id: ids[i],
    name: faker.name.firstName(),
    image: `${petTypes[randomPetTypeIndex].image}/${bar + (i + 1)}/${foo + (i + 1)}`,
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
    }
  })
}

export default pets