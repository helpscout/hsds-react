import React, { Component } from 'react'
import baseStyles from '../../styles/resets/baseStyles.css.js'
import styled from '../styled'

const TableWrapperUI = styled('div')`
  ${baseStyles} overflow-x: auto;
  width: 100%;
`
const TableUI = styled('table')`
  border-collapse: collapse;
  /* Width */
  max-width: 100%;
  ${props => props.width && props.width.min && `min-width: ${props.width.min}`};
  ${props => props.width && props.width.max && `max-width: ${props.width.max}`};

  /* Borders */
  /* Borders: Outer */
  ${props => props.border.outer && 'border: 2px solid dodgerblue;'};

  th,
  td {
    padding: 5px;
    /* Borders: Rows */
    ${props => props.border.rows && 'border-bottom: 1px solid coral;'};

    /* Borders: Columns */
    ${props => props.border.columns && 'border-right: 1px solid lightgreen;'};
  }

  tr:last-child td {
    border-bottom: 0;
  }

  tr th:last-child,
  tr td:last-child {
    border-right: 0;
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

const TableCell = styled('td')`
  ${props => props.align && `text-align: ${props.align}`};
`

export default class Table extends Component {
  render() {
    let columnKeys = columns.map(col => col.key)

    return (
      <TableWrapperUI>
        <TableUI
          border={{ outer: true, rows: true, columns: true }}
          background={['lightyellow', 'lightblue']}
          width={{ min: '700px' }}
        >
          <thead>
            <tr>
              {columns.map(column => (
                <th
                  scope="col"
                  role="columnheader"
                  aria-sort="ascending"
                  key={column.key}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(row => {
              return (
                <tr>
                  {columns.map(column => (
                    <TableCell align={column.align}>
                      {row[column.key]}
                    </TableCell>
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

var columns = [
  {
    title: 'Name',
    key: 'name',
    align: 'left',
  },
  {
    title: 'Company',
    key: 'companyName',
    align: 'center',
  },
  {
    title: 'Email',
    key: 'emails',
    align: 'right',
  },
]

var data = [
  {
    id: '1',
    name: 'Deon Javelin',
    jobTitle: 'Fishmonger',
    companyName: 'Bubba Gump',
    lastSeen: '1 day ago',
    emails: ['deon@gmail.com'],
  },
  {
    id: '2',
    name: 'Rocketeer',
    jobTitle: 'Adventurer',
    companyName: 'Acme, Inc',
    lastSeen: '3 days ago',
    emails: ['rocketeer@acme.com'],
  },
]
