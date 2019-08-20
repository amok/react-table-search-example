import { randElem, randDate } from './helpers'
import { USER_ROLES, USER_STATUSES } from './constants'

const TIMEOUT = 250

const names = ['Petro', 'Ievgen', 'Stepan', 'Ivan', 'Kyrylo', 'Artem']
const roles = Object.values(USER_ROLES)
const surnames = ['Hryhorenko', 'Bondarchuk', 'Shevchenko', 'Bvanyshyn', 'Ludz', 'Karpaliuk']
const statuses = Object.values(USER_STATUSES)

const users = [...Array(10).keys()].map(i => ({
  id: String(i),
  role: randElem(roles),
  status: randElem(statuses),
  fullName: randElem(names) + ' ' + randElem(surnames),
  connectedOn: randDate()
}))

function matches (word, term) {
  if (word === term) {
    return true
  }

  if (word.slice(0, term.length) === term) {
    return true
  }

  return false
}

export default {
  getUsers: filter => new Promise(resolve => {
    let result = users

    if (filter && typeof filter.fullName === 'string') {
      const term = filter.fullName.toLowerCase()

      result = users.filter(user => {
        const name = user.fullName.toLowerCase()

        if (matches(name, term)) {
          return true
        }

        const parts = name.split(/\s+/mig)

        for (let i = 0, l = parts.length; i < l; i++) {
          if (matches(parts[i], term)) {
            return true
          }
        }

        return false
      })
    }

    setTimeout(() => resolve(result), TIMEOUT)
  }),
  updateUser: (id, data) => new Promise((resolve, reject) => {
    const user = users.find(user => {
      return user.id === id
    })

    if (!user) {
      setTimeout(() => reject(new Error('NOT_FOUND')), TIMEOUT)
    }

    Object.assign(user, data, { id })

    setTimeout(() => resolve(user), TIMEOUT)
  })
}
