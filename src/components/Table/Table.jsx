import React from 'react'
import PropTypes from 'prop-types'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { ThemeProvider } from 'styled-components'
import classNames from 'classnames'
import { noop } from '../../utilities/other'
import Button from '../Button'
import Scrollable from '../Scrollable'
import { HeaderUI, TableWrapperUI, TableUI, LoadingUI } from './Table.css'
import { defaultSkin, chooseSkin } from './Table.skins'
import { columnShape, dataShape } from './Table.utils'
import { useTable } from './Table.hooks'
import TableBody from './Table.Body'
import TableHead from './Table.Head'
import ColumnChooser from './Table.ColumnChooser'

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
  onColumnChoose = noop,
  onExpand = noop,
  onRowClick = null,
  onSelectRow = noop,
  rowClassName = noop,
  rowWrapper = null,
  selectionKey = 'id',
  skin = defaultSkin,
  sortedInfo = {
    columnKey: null,
    order: null,
  },
  tableClassName,
  tableDescription,
  tableWidth = { min: '700px' },
  withColumnChooser = false,
  withFocusableRows = false,
  withSelectableRows = false,
  withTallRows = false,
  ...rest
}) {
  const defaultColumns = columns.map(col => {
    if (col.show == null) {
      col.show = true
    }

    return col
  })
  const [state, actions] = useTable(data, maxRowsToDisplay, defaultColumns)
  const {
    updateTableData,
    expandTable,
    collapseTable,
    selectAllRows,
    deselectAllRows,
    selectRow,
    deselectRow,
    updateColumns,
    resetColumns,
  } = actions
  const isTableCollapsable = maxRowsToDisplay != null
  const isCollapsed = data.length !== state.currentTableData.length

  useDeepCompareEffect(() => {
    updateTableData(data, maxRowsToDisplay)
  }, [data, maxRowsToDisplay, sortedInfo])

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
        {...rest}
      >
        {withColumnChooser ? (
          <HeaderUI>
            <ColumnChooser
              columns={state.columns}
              defaultColumns={defaultColumns}
              onColumnChoose={onColumnChoose}
              resetColumns={resetColumns}
              updateColumns={updateColumns}
            />
          </HeaderUI>
        ) : null}

        <Scrollable
          fadeLeft
          fadeRight
          isScrollLocked={isScrollLocked}
          scrollLockDirection="x"
        >
          <TableUI
            ariaLabel={tableDescription}
            className={classNames(
              TABLE_CLASSNAME,
              Boolean(onRowClick) && 'with-clickable-rows',
              tableClassName
            )}
            tableWidth={tableWidth}
            withTallRows={withTallRows}
          >
            <TableHead
              columns={state.columns}
              deselectAllRows={deselectAllRows}
              isLoading={isLoading}
              rows={state.currentTableData}
              onSelectRow={onSelectRow}
              selectAllRows={selectAllRows}
              selectionKey={selectionKey}
              selected={
                state.selectedRows.length === state.currentTableData.length
              }
              sortedInfo={sortedInfo}
              withSelectableRows={withSelectableRows}
            />
            <TableBody
              columns={state.columns}
              deselectRow={deselectRow}
              maxRowsToDisplay={maxRowsToDisplay}
              onRowClick={onRowClick}
              onSelectRow={onSelectRow}
              rows={state.currentTableData}
              rowClassName={rowClassName}
              rowWrapper={rowWrapper}
              selectionKey={selectionKey}
              selectedRows={state.selectedRows}
              selectRow={selectRow}
              withSelectableRows={withSelectableRows}
              withFocusableRows={withFocusableRows}
            />
          </TableUI>
        </Scrollable>

        {isLoading && <LoadingUI className={`${TABLE_CLASSNAME}__Loading`} />}

        {isTableCollapsable && isCollapsed ? (
          <Button
            className={`${TABLE_CLASSNAME}__Expander`}
            kind="link"
            onClick={() => {
              expandTable(data)
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
              collapseTable(data, maxRowsToDisplay)
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
  /** List of columns */
  columns: PropTypes.arrayOf(PropTypes.shape(columnShape)),
  /** The table wrapper width (if `tableWidth` is larger, the component scrolls horizontally) */
  containerWidth: PropTypes.string,
  /** List of Rows, which are objects */
  data: PropTypes.arrayOf(PropTypes.shape(dataShape)),
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** The text for the "expander" button when table is either collapsed or expanded */
  expanderText: PropTypes.any,
  /** Adds the 'is-loading' class to the component */
  isLoading: PropTypes.bool,
  /** Whether to use `ScrollLock` with `direction="x"` on the Table. */
  isScrollLocked: PropTypes.bool,
  /** When provided the Table will only show this number of rows and and expander to see the rest */
  maxRowsToDisplay: PropTypes.number,
  /** Callback when choosing a column to show/hide if `withColumnChooser` is enabled*/
  onColumnChoose: PropTypes.func,
  /** Callback when expending/collapsing the table */
  onExpand: PropTypes.func,
  /** Callback function when a row is clicked. Arguments are the event and the row clicked. */
  onRowClick: PropTypes.func,
  /** Callback when selecting a row if enabled */
  onSelectRow: PropTypes.func,
  /** Custom class names to be added to the each row based on a condition. */
  rowClassName: PropTypes.func,
  /** Gives you the ability to wrap rows based on conditions */
  rowWrapper: PropTypes.func,
  /** Custom class names to be added to the `<table>` element. */
  tableClassName: PropTypes.string,
  /** Description of the table contents for accessibility */
  tableDescription: PropTypes.string.isRequired,
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
  /** Customize which key from your data should be used for selection */
  selectionKey: PropTypes.string,
  /** When sortable, indicates which column tha table is sorted by, and in which order (ascending or descending) */
  sortedInfo: PropTypes.shape({
    columnKey: PropTypes.string,
    order: PropTypes.string,
  }),
  /** If passed the column chooser will be enabled, contains an array of all the possible columns and whether they are checked and enabled */
  withColumnChooser: PropTypes.bool,
  /** Adds tabindex=0 to each row*/
  withFocusableRows: PropTypes.bool,
  /** Adds a column with a checkbox for row selection */
  withSelectableRows: PropTypes.bool,
  /** Makes the rows 60px tall */
  withTallRows: PropTypes.bool,
}

export default Table
