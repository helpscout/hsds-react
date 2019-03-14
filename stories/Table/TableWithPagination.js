import React, { Component } from 'react'

import Table from '../../src/components/Table/Table'
import Heading from '../../src/components/Heading'
import Pagination from '../../src/components/Pagination'
import { Wrapper, Header } from './commonComponents'
import { createFakeCustomers, getCurrentPageData } from './utils'

export default class TableWithPagination extends Component {
  constructor(props) {
    super(props)
    const data = createFakeCustomers({ amount: 100 })
    const paginatedData = data.slice(0, 10)

    this.state = {
      data,
      paginatedData,
      columns: [
        {
          title: 'Name',
          columnKey: 'name',
          width: '33%',
        },
        {
          title: 'Company',
          columnKey: 'companyName',
          width: '33%',
        },
        {
          title: 'Email',
          columnKey: 'emails',
          width: '34%',
        },
      ],
      loadingData: false,
      tableWidth: { min: '700px' },
      containerWidth: '100%',
      activePage: 1,
    }
  }

  render() {
    const {
      data,
      columns,
      sortedInfo,
      isLoading,
      tableWidth,
      containerWidth,
      activePage,
      paginatedData,
    } = this.state

    return (
      <Wrapper>
        <Header>
          <Heading size="h2">
            Table with Pagination{' '}
            <span role="img" aria-label="emoji">
              👇
            </span>
          </Heading>
        </Header>
        <Table
          columns={columns}
          data={paginatedData}
          isLoading={isLoading}
          tableWidth={tableWidth}
          containerWidth={containerWidth}
        />
        <Pagination
          subject="Customer"
          activePage={activePage}
          showNavigation={true}
          rangePerPage={10}
          totalItems={data.length}
          onChange={this.handlePageChange}
        />
      </Wrapper>
    )
  }

  handlePageChange = nextPage => {
    const { data } = this.state

    this.setState({
      isLoading: true,
    })

    getCurrentPageData(data, nextPage).then(page => {
      this.setState({
        activePage: nextPage,
        paginatedData: page,
        isLoading: false,
      })
    })
  }
}
