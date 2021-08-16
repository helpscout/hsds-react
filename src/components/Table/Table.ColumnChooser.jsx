import React from 'react'
import PropTypes from 'prop-types'
import { noop } from '../../utilities/other'
import DropList from '../DropList'
import { IconBtn } from '../DropList/DropList.togglers'
import { createColumnChooserListItems } from './Table.utils'

function ColumnChooser({ defaultColumns, columns, updateColumns = noop }) {
  const items = createColumnChooserListItems(columns)

  return (
    <DropList
      isMenuOpen
      closeOnBlur={false}
      closeOnSelection={false}
      items={items}
      toggler={
        <IconBtn
          a11yLabel="Choose columns to show or hide"
          iconName="column-check"
          iconSize={24}
          withCaret={false}
        />
      }
      onSelect={(selection, clickedItem) => {
        if (clickedItem.type === 'reset_droplist') {
          updateColumns(defaultColumns)
        } else {
          updateColumns(
            columns.map(column => {
              const newColumn = { ...column }

              if (newColumn.title === clickedItem.label) {
                newColumn.show = !clickedItem.remove
              }

              return newColumn
            })
          )
        }
      }}
      selection={columns.filter(column => column.show)}
      withMultipleSelection
      withResetSelectionItem="Reset to defaults"
    />
  )
}

export default ColumnChooser
