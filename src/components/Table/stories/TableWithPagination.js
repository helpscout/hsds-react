import React, { Component } from 'react'
import { boolean, select } from '@storybook/addon-knobs'
import { createFakeCustomers, getCurrentPageData } from '../Table.testUtils'
import Pagination from '../../Pagination'
import Button from '../../Button'
import Table from '../'

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
          clearCellPadding: true,
          renderCell: ({ name }) => {
            return (
              <a className="fill-table-cell" href="#top" tabIndex="-1">
                {name}
              </a>
            )
          },
        },
        {
          title: 'Company',
          columnKey: 'companyName',
          width: '33%',
        },
        {
          title: 'Email',
          columnKey: 'emails',
          align: 'center',
          renderCell(cellData) {
            return (
              <Button
                style={{ width: '120px' }}
                size="xxs"
                onClick={e => {
                  console.log('button activated:click')
                }}
              >
                Email {cellData.row.firstName}
              </Button>
            )
          },
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
      isLoading,
      tableWidth,
      containerWidth,
      activePage,
      paginatedData,
    } = this.state

    return (
      <div style={{ marginBottom: '50px' }}>
        <Table
          columns={columns}
          data={paginatedData}
          data-testid="Table"
          isLoading={isLoading}
          tableDescription="Example table with pagination"
          tableWidth={tableWidth}
          containerWidth={containerWidth}
          onRowClick={(e, row) => {
            console.log('🚀 ~ Row click / enter')
          }}
          withFocusableRows
          withTallRows={boolean('withTallRows', false)}
          skin={select(
            'Skin',
            {
              default: 'default',
              alternative: 'alternative',
            },
            'default'
          )}
        />
        <Pagination
          subject="Customer"
          activePage={activePage}
          showNavigation={true}
          rangePerPage={10}
          totalItems={data.length}
          onChange={this.handlePageChange}
        />
      </div>
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
