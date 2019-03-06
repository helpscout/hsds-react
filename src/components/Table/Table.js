import React, { Component } from 'react'

import {
  TableWrapperUI,
  TableUI,
  HeaderCellUI,
  CellUI,
} from './styles/Table.css'

const TCol = ({ column }) => (
  <col
    span="1"
    style={{
      width: column.width,
    }}
  />
)

const Row = ({ row, columns }) => (
  <tr>
    {columns.map(column => (
      <Cell column={column} row={row} key={`${row.id}_${column.columnKey}`} />
    ))}
  </tr>
)

const Cell = ({ column, row }) => (
  <CellUI align={column.align}>
    {column.renderCell
      ? column.renderCell(row[column.columnKey])
      : row[column.columnKey]}
  </CellUI>
)

const HeaderCell = ({ column, loadingData, sortedInfo }) => (
  <HeaderCellUI
    align={column.align}
    aria-sort={
      sortedInfo.columnKey === column.columnKey && sortedInfo.order
        ? sortedInfo.order
        : 'none'
    }
    role="columnheader"
    scope="col"
    onClick={() => {
      if (!loadingData && column.sorter != null) {
        column.sorter(column.columnKey)
      }
    }}
  >
    {column.renderHeaderCell
      ? column.renderHeaderCell(column, sortedInfo)
      : column.title}
  </HeaderCellUI>
)

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
    columns: [],
    data: [],
    loadingData: false,
    tableWidth: { min: '700px' },
    sortedInfo: {
      columnKey: null,
      order: null,
    },
  }

  render() {
    const {
      data,
      tableWidth,
      columns,
      border,
      background,
      sortedInfo,
      loadingData,
    } = this.props

    return (
      <TableWrapperUI ref={this.tableWrapper} loadingData={loadingData}>
        <TableUI
          border={border}
          background={background}
          tableWidth={tableWidth}
        >
          <colgroup>
            {columns.map(column => (
              <TCol key={`col_${column.columnKey}`} column={column} />
            ))}
          </colgroup>

          <thead>
            <tr>
              {columns.map(column => (
                <HeaderCell
                  key={column.columnKey}
                  column={column}
                  loadingData={loadingData}
                  sortedInfo={sortedInfo}
                />
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map(row => <Row row={row} columns={columns} key={row.id} />)}
          </tbody>
        </TableUI>
      </TableWrapperUI>
    )
  }
}
