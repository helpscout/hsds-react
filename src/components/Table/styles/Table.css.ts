import baseStyles from '../../../styles/resets/baseStyles.css.js'
import styled from '../../styled'

export const TableWrapperUI = styled('div')`
  ${baseStyles} overflow-x: auto;
  width: 100%;
  transition: opacity 0.15s ease-in-out;
  ${({ loadingData }) => loadingData && 'opacity: 0.5;'};
`

export const TableUI = styled('table')`
  ${baseStyles} border-spacing: 0;
  width: 100%;
  table-layout: fixed;

  ${({ tableWidth }) => generateTableWidthStyles(tableWidth)}
  
  th,
  td {
    padding: 5px;
    /* Borders: Rows */
    ${({ border }) => border.rows && `border-bottom: ${border.rows};`}

    /* Borders: Columns */
    ${({ border }) => border.columns && `border-right: ${border.columns}`}
  }

  /* Borders: table header */
  thead tr th:first-child {
    ${({ border }) =>
      border.tableHeader && `border-left: ${border.tableHeader};`}
  }
  thead tr th:last-child {
    ${({ border }) =>
      border.tableHeader && `border-right: ${border.tableHeader};`}
  }
  thead tr:first-child th {
    ${({ border }) =>
      border.tableHeader && `border-top: ${border.tableHeader};`}
  }
  thead tr:last-child th {
    ${({ border }) =>
      border.tableHeader && `border-bottom: ${border.tableHeader};`}
  }

  /* Border radius */
  thead tr th:first-child,
  tbody tr:first-child td:first-child {
    border-top-left-radius: 3px;
  }
  thead tr th:last-child,
  tbody tr:first-child td:last-child {
    border-top-right-radius: 3px;
  }
  thead tr th:first-child,
  tbody tr:last-child td:first-child {
    border-bottom-left-radius: 3px;
  }
  thead tr th:last-child,
  tbody tr:last-child td:last-child {
    border-bottom-right-radius: 3px;
  }

  /* Borders: table body */
  tbody tr td:first-child {
    ${({ border }) => border.tableBody && `border-left: ${border.tableBody};`}
  }
  tbody tr td:last-of-type {
    ${({ border }) => border.tableBody && `border-right: ${border.tableBody};`}
  }
  tbody tr:first-child td {
    ${({ border }) => border.tableBody && `border-top: ${border.tableBody};`}
  }
  tbody tr:last-child td {
    ${({ border }) => border.tableBody && `border-bottom: ${border.tableBody};`}
  }

  /* Background */
  tr:nth-child(2n) td {
    ${({ background }) =>
      background && background[0] && `background-color: ${background[0]}`}
  }

  tr:nth-child(2n + 1) td {
    ${({ background }) =>
      background && background[1] && `background-color: ${background[1]}`}
  }
`

export const HeaderCellUI = styled('th')`
  ${baseStyles} ${({ align }) => `text-align: ${align || 'left'}`};
`

export const CellUI = styled('td')`
  ${baseStyles} ${({ align }) => `text-align: ${align || 'left'}`};
`

function generateTableWidthStyles(tableWidth) {
  let style = ''
  if (tableWidth) {
    style = tableWidth.min ? `${style} min-width: ${tableWidth.min};` : style
    style = tableWidth.max
      ? `${style} max-width: ${tableWidth.max};`
      : `${style} max-width: 100%;`
  }

  return style
}
