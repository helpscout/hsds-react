import { createUniqueIDFactory } from '../../utilities/id'

export const COMPONENT_KEY = 'Table'
const uniqueCellKeyFactory = createUniqueIDFactory('Cell')

export function generateCellKey(element, column) {
  return Array.isArray(column.columnKey)
    ? `${uniqueCellKeyFactory(element)}_${
        column.sortKey
      }_${column.columnKey.join('_')}`
    : `${uniqueCellKeyFactory(element)}_${column.columnKey}`
}
