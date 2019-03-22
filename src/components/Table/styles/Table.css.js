import baseStyles from '../../../styles/resets/baseStyles.css.js'
import styled from '../../styled'
import { getColor } from '../../../styles/utilities/color'

export const TableWrapperUI = styled('div')`
  ${baseStyles} overflow-x: auto;
  transition: opacity 0.15s ease-in-out;
  width: ${props => props.containerWidth || '100%'};
  padding-bottom: 15px;
  opacity: ${props => (props.isLoading ? '0.5' : '1.0')};
`

export const TableUI = styled('table')`
  ${baseStyles} ${props =>
    generateTableWidthStyles(props.tableWidth)} border-spacing: 0;
  table-layout: fixed;
  line-height: 16px;

  th,
  td {
    /* Borders: Rows */
    border-bottom: ${props => props.theme.borderRows};
    /* Borders: Columns */
    border-right: ${props => props.theme.borderColumns};
  }

  th {
    padding: 8px 14px;
    height: 24px;
    color: ${props => props.theme.fontColorHeader};
  }

  td {
    padding: 5px 14px;
    height: 48px;
    color: ${props => props.theme.fontColorBody};
  }

  /* Borders: table header */
  thead tr th:first-child {
    border-left: ${props => props.theme.borderTableHeader};
  }
  thead tr th:last-child {
    border-right: ${props => props.theme.borderTableHeader};
  }
  thead tr:first-child th {
    border-top: ${props => props.theme.borderTableHeader};
  }
  thead tr:last-child th {
    border-bottom: ${props => props.theme.borderTableHeader};
  }

  /* Border radius */
  thead tr th:first-child {
    border-top-left-radius: 3px;
  }

  tbody tr:first-child td:first-child {
    border-top-left-radius: ${props =>
      props.theme.borderTableHeader == null ||
      props.theme.borderTableHeader === 'none'
        ? '3px'
        : '0'};
  }
  thead tr th:last-child {
    border-top-right-radius: 3px;
  }

  tbody tr:first-child td:last-child {
    border-top-right-radius: ${props =>
      props.theme.borderTableHeader == null ||
      props.theme.borderTableHeader === 'none'
        ? '3px'
        : '0'};
  }

  thead tr th:first-child {
    border-bottom-left-radius: 0;
  }

  tbody tr:last-child td:first-child {
    border-bottom-left-radius: 3px;
  }

  thead tr th:last-child {
    border-bottom-right-radius: 0;
  }

  tbody tr:last-child td:last-child {
    border-bottom-right-radius: 3px;
  }

  /* Borders: table body */
  tbody tr td:first-child {
    border-left: ${props => props.theme.borderTableBody};
  }

  tbody tr td:last-of-type {
    border-right: ${props => props.theme.borderTableBody};
  }

  tbody tr:first-child td {
    border-top: ${props =>
      props.theme.borderTableHeader == null ||
      props.theme.borderTableHeader === 'none'
        ? props.theme.borderTableBody
        : '0'};
  }

  tbody tr:last-child td {
    border-bottom: ${props => props.theme.borderTableBody};
  }

  /* Background */
  th {
    background-color: ${props => props.theme.bgHeader};
  }

  tr:nth-child(2n + 1) td {
    background-color: ${props => props.theme.bgColor};
  }

  tr:nth-child(2n) td {
    background-color: ${props => props.theme.bgAlternate};
    color: ${props => props.theme.fontColorAlternate};
  }

  &.with-clickable-rows {
    tr {
      &:hover {
        td {
          background-color: ${props => props.theme.bgColorHover};
          cursor: pointer;
        }
      }
    }
  }
`

export const HeaderCellUI = styled('th')`
  ${baseStyles}
  text-align: ${props => props.align || 'left'};
  width: ${props => props.cellWidth || 'auto'};
`

export const CellUI = styled('td')`
  ${baseStyles}
  text-align: ${props => props.align || 'left'};
`

export const SortableCellUI = styled('div')`
  display: flex;
  align-items: center;
  justify-content: ${props => getCellAlignment(props.align)};
  cursor: pointer;

  .SortableCell_title {
    margin: -2px 5px 0 0;
  }

  &:hover {
    .SortableCell_title {
      opacity: 0.8;
    }
  }
`

function generateTableWidthStyles(tableWidth) {
  let style = 'width: 100%;'

  if (tableWidth) {
    style = tableWidth.min ? `${style} min-width: ${tableWidth.min};` : style
    style = tableWidth.max
      ? `${style} max-width: ${tableWidth.max};`
      : `${style} max-width: 100%;`
  }

  return style
}

function getCellAlignment(align) {
  if (!align || align === 'left') return 'flex-start'
  if (align === 'center') return 'center'
  if (align === 'right') return 'flex-end'
}
