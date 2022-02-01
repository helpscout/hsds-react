import React, { Component } from 'react'
import { createFakeCustomers } from '../Table.testUtils'
import Table from '../'
const originalData = createFakeCustomers({ amount: 5 })

export default class TableWithPagination extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: originalData,
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
      removedRows: [],
    }
  }
  timer = undefined
  render() {
    const { data, columns, tableWidth, containerWidth } = this.state

    return (
      <div style={{ marginBottom: '50px' }}>
        <div style={{ marginBottom: '20px' }}>
          <button
            style={{ marginRight: '10px' }}
            onClick={() => {
              if (this.state.data.length > 0) {
                this.timer = setInterval(() => {
                  this.setState(
                    {
                      data: this.state.data.slice(
                        0,
                        this.state.data.length - 1
                      ),
                    },
                    () => {
                      if (this.state.data.length === 0) {
                        clearInterval(this.timer)
                      }
                    }
                  )
                }, 600)
              }
            }}
          >
            Vanish them
          </button>
          {this.state.removedRows.length ? (
            <button
              onClick={() => {
                clearInterval(this.timer)
                const removed = originalData.find(
                  row =>
                    row.id ===
                    this.state.removedRows[this.state.removedRows.length - 1]
                )

                this.setState({
                  data: this.state.data.concat(removed),
                  removedRows: this.state.removedRows.filter(
                    row => row !== removed.id
                  ),
                })
              }}
            >
              Restore (one by one)
            </button>
          ) : null}
        </div>
        <Table
          animateRows={{
            onExit: node => {
              this.setState({
                removedRows: this.state.removedRows.concat(node.dataset.rowId),
              })
            },
          }}
          columns={columns}
          data={data}
          data-testid="Table"
          tableDescription="Example table with pagination"
          tableWidth={tableWidth}
          containerWidth={containerWidth}
          onRowClick={(e, clickedRow) => {
            clearInterval(this.timer)
            this.setState({
              data: this.state.data.filter(row => row.id !== clickedRow.id),
            })
          }}
        />
        {this.state.removedRows.length > 0 ? (
          <div style={{ marginTop: '20px' }}>
            Removed rows:
            <ul>
              {this.state.removedRows.map(row => (
                <li key={row}>{row}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    )
  }
}
