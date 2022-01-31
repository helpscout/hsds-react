import React, { Component } from 'react'
import { boolean, select } from '@storybook/addon-knobs'
import { createFakeCustomers } from '../Table.testUtils'
import Table from '../'

export default class TableWithPagination extends Component {
  constructor(props) {
    super(props)
    const data = createFakeCustomers({ amount: 10 })

    this.state = {
      data,
      columns: [
        {
          title: 'Name',
          columnKey: 'name',
          width: '50%',
        },
        {
          title: 'Company',
          columnKey: 'companyName',
          width: '50%',
        },
      ],
      loadingData: false,
      tableWidth: { min: '400px' },
      containerWidth: '400px',
      activePage: 1,
    }
  }

  render() {
    const { data, columns, isLoading, tableWidth, containerWidth } = this.state

    return (
      <div style={{ marginBottom: '50px' }}>
        <Table
          animateRows
          columns={columns}
          data={data}
          data-testid="Table"
          isLoading={isLoading}
          tableDescription="Example table with pagination"
          tableWidth={tableWidth}
          containerWidth={containerWidth}
          withTallRows={boolean('withTallRows', false)}
          onRowClick={(e, row) => {
            const removeRowID = row.id

            this.setState({
              data: this.state.data.filter(row => row.id !== removeRowID),
            })
          }}
          skin={select(
            'Skin',
            {
              default: 'default',
              alternative: 'alternative',
            },
            'default'
          )}
        />
      </div>
    )
  }
}
