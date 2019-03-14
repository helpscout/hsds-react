import faker from 'faker'

export function createFakeCustomers({ amount, multipleEmails, longNames }) {
  const data = []
  faker.seed(123)

  for (let index = 1; index <= amount; index++) {
    const emails = []
    const emailsAmount = multipleEmails ? Math.floor(Math.random() * 3) + 1 : 1

    for (let j = 0; j < emailsAmount; j++) {
      emails.push(faker.internet.email())
    }

    const customer = {
      id: index,
      name: `${faker.name.findName()} ${
        longNames && faker.random.boolean()
          ? `${faker.name.findName()} ${faker.name.findName()}`
          : ''
      }`.trim(),
      jobTitle: faker.name.jobTitle(),
      companyName: faker.company.companyName(),
      lastSeen: `${faker.random.number()} days ago`,
      emails: emails.length === 1 ? emails[0] : emails,
    }

    data.push(customer)
  }

  return data
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
