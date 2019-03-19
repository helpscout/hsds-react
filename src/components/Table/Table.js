import React, { PureComponent } from 'react'
import { ThemeProvider } from '../styled'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'

import Row from './Row'
import HeaderCell from './HeaderCell'
import OverflowScrollStrip from '../OverflowScrollStrip/OverflowScrollStrip'
import { TableWrapperUI, TableUI } from './styles/Table.css'

import { defaultTheme, alternativeTheme } from './styles/themes'

export const TABLE_CLASSNAME = 'c-Table'

export default class Table extends PureComponent {
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
    onRowClick: null,
    innerRef: noop,
  }

  render() {
    const {
      className,
      wrapperClassName,
      data,
      tableWidth,
      containerWidth,
      columns,
      sortedInfo,
      isLoading,
      onRowClick,
    } = this.props

    const tableWrapperClassName = classNames(
      `${TABLE_CLASSNAME}__Wrapper`,
      isLoading && `is-loading`,
      wrapperClassName
    )
    const tableClassName = classNames(
      TABLE_CLASSNAME,
      isLoading && 'is-loading',
      Boolean(onRowClick) && 'with-clickable-rows',
      className
    )

    return (
      <ThemeProvider theme={this.chooseTheme()}>
        <OverflowScrollStrip
          scrollableElementClassName={`${TABLE_CLASSNAME}__Wrapper`}
        >
          <TableWrapperUI
            className={tableWrapperClassName}
            innerRef={this.setInnerRef}
            isLoading={isLoading}
            containerWidth={containerWidth}
          >
            <TableUI tableWidth={tableWidth} className={tableClassName}>
              <thead>
                <tr className={`${TABLE_CLASSNAME}__HeaderRow`}>
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
                  <Row
                    row={row}
                    columns={columns}
                    key={`row_${row.id}`}
                    onRowClick={onRowClick}
                  />
                ))}
              </tbody>
            </TableUI>
          </TableWrapperUI>
        </OverflowScrollStrip>
      </ThemeProvider>
    )
  }

  setInnerRef = node => {
    this.props.innerRef(node)
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
