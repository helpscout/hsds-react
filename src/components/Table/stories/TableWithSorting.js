import React, { Component } from 'react'
import { createFakeCustomers, sortData } from '../Table.testUtils'
import Table from '../'

export default class TablePlayground extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: createFakeCustomers({ amount: 10 }),
      columns: [
        {
          title: 'Not sortable',
          columnKey: ['name'],
          width: '25%',
        },
        {
          title: 'Customer (sorts by name)',
          columnKey: ['name', 'companyName'],
          width: '25%',
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
          width: '25%',
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
          width: '25%',
          renderHeaderCell: { iconName: 'chat' },
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
      <div style={{ marginBottom: '50px' }}>
        <Table
          columns={columns}
          data={data}
          isLoading={isLoading}
          sortedInfo={sortedInfo}
          tableDescription="Example table with sorting"
        />
      </div>
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
