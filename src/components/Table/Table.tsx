import * as React from 'react'

import { ThemeProvider } from '../styled'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'

import * as equal from 'fast-deep-equal'

import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../PropProvider/propConnect'
import Button from '../Button'
import Scrollable from '../Scrollable'
import { COMPONENT_KEY } from './Table.utils'

import { TableWrapperUI, TableUI, LoadingUI } from './styles/Table.css'
import { defaultTheme, chooseTheme } from './styles/themes'

import Body from './Table.Body'
import Head from './Table.Head'

import { TableProps, TableState } from './Table.types'

export const TABLE_CLASSNAME = 'c-Table'

export class Table extends React.Component<TableProps, TableState> {
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
    const { className, tableClassName, onRowClick } = this.props
    const { isTableCollapsed } = this.state

    const tableWrapperClassNames = classNames(
      `${TABLE_CLASSNAME}__Wrapper`,
      isTableCollapsed && 'is-collapsed',
      className
    )
    const tableClassNames = classNames(
      TABLE_CLASSNAME,
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

  shouldComponentUpdate(nextProps: TableProps, nextState: TableState) {
    if (
      nextState &&
      nextState.isTableCollapsed !== this.state.isTableCollapsed
    ) {
      return true
    }

    const { columns, data, ...rest } = this.props
    const { columns: columnsNext, data: dataNext, ...restNext } = nextProps
    if (!equal(rest, restNext)) {
      return true
    }
    if (!equal(columnsNext, columns)) {
      return true
    }

    if (!equal(dataNext, data)) {
      return true
    }

    return false
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

    return (
      <ThemeProvider theme={chooseTheme(theme)}>
        <TableWrapperUI
          className={tableWrapperClassNames}
          innerRef={this.setWrapperNode}
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
              <Head
                columns={columns}
                isLoading={isLoading}
                sortedInfo={sortedInfo}
              />

              <Body
                rows={data}
                columns={columns}
                isTableCollapsed={isTableCollapsed}
                maxRowsToDisplay={maxRowsToDisplay}
                onRowClick={onRowClick}
              />
            </TableUI>
          </Scrollable>

          {isLoading && <LoadingUI className={`${TABLE_CLASSNAME}__Loading`} />}

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
