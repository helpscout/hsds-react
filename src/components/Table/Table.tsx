import * as React from 'react'

import { ThemeProvider } from '../styled'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../PropProvider/propConnect'
import Button from '../Button'
import Scrollable from '../Scrollable'
import { COMPONENT_KEY, generateCellKey } from './Table.utils'

import { TableWrapperUI, TableUI } from './styles/Table.css'
import { defaultTheme, chooseTheme } from './styles/themes'

import Row from './Table.Row'
import HeaderCell from './Table.HeaderCell'

import { TableProps, TableState } from './Table.types'

export const TABLE_CLASSNAME = 'c-Table'

export class Table extends React.PureComponent<TableProps, TableState> {
  constructor(props) {
    super(props)

    const { maxRowsToDisplay, data } = this.props

    this.state = {
      isTableCollapsed:
        maxRowsToDisplay != null && maxRowsToDisplay < data.length,
    }
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
    isScrollLocked: true,
    onRowClick: null,
    wrapperRef: noop,
    tableRef: noop,
    onExpand: noop,
  }

  wrapperNode: HTMLElement
  tableNode: HTMLElement

  setWrapperNode = node => {
    this.wrapperNode = node
    this.props.wrapperRef(node)
  }

  setTableNode = node => {
    this.tableNode = node
    this.props.tableRef(node)
  }

  getComponentClassNames = () => {
    const { className, tableClassName, isLoading, onRowClick } = this.props
    const { isTableCollapsed } = this.state

    const tableWrapperClassNames = classNames(
      `${TABLE_CLASSNAME}__Wrapper`,
      isLoading && 'is-loading',
      isTableCollapsed && 'is-collapsed',
      className
    )
    const tableClassNames = classNames(
      TABLE_CLASSNAME,
      isLoading && 'is-loading',
      Boolean(onRowClick) && 'with-clickable-rows',
      tableClassName
    )

    return { tableWrapperClassNames, tableClassNames }
  }

  handleExpanderClick = () => {
    this.setState(
      {
        isTableCollapsed: !this.state.isTableCollapsed,
      },
      () => {
        this.props.onExpand(!!this.state.isTableCollapsed)
      }
    )
  }

  render() {
    const {
      className,
      tableClassName,
      data,
      columns,
      maxRowsToDisplay,
      tableWidth,
      containerWidth,
      sortedInfo,
      isLoading,
      isScrollLocked,
      onRowClick,
      theme,
      ...rest
    } = this.props

    const { isTableCollapsed } = this.state

    const {
      tableWrapperClassNames,
      tableClassNames,
    } = this.getComponentClassNames()

    const rowsToDisplay = isTableCollapsed
      ? data.slice(0, maxRowsToDisplay)
      : [...data]

    return (
      <ThemeProvider theme={chooseTheme(theme)}>
        <TableWrapperUI
          className={tableWrapperClassNames}
          innerRef={this.setWrapperNode}
          isLoading={isLoading}
          containerWidth={containerWidth}
          {...getValidProps(rest)}
        >
          <Scrollable
            fadeLeft
            fadeRight
            scrollLockDirection="x"
            isScrollLocked={isScrollLocked}
          >
            <TableUI
              tableWidth={tableWidth}
              className={tableClassNames}
              innerRef={this.setTableNode}
            >
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
                {rowsToDisplay.map(row => (
                  <Row
                    row={row}
                    columns={columns}
                    key={`row_${row.id}`}
                    onRowClick={onRowClick}
                  />
                ))}
              </tbody>
            </TableUI>
          </Scrollable>

          {isTableCollapsed ? (
            <Button
              version={2}
              style={{ marginLeft: '14px' }}
              kind="link"
              className={`${TABLE_CLASSNAME}__Expander`}
              onClick={this.handleExpanderClick}
            >
              View all
            </Button>
          ) : null}
        </TableWrapperUI>
      </ThemeProvider>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(Table)

export default PropConnectedComponent
