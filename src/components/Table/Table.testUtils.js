/* istanbul ignore file */
import React from 'react'
import { createSpec, derived, faker } from '@helpscout/helix'
import Truncate from '../Truncate'

export const defaultColumns = [
  {
    title: 'Name',
    columnKey: 'name',
    width: '25%',
  },
  {
    title: 'Company',
    columnKey: 'companyName',
    width: '25%',
  },
  {
    title: 'Email',
    columnKey: 'emails',
    width: '25%',
  },
  {
    title: 'Last Seen',
    columnKey: 'lastSeen',
    width: '25%',
  },
]

export const columnsChooser = [
  {
    title: 'Name',
    columnKey: 'name',
    width: '25%',
    group: 'Customer',
    show: true,
    disabledForChoosing: true,
  },
  {
    title: 'Company',
    columnKey: 'companyName',
    width: '25%',
    group: 'Customer',
    show: true,
  },
  {
    title: 'Email',
    columnKey: 'emails',
    width: '25%',
    group: 'Properties',
    show: true,
  },
  {
    title: 'Last Seen',
    columnKey: 'lastSeen',
    width: '25%',
    show: false,
  },
]

export const defaultColumnsCustomContent = [
  {
    title: 'Name',
    columnKey: 'name',
    width: '25%',
    renderHeaderCell: column => <em>{column.title}</em>,
    renderCell: ({ name }) => <strong>{name}</strong>,
  },
  {
    title: 'Company',
    renderHeaderCell: { iconName: 'chat' },
    columnKey: 'companyName',
    width: '25%',
  },
  {
    title: 'Email',
    columnKey: 'emails',
    width: '25%',
  },
  {
    title: 'Last Seen',
    columnKey: 'lastSeen',
    width: '25%',
  },
]

export const columsnWithCustomNameCell = [
  {
    title: 'Name',
    columnKey: 'name',
    width: '25%',
    renderCell: ({ name }) => (
      <strong style={{ color: 'dodgerblue' }}>
        <Truncate showTooltipOnTruncate type="end" limit={15}>
          {name}
        </Truncate>
      </strong>
    ),
  },
  {
    title: 'Company',
    columnKey: 'companyName',
    width: '25%',
  },
  {
    title: 'Email',
    columnKey: 'emails',
    width: '25%',
    renderCell: ({ emails }) => (
      <Truncate type="end" limit={12}>
        {emails}
      </Truncate>
    ),
  },
  {
    title: 'Last Seen',
    columnKey: 'lastSeen',
    width: '25%',
  },
]

export const columsnWithCustomHeaderNameCell = [
  {
    title: 'Name',
    columnKey: 'name',
    width: '34%',
    renderHeaderCell: column => (
      <em
        style={{
          textShadow: '0 0 2px darkred, 0 0 8px firebrick',
          fontSize: '18px',
          color: 'white',
        }}
      >
        {column.title}
      </em>
    ),
  },
  {
    title: 'Company',
    columnKey: 'companyName',
    width: '33%',
    renderHeaderCell: column => (
      <em
        style={{
          textShadow: '0 0 2px darkblue, 0 0 8px indigo',
          fontSize: '18px',
          color: 'white',
        }}
      >
        {column.title}
      </em>
    ),
  },
  {
    title: 'Email',
    columnKey: 'emails',
    width: '33%',
    renderHeaderCell: column => (
      <em
        style={{
          textShadow: '0 0 2px darkgreen, 0 0 8px seagreen',
          fontSize: '18px',
          color: 'white',
        }}
      >
        {column.title}
      </em>
    ),
  },
]

export const compoundColumns = [
  {
    title: 'Customer (name & company)',
    columnKey: ['name', 'companyName'],
    width: '33%',
  },
  {
    title: 'Customer (name & email)',
    columnKey: ['name', 'emails'],
    width: '33%',
    renderCell: ({ name, emails }) => {
      return (
        <div>
          <strong>{name}</strong>
          <br />
          <span>{emails}</span>
        </div>
      )
    },
  },
  {
    title: 'Email',
    columnKey: 'emails',
    width: '34%',
    renderCell: ({ emails }) => (
      <Truncate type="end" limit={15}>
        {emails}
      </Truncate>
    ),
  },
]

export function createFakeCustomers({ amount, multipleEmails, longNames }) {
  const emailsAmount = multipleEmails ? Math.floor(Math.random() * 3) + 1 : 1
  const emails = []

  for (let j = 0; j < emailsAmount; j++) {
    emails.push(faker.internet.email())
  }

  return createSpec({
    id: faker.datatype.uuid(),
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
    days: faker.datatype.number(100),
    lastSeen: derived(props => {
      const { days } = props
      return `${days} days ago`
    }),
    emails: emails.length === 1 ? emails[0] : emails,
  }).generate(amount)
}

export function getCurrentPageData(data, pageNumber) {
  // simulate an API call here
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
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
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
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
