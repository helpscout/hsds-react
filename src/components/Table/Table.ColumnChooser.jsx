import React from 'react'
import PropTypes from 'prop-types'
import useDeepCompareEffect from 'use-deep-compare-effect'
import classNames from 'classnames'
import { noop } from '../../utilities/other'
import DropList from '../DropList'
import { IconBtn } from '../DropList/DropList.togglers'

function createColumnChooserListItems(columns) {
  const items = columns.reduce((acc, currentCol) => {
    const group = currentCol.group || 'Other'
    currentCol.label = currentCol.title

    if (!acc.length) {
      acc.push({
        items: [currentCol],
        label: group,
        type: 'group',
      })
    } else {
      const idx = acc.findIndex(val => val.label === group)

      if (idx !== -1) {
        acc[idx].items.push(currentCol)
      } else {
        acc.push({
          type: 'divider',
        })
        acc.push({
          items: [currentCol],
          label: group,
          type: 'group',
        })
      }
    }
    return acc
  }, [])

  return items
}

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
