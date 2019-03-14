import React, { Component } from 'react'
import { ThemeProvider } from '../styled'
import { getColor } from '../../styles/utilities/color'

import {
  TableWrapperUI,
  TableUI,
  HeaderCellUI,
  CellUI,
} from './styles/Table.css'

const Row = ({ row, columns }) => (
  <tr>
    {columns.map(column => {
      let key = Array.isArray(column.columnKey)
        ? `${row.id}_${column.columnKey.join('_')}`
        : `${row.id}_${column.columnKey}`

      return <Cell column={column} row={row} key={key} />
    })}
  </tr>
)

const Cell = ({ column, row }) => {
  if (Array.isArray(column.columnKey)) {
    const cellData = {}

    for (const colKey of column.columnKey) {
      cellData[colKey] = row[colKey]
    }

    return (
      <CellUI align={column.align}>
        {column.renderCell
          ? column.renderCell(cellData)
          : Object.values(cellData).map(data => (
              <div key={data.slice(4)}>{data}</div>
            ))}
      </CellUI>
    )
  }

  return (
    <CellUI align={column.align}>
      {column.renderCell
        ? column.renderCell(row[column.columnKey])
        : row[column.columnKey]}
    </CellUI>
  )
}

const HeaderCell = ({ column, isLoading, sortedInfo }) => (
  <HeaderCellUI
    align={column.align}
    cellWidth={column.width}
    aria-sort={
      sortedInfo.columnKey === column.columnKey && sortedInfo.order
        ? sortedInfo.order
        : 'none'
    }
    onClick={() => {
      if (!isLoading && column.sorter != null) {
        column.sorter(column.columnKey)
      }
    }}
  >
    {column.renderHeaderCell
      ? column.renderHeaderCell(column, { sortedInfo })
      : column.title}
  </HeaderCellUI>
)

export const defaultTheme = {
  fontColorHeader: getColor('charcoal.500'),
  fontColorBody: getColor('charcoal.500'),
  fontColorAlternate: getColor('charcoal.500'),
  bgColor: getColor('grey.200'),
  bgAlternate: 'white',
  bgHeader: 'white',
  borderTableBody: `1px solid ${getColor('grey.500')}`,
  borderTableHeader: 'none',
  borderRows: `1px solid ${getColor('grey.500')}`,
  borderColumns: 'none',
}

export const alternativeTheme = {
  ...defaultTheme,
  ...{
    borderTableHeader: `1px solid ${getColor('grey.500')}`,
    bgHeader: getColor('grey.400'),
  },
}

export default class Table extends Component {
  constructor(props) {
    super(props)
    this.tableWrapper = React.createRef()
  }

  static defaultProps = {
    columns: [],
    data: [],
    theme: defaultTheme,
    tableWidth: { min: '700px' },
    containerWidth: '100%',
    sortedInfo: {
      columnKey: null,
      order: null,
    },
    isLoading: false,
  }

  render() {
    const {
      data,
      tableWidth,
      containerWidth,
      columns,
      sortedInfo,
      isLoading,
    } = this.props

    const themeToUse = this.chooseTheme()

    return (
      <ThemeProvider theme={themeToUse}>
        <TableWrapperUI
          ref={this.tableWrapper}
          isLoading={isLoading}
          containerWidth={containerWidth}
        >
          <TableUI tableWidth={tableWidth}>
            <thead>
              <tr>
                {columns.map(column => {
                  let key = Array.isArray(column.columnKey)
                    ? column.columnKey.join('_')
                    : column.columnKey

                  return (
                    <HeaderCell
                      key={key}
                      column={column}
                      isLoading={isLoading}
                      sortedInfo={sortedInfo}
                    />
                  )
                })}
              </tr>
            </thead>

            <tbody>
              {data.map(row => (
                <Row row={row} columns={columns} key={row.id} />
              ))}
            </tbody>
          </TableUI>
        </TableWrapperUI>
      </ThemeProvider>
    )
  }

  chooseTheme = () => {
    const { theme } = this.props

    if (!theme || theme === 'default') return defaultTheme
    if (theme === 'alternative') return alternativeTheme
    return { ...defaultTheme, ...theme }
  }
}
