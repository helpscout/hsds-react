import React, { Component } from 'react'
import { createFakeCustomers, sortData } from './utils'
import Ellipsified from '../../src/components/Ellipsified/Ellipsified'
import Table from '../../src/components/Table/Table'
import { Wrapper, Header } from './commonComponents'

export default class TablePlayground extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: createFakeCustomers({ amount: 10 }),
      columns: [
        {
          title: 'Name',
          columnKey: 'name',
          align: 'left',
          width: '30%',
          sorter: this.sortAlphabetically,
        },
        {
          title: 'Company',
          columnKey: 'companyName',
          align: 'center',
          width: '35%',
          sorter: this.sortAlphabetically,
        },
        {
          title: 'Email',
          columnKey: 'emails',
          align: 'right',
          width: '25%',
          renderCell: email => <Ellipsified lines={1} text={email} />,
        },
        {
          title: 'Last Seen',
          columnKey: 'lastSeen',
          align: 'right',
          width: '10%',
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
