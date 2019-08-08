
import faker from 'faker'
import { baseUser } from './contants'

export const donatedIds = [
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
]

const donations = []
for (let i = 0; i < donatedIds.length; i++) {
  donations.push({
    idPet: donatedIds[i],
    idUser: baseUser.id,
    amount: faker.random.number({ 'min': 1, 'max': 10 })
  })
}

export default donations;