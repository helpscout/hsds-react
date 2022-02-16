import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { createUniqueIDFactory } from '../../utilities/id'
import isArray from 'lodash.isarray'
import isFunction from 'lodash.isfunction'
import isPlainObject from 'lodash.isplainobject'
import { TABLE_CLASSNAME } from './Table'
import Icon from '../Icon'

const uniqueCellKeyFactory = createUniqueIDFactory('Cell')
const renderHeaderCellObjectShape = {
  iconName: PropTypes.string,
}

export const columnShape = {
  title: PropTypes.string,
  columnKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  width: PropTypes.string,
  align: PropTypes.string,
  renderCell: PropTypes.func,
  renderHeaderCell: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape(renderHeaderCellObjectShape),
  ]),
  sortKey: PropTypes.string,
  sorter: PropTypes.func,
  show: PropTypes.bool,
  default: PropTypes.bool,
}

export const dataShape = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  key: PropTypes.any,
}

export function generateCellKey(element, column) {
  return isArray(column.columnKey)
    ? `${uniqueCellKeyFactory(element)}_${
        column.sortKey
      }_${column.columnKey.join('_')}`
    : `${uniqueCellKeyFactory(element)}_${column.columnKey}`
}

export function generateCellClassNames(column, cellType = 'Cell') {
  return classNames(
    `${TABLE_CLASSNAME}__${cellType}`,
    `Column_${
      column.title
        ? column.title.replace(/[ .]/g, '')
        : isArray(column.columnKey)
        ? column.columnKey.join('_').replace(/\./g, '_')
        : column.columnKey.replace(/\./g, '_')
    }`,
    column.className || ''
  )
}

export function getDisplayTableData({ data, rowsToDisplay }) {
  if (rowsToDisplay != null && rowsToDisplay < data.length) {
    return data.slice(0, rowsToDisplay)
  }

  return data
}

export function createColumnChooserListItems(columns, columnChooserResetLabel) {
  const items = columns.reduce((acc, currentCol) => {
    const group = currentCol.group || 'Other'
    currentCol.label = currentCol.title

    if (currentCol.disabledForChoosing) {
      currentCol.isDisabled = true
    }

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

  return items.concat([
    {
      type: 'divider',
    },
    {
      label: columnChooserResetLabel || 'Reset to defaults',
      type: 'action',
      action: 'RESET',
    },
  ])
}

export function isTableSortable(columns) {
  return isArray(columns) && columns.find(column => Boolean(column.sorter))
}

export function generateCustomHeaderCell(column, sortedInfo) {
  if (isFunction(column.renderHeaderCell)) {
    return column.renderHeaderCell(column, sortedInfo)
  }

  if (isPlainObject(column.renderHeaderCell)) {
    const { iconName } = column.renderHeaderCell

    return iconName ? (
      <Icon
        className="column-title-as-icon"
        name={iconName}
        size={24}
        title={column.title}
        ignoreClick={false}
      />
    ) : (
      'Please pass iconName'
    )
  }

  return null
}
