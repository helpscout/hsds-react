import React, { Component } from 'react'
import baseStyles from '../../styles/resets/baseStyles.css.js'
import styled from '../styled'
import faker from 'faker'

const TableWrapperUI = styled('div')`
  ${baseStyles} overflow-x: auto;
  width: 100%;
  outline: 5px dashed #49e9a6;
`
const TableUI = styled('table')`
  border-spacing: 0;
  width: 100%;

  /* Width */
  ${props =>
    props.tableWidth &&
    props.tableWidth.min &&
    `min-width: ${props.tableWidth.min}`};
  ${props =>
    `max-width: ${
      props.tableWidth && props.tableWidth.max ? props.tableWidth.max : '100%'
    }`};

  /* Borders */
  th,
  td {
    padding: 5px;
    /* Borders: Rows */
    ${props => props.border.rows && `border-bottom: ${props.border.rows};`};

    /* Borders: Columns */
    ${props => props.border.columns && `border-right: ${props.border.columns}`};
  }

  /* Borders: table header */
  thead tr th:first-child {
    ${props =>
      props.border.tableHeader && `border-left: ${props.border.tableHeader};`};
  }
  thead tr th:last-child {
    ${props =>
      props.border.tableHeader && `border-right: ${props.border.tableHeader};`};
  }
  thead tr:first-child th {
    ${props =>
      props.border.tableHeader && `border-top: ${props.border.tableHeader};`};
  }
  thead tr:last-child th {
    ${props =>
      props.border.tableHeader &&
      `border-bottom: ${props.border.tableHeader};`};
  }

  /* Border radius */
  thead tr th:first-child,
  tbody tr:first-child td:first-child {
    border-top-left-radius: 3px;
  }
  thead tr th:last-child,
  tbody tr:first-child td:last-child {
    border-top-right-radius: 3px;
  }
  thead tr th:first-child,
  tbody tr:last-child td:first-child {
    border-bottom-left-radius: 3px;
  }
  thead tr th:last-child,
  tbody tr:last-child td:last-child {
    border-bottom-right-radius: 3px;
  }

  /* Borders: table body */
  tbody tr td:first-child {
    ${props =>
      props.border.tableBody && `border-left: ${props.border.tableBody};`};
  }
  tbody tr td:last-of-type {
    ${props =>
      props.border.tableBody && `border-right: ${props.border.tableBody};`};
  }
  tbody tr:first-child td {
    ${props =>
      props.border.tableBody && `border-top: ${props.border.tableBody};`};
  }
  tbody tr:last-child td {
    ${props =>
      props.border.tableBody && `border-bottom: ${props.border.tableBody};`};
  }

  /* Background */

  tr:nth-child(2n) td {
    ${props =>
      props.background &&
      props.background[0] &&
      `background-color: ${props.background[0]}`};
  }

  tr:nth-child(2n + 1) td {
    ${props =>
      props.background &&
      props.background[1] &&
      `background-color: ${props.background[1]}`};
  }
`

const HeaderCell = styled('th')`
  ${props => `text-align: ${props.align || 'left'}`};
`

const BodyCell = styled('td')`
  ${props => `text-align: ${props.align || 'left'}`};
`

export default class Table extends Component {
  constructor(props) {
    super(props)
    this.tableWrapper = React.createRef()
  }

  static defaultProps = {
    background: ['#48ACE9', '#49D6EA'],
    border: {
      tableBody: '2px solid #452840',
      tableHeader: '2px solid #E25C97',
      rows: '2px solid #9652BB',
      columns: '2px solid #452840',
    },
    columns: createColumns(),
    data: createFakeCustomers(50),
    tableWidth: { min: '700px' },
  }

  render() {
    const { data, tableWidth, columns, border, background } = this.props

    return (
      <TableWrapperUI ref={this.tableWrapper}>
        <TableUI
          border={border}
          background={background}
          tableWidth={tableWidth}
        >
          <colgroup>
            {columns.map(column => (
              <col
                span="1"
                key={`col_${column.key}`}
                style={{ width: column.width }}
              />
            ))}
          </colgroup>

          <thead>
            <tr>
              {columns.map(column => (
                <HeaderCell
                  align={column.align}
                  aria-sort="ascending"
                  key={column.key}
                  role="columnheader"
                  scope="col"
                >
                  {column.title}
                </HeaderCell>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map(row => {
              return (
                <tr key={row.id}>
                  {columns.map(column => (
                    <BodyCell
                      key={`${row.id}_${column.key}`}
                      align={column.align}
                    >
                      {row[column.key]}
                    </BodyCell>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </TableUI>
      </TableWrapperUI>
    )
  }
}

function createColumns() {
  return [
    {
      title: 'Name',
      key: 'name',
      align: 'left',
      width: '40%',
    },
    {
      title: 'Company',
      key: 'companyName',
      align: 'center',
      width: '25%',
    },
    {
      title: 'Email',
      key: 'emails',
      align: 'right',
      width: '25%',
    },
    {
      title: 'Last Seen',
      key: 'lastSeen',
      align: 'right',
      width: '10%',
    },
  ]
}

function createFakeCustomers(amount) {
  const data = []
  faker.seed(123)

  for (let index = 1; index <= amount; index++) {
    // const emailsAmount = Math.floor(Math.random() * 3) + 1
    // const emails = []

    // for (let j = 0; j < emailsAmount; j++) {
    //   emails.push(faker.internet.email())
    // }

    const customer = {
      id: index,
      name: faker.name.findName(),
      jobTitle: faker.name.jobTitle(),
      companyName: faker.company.companyName(),
      lastSeen: `${faker.random.number()} days ago`,
      emails: faker.internet.email(),
    }

    data.push(customer)
  }

  return data
}
