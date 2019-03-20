export const COMPONENT_KEY = 'Table'

export function generateCellKey(element, column) {
  return Array.isArray(column.columnKey)
    ? `${element}_${column.sortKey}_${column.columnKey.join('_')}`
    : `${element}_${column.columnKey}`
}
