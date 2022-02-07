import React from 'react'
import PropTypes from 'prop-types'
import equal from 'fast-deep-equal'
import DropList from '../DropList'
import { IconBtn } from '../DropList/DropList.togglers'
import { columnShape, createColumnChooserListItems } from './Table.utils'

const noop = () => undefined
const shouldColumnShow = column => !!column.show

function ColumnChooser({
  columns,
  defaultColumns,
  columnChooserResetLabel,
  onColumnChoose = noop,
  resetColumns = noop,
  updateColumns = noop,
}) {
  const items = createColumnChooserListItems(columns, columnChooserResetLabel)

  return (
    <DropList
      autoSetComboboxAt={10}
      items={items}
      onSelect={(selection, clickedItem) => {
        if (clickedItem.type === 'action' && clickedItem.action === 'RESET') {
          if (!equal(columns, defaultColumns)) {
            resetColumns(defaultColumns)
          }
          onColumnChoose(clickedItem, defaultColumns.filter(shouldColumnShow))
        } else {
          updateColumns(columns, clickedItem)
          onColumnChoose(clickedItem, selection)
        }
      }}
      selection={columns.filter(shouldColumnShow)}
      toggler={
        <IconBtn
          a11yLabel="Choose columns to show or hide"
          iconName="column-check"
          size="lg"
        />
      }
      withMultipleSelection
    />
  )
}

ColumnChooser.propTypes = {
  /** List of currently shown columns */
  columns: PropTypes.arrayOf(PropTypes.shape(columnShape)),
  /** List of the default shown columns */
  defaultColumns: PropTypes.arrayOf(PropTypes.shape(columnShape)),
  /** Callback that fires when showing/hiding a column, signature: (clickedItem, currentSelection) */
  onColumnChoose: PropTypes.func,
  /** Fires resetting columns action */
  resetColumns: PropTypes.func,
  /** Fires updating columns action */
  updateColumns: PropTypes.func,
}

export default ColumnChooser
