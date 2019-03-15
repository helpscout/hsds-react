import React, { Component } from 'react'
import { ThemeProvider } from '../styled'

import Row from './Row'
import HeaderCell from './HeaderCell'
import { TableWrapperUI, TableUI } from './styles/Table.css'

import { defaultTheme, alternativeTheme } from './styles/themes'

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
                {columns.map(column => (
                  <HeaderCell
                    key={generateCellKey('headercell', column)}
                    column={column}
                    isLoading={isLoading}
                    sortedInfo={sortedInfo}
                  />
                ))}
              </tr>
            </thead>

            <tbody>
              {data.map(row => (
                <Row row={row} columns={columns} key={`row_${row.id}`} />
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

export function generateCellKey(element, column) {
  return Array.isArray(column.columnKey)
    ? `${element}_${column.sortKey}_${column.columnKey.join('_')}`
    : `${element}_${column.columnKey}`
}
