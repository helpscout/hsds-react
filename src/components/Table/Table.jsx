import React, { useReducer } from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import Button from '../Button'
import Scrollable from '../Scrollable'
import { TableWrapperUI, TableUI, LoadingUI } from './Table.css'
import { defaultSkin, chooseSkin } from './Table.skins'
import { columnShape, dataShape, getDisplayTableData } from './Table.utils'
import { reducer } from './Table.reducer'
import TableBody from './Table.Body'
import TableHead from './Table.Head'

export const TABLE_CLASSNAME = 'c-Table'

export function Table({
  className,
  columns = [],
  containerWidth = '100%',
  data = [],
  'data-cy': dataCy = 'Table',
  expanderText,
  isLoading = false,
  isScrollLocked = true,
  maxRowsToDisplay,
  onExpand = noop,
  onSelectRow = noop,
  onRowClick = null,
  skin = defaultSkin,
  sortedInfo = {
    columnKey: null,
    order: null,
  },
  tableClassName,
  tableWidth = { min: '700px' },
  withSelectableRows = false,
  withTallRows = false,
}) {
  const [state, dispatch] = useReducer(reducer, {
    selectedRows: [],
    currentTableData: getDisplayTableData({
      data,
      rowsToDisplay: maxRowsToDisplay,
    }),
  })
  const isTableCollapsable = maxRowsToDisplay != null
  const isCollapsed = data.length !== state.currentTableData.length

  useDeepCompareEffect(() => {
    dispatch({
      type: 'updated-data',
      payload: { data, rowsToDisplay: maxRowsToDisplay },
    })
  }, [data, maxRowsToDisplay, sortedInfo])

  useDeepCompareEffect(() => {
    withSelectableRows && onSelectRow(state.selectedRows)
  }, [withSelectableRows, state.selectedRows])

  return (
    <ThemeProvider theme={chooseSkin(skin)}>
      <TableWrapperUI
        className={classNames(
          `${TABLE_CLASSNAME}__Wrapper`,
          isCollapsed && 'is-collapsed',
          className
        )}
        containerWidth={containerWidth}
        dataCy={dataCy}
      >
        <Scrollable
          fadeLeft
          fadeRight
          isScrollLocked={isScrollLocked}
          scrollLockDirection="x"
        >
          <TableUI
            className={classNames(
              TABLE_CLASSNAME,
              Boolean(onRowClick) && 'with-clickable-rows',
              tableClassName
            )}
            tableWidth={tableWidth}
            withTallRows={withTallRows}
          >
            <TableHead
              columns={columns}
              isLoading={isLoading}
              dispatch={dispatch}
              rows={state.currentTableData}
              selected={
                state.selectedRows.length === state.currentTableData.length
              }
              sortedInfo={sortedInfo}
              withSelectableRows={withSelectableRows}
            />
            <TableBody
              columns={columns}
              dispatch={dispatch}
              maxRowsToDisplay={maxRowsToDisplay}
              onRowClick={onRowClick}
              onSelectRow={onSelectRow}
              rows={state.currentTableData}
              selectedRows={state.selectedRows}
              withSelectableRows={withSelectableRows}
            />
          </TableUI>
        </Scrollable>

        {isLoading && <LoadingUI className={`${TABLE_CLASSNAME}__Loading`} />}

        {isTableCollapsable && isCollapsed ? (
          <Button
            className={`${TABLE_CLASSNAME}__Expander`}
            kind="link"
            onClick={() => {
              dispatch({
                type: 'expand',
                payload: {
                  data,
                  rowsToDisplay: data.length,
                },
              })
              onExpand({ collapsed: false })
            }}
            style={{ marginLeft: '14px' }}
          >
            {expanderText ? expanderText.collapsed : 'View All'}
          </Button>
        ) : null}

        {isTableCollapsable && !isCollapsed ? (
          <Button
            className={`${TABLE_CLASSNAME}__Expander`}
            kind="link"
            onClick={() => {
              dispatch({
                type: 'collapse',
                payload: {
                  data,
                  rowsToDisplay: maxRowsToDisplay,
                },
              })
              onExpand({ collapsed: true })
            }}
            style={{ marginLeft: '14px' }}
          >
            {expanderText ? expanderText.expanded : 'Collapse'}
          </Button>
        ) : null}
      </TableWrapperUI>
    </ThemeProvider>
  )
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
  /** Callback when selecting a row if enabled */
  onSelectRow: PropTypes.func,
  /** Adds a column with a checkbox for row selection */
  withSelectableRows: PropTypes.bool,
  /** Makes the rows 60px tall */
  withTallRows: PropTypes.bool,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default Table
