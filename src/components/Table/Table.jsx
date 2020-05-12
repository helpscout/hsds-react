import React from 'react'
import PropTypes from 'prop-types'

import { ThemeProvider } from 'styled-components'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'

import equal from 'fast-deep-equal'

import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Button from '../Button'
import Scrollable from '../Scrollable'

import { TableWrapperUI, TableUI, LoadingUI } from './Table.css'
import { defaultSkin, chooseSkin } from './Table.skins'

import Body from './Table.Body'
import Head from './Table.Head'

export const TABLE_CLASSNAME = 'c-Table'

export class Table extends React.Component {
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
    skin: defaultSkin,
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
    withTallRows: false,
  }

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

  shouldComponentUpdate(nextProps, nextState) {
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
      columns,
      data,
      expanderText,
      maxRowsToDisplay,
      tableWidth,
      containerWidth,
      sortedInfo,
      isLoading,
      isScrollLocked,
      withTallRows,
      onRowClick,
      skin,
      ...rest
    } = this.props

    const { isTableCollapsed } = this.state

    const {
      tableWrapperClassNames,
      tableClassNames,
    } = this.getComponentClassNames()

    return (
      <ThemeProvider theme={chooseSkin(skin)}>
        <TableWrapperUI
          className={tableWrapperClassNames}
          ref={this.setWrapperNode}
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
              withTallRows={withTallRows}
              className={tableClassNames}
              ref={this.setTableNode}
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

          {maxRowsToDisplay && isTableCollapsed ? (
            <Button
              version={2}
              style={{ marginLeft: '14px' }}
              kind="link"
              className={`${TABLE_CLASSNAME}__Expander`}
              onClick={this.handleExpanderClick}
            >
              {expanderText ? expanderText.collapsed : 'View All'}
            </Button>
          ) : null}

          {maxRowsToDisplay && !isTableCollapsed ? (
            <Button
              style={{ marginLeft: '14px' }}
              kind="link"
              className={`${TABLE_CLASSNAME}__Expander`}
              onClick={this.handleExpanderClick}
            >
              {expanderText ? expanderText.expanded : 'Collapse'}
            </Button>
          ) : null}
        </TableWrapperUI>
      </ThemeProvider>
    )
  }
}

export const columnShape = PropTypes.shape({
  title: PropTypes.string,
  columnKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  width: PropTypes.string,
  align: PropTypes.string,
  renderCell: PropTypes.func,
  renderHeaderCell: PropTypes.func,
  sortKey: PropTypes.string,
  sorter: PropTypes.func,
})

export const dataShape = PropTypes.shape({
  id: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  key: PropTypes.any,
})

Table.propTypes = {
  className: PropTypes.string,
  tableClassName: PropTypes.string,
  columns: PropTypes.arrayOf(columnShape),
  data: PropTypes.arrayOf(dataShape),
  expanderText: PropTypes.any,
  maxRowsToDisplay: PropTypes.number,
  containerWidth: PropTypes.string,
  tableWidth: PropTypes.shape({ min: PropTypes.string, max: PropTypes.string }),
  skin: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      fontColorHeader: PropTypes.string,
      fontColorBody: PropTypes.string,
      fontColorAlternate: PropTypes.string,
      bgColor: PropTypes.string,
      bgAlternate: PropTypes.string,
      bgHeader: PropTypes.string,
      bgColorHover: PropTypes.string,
      borderTableBody: PropTypes.string,
      borderTableHeader: PropTypes.string,
      borderRows: PropTypes.string,
      borderColumns: PropTypes.string,
    }),
  ]),
  isLoading: PropTypes.bool,
  isScrollLocked: PropTypes.bool,
  withTallRows: PropTypes.bool,
  sortedInfo: PropTypes.shape({
    columnKey: PropTypes.string,
    order: PropTypes.string,
  }),
  onRowClick: PropTypes.func,
  onExpand: PropTypes.func,
  tableRef: PropTypes.func,
  wrapperRef: PropTypes.func,
}

export default Table
