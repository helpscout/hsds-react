import { createSpec, derived, faker } from '@helpscout/helix'

export function createFakeCustomers({ amount, multipleEmails, longNames }) {
  const emailsAmount = multipleEmails ? Math.floor(Math.random() * 3) + 1 : 1
  const emails = []

  for (let j = 0; j < emailsAmount; j++) {
    emails.push(faker.internet.email())
  }

  return createSpec({
    id: faker.random.uuid(),
    firstName: faker.name.firstName(),
    middleName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    lastName2: faker.name.lastName(),
    name: derived(props => {
      const { firstName, middleName, lastName, lastName2 } = props
      return !longNames
        ? `${firstName} ${lastName}`
        : `${firstName} ${middleName} ${lastName} ${lastName2}`
    }),
    jobTitle: faker.name.jobTitle(),
    companyName: faker.company.companyName(),
    days: faker.random.number(100),
    lastSeen: derived(props => {
      const { days } = props
      return `${days} days ago`
    }),
    emails: emails.length === 1 ? emails[0] : emails,
  }).generate(amount)
}

export function getCurrentPageData(data, pageNumber) {
  // simulate an API call here
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      const rowsPerPage = 10

      const page = data.slice(
        rowsPerPage * pageNumber - rowsPerPage,
        rowsPerPage * pageNumber
      )

      resolve(page)
    }, 1000)
  })
}

export function sortData(data, columnKey, order) {
  // simulate an API call here
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      const sorted = data.sort((a, b) => {
        if (a[columnKey] < b[columnKey]) {
          return order === 'descending' ? -1 : 1
        }
        if (a[columnKey] > b[columnKey]) {
          return order === 'descending' ? 1 : -1
        }
        return 0
      })
      resolve(sorted)
    }, 1000)
  })
}
