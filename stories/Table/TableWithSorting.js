import React, { Component } from 'react'
import { createFakeCustomers, sortData } from './utils'
import { Table } from '../../src/index.js'
import { Wrapper } from './commonComponents'

export default class TablePlayground extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: createFakeCustomers({ amount: 10 }),
      columns: [
        {
          title: 'Customer (sorts by name)',
          columnKey: ['name', 'companyName'],
          width: '30%',
          sortKey: 'name',
          sorter: this.sortAlphabetically,
          renderCell: ({ name, companyName }) => {
            return (
              <div>
                <strong>{name}</strong>
                <br />
                <span>{companyName}</span>
              </div>
            )
          },
        },
        {
          title: 'Customer (sorts by company)',
          columnKey: ['name', 'companyName'],
          width: '30%',
          sortKey: 'companyName',
          sorter: this.sortAlphabetically,
          renderCell: ({ name, companyName }) => {
            return (
              <div>
                <strong>{name}</strong>
                <br />
                <span>{companyName}</span>
              </div>
            )
          },
        },
        {
          title: 'Company',
          columnKey: 'companyName',
          align: 'center',
          width: '35%',
          sorter: this.sortAlphabetically,
        },
      ],
      sortedInfo: {
        columnKey: null,
        order: null,
      },
      isLoading: false,
      activePage: 1,
    }
  }

  render() {
    const { data, columns, sortedInfo, isLoading } = this.state

    return (
      <Wrapper>
        <Table
          columns={columns}
          data={data}
          sortedInfo={sortedInfo}
          isLoading={isLoading}
        />
      </Wrapper>
    )
  }

  sortAlphabetically = columnKey => {
    const { data, sortedInfo } = this.state

    this.setState({
      isLoading: true,
    })

    // simulate sortData as an API call
    sortData(data, columnKey, sortedInfo.order).then(sortedData => {
      this.setState({
        data: sortedData,
        sortedInfo: {
          columnKey,
          order: sortedInfo.order === 'descending' ? 'ascending' : 'descending',
        },
        isLoading: false,
      })
    })
  }
}
