import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'
import classNames from 'classnames'
import { noop } from '../../utilities/other'
import equal from 'fast-deep-equal'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Button from '../Button'
import Scrollable from '../Scrollable'
import { TableWrapperUI, TableUI, LoadingUI } from './Table.css'
import { defaultSkin, chooseSkin } from './Table.skins'
import { columnShape, dataShape } from './Table.utils'
import TableBody from './Table.Body'
import TableHead from './Table.Head'

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
          {...getValidProps(rest)}
          className={tableWrapperClassNames}
          ref={this.setWrapperNode}
          containerWidth={containerWidth}
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
              <TableHead
                columns={columns}
                isLoading={isLoading}
                sortedInfo={sortedInfo}
              />

              <TableBody
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
Table.defaultProps = {
  columns: [],
  data: [],
  'data-cy': 'Table',
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

Table.propTypes = {
  /** Custom class names to be added to the component top level element. */
  className: PropTypes.string,
  /** Custom class names to be added to the `<table>` element. */
  tableClassName: PropTypes.string,
  /** List of columns */
  columns: PropTypes.arrayOf(PropTypes.shape(columnShape)),
  /** List of Rows, which are objects */
  data: PropTypes.arrayOf(PropTypes.shape(dataShape)),
  /** The text for the "expander" button when table is either collapsed or expanded */
  expanderText: PropTypes.any,
  /** When provided the Table will only show this number of rows and and expander to see the rest */
  maxRowsToDisplay: PropTypes.number,
  /** The table wrapper width (if `tableWidth` is larger, the component scrolls horizontally) */
  containerWidth: PropTypes.string,
  /** The `<table>` width */
  tableWidth: PropTypes.shape({ min: PropTypes.string, max: PropTypes.string }),
  /** An object to customize the visual appearance of the table. See [Skins.md](/src/components/Table/docs/Skins.md) */
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
  /** Adds the 'is-loading' class to the component */
  isLoading: PropTypes.bool,
  /** Whether to use `ScrollLock` with `direction="x"` on the Table. */
  isScrollLocked: PropTypes.bool,
  /** When sortable, indicates which column tha table is sorted by, and in which order (ascending or descending) */
  sortedInfo: PropTypes.shape({
    columnKey: PropTypes.string,
    order: PropTypes.string,
  }),
  /** Callback function when a row is clicked. Arguments are the event and the row clicked. */
  onRowClick: PropTypes.func,
  /** Retrieves the `<table>` node. */
  tableRef: PropTypes.func,
  /** Retrieves the table wrapper node. */
  wrapperRef: PropTypes.func,
  /** Callback when expending/collapsing the table */
  onExpand: PropTypes.func,
  /** Makes the rows 60px tall */
  withTallRows: PropTypes.bool,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default Table
