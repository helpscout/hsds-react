import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import Button from '../Button'

export const HeaderUI = styled('header')`
  display: flex;
  justify-content: space-between;

  &.with-column-chooser:not(.with-header-content) {
    justify-content: flex-end;
  }

  .DropListToggler {
    align-self: center;
    margin-right: 4px;
  }
`

export const TableWrapperUI = styled('div')`
  overflow-x: auto;
  transition: opacity 0.15s ease-in-out;
  width: ${props => props.containerWidth || '100%'};
  position: relative;

  .DropList {
    width: 300px;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
  }

  .DropList__MenuList {
    max-height: 400px;
  }

  .is-type-action {
    height: 50px;
    margin: 0 5px;
    padding: 0 15px;
    line-height: 50px;
    color: ${getColor('charcoal.300')};

    &.is-highlighted,
    &:hover {
      color: ${getColor('charcoal.300')};
      text-decoration: underline;
      cursor: pointer;
      background-color: transparent;
    }
  }
`

export const LoadingUI = styled('div')`
  position: absolute;
  transition: opacity 0.15s ease-in-out;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.5;
  background: #fff;
`

export const TableUI = styled('table')`
  ${props => generateTableWidthStyles(props.tableWidth)};
  border-spacing: 0;
  table-layout: fixed;
  line-height: 16px;
  border-collapse: separate;

  tr {
    transition: background-color 100ms ease-in-out;
  }

  tbody tr:focus {
    background-color: ${props => props.theme.bgFocus};
    box-shadow: inset 3px 0 ${props => props.theme.bgFocusIndicator};
    outline: 0;
  }

  th,
  td {
    /* Borders: Rows */
    border-bottom: ${props => props.theme.borderRows};
    /* Borders: Columns */
    border-right: ${props => props.theme.borderColumns};
  }

  th {
    padding: 0 14px;
    height: ${props => props.theme.headerRowHeight};
    color: ${props => props.theme.fontColorHeader};
  }

  td {
    padding: 5px 14px;
    height: ${props => (props.withTallRows ? '60px' : '50px')};
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
    border-top-left-radius: 4px;
  }

  tbody tr:first-child td:first-child {
    border-top-left-radius: ${props =>
      props.theme.borderTableHeader == null ||
      props.theme.borderTableHeader === 'none'
        ? '3px'
        : '0'};
  }
  thead tr th:last-child {
    border-top-right-radius: 4px;
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
    border-bottom-left-radius: 4px;
  }

  thead tr th:last-child {
    border-bottom-right-radius: 0;
  }

  tbody tr:last-child td:last-child {
    border-bottom-right-radius: 4px;
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

  tr:nth-child(2n + 1) {
    background-color: ${props => props.theme.bgColor};
  }

  tr:nth-child(2n) {
    background-color: ${props => props.theme.bgAlternate};
    color: ${props => props.theme.fontColorAlternate};
  }

  tr.is-row-selected {
    background-color: ${props => props.theme.bgSelected};
  }

  &.with-clickable-rows {
    tbody tr:hover {
      background-color: ${props => props.theme.bgColorHover};
      cursor: pointer;
    }
  }
  &.selection-enabled {
    tbody tr:hover {
      background-color: ${props => props.theme.bgSelectedHover};
      cursor: pointer;
    }
  }
`

export const HeaderCellUI = styled('th')`
  text-align: ${props => props.align || 'left'};
  width: ${props => props.cellWidth || 'auto'};
  font-size: 13px;
  font-weight: 500;
`

export const CellUI = styled('td')`
  text-align: ${props => props.align || 'left'};
`

export const SortableCellUI = styled('div')`
  .is-iconName-caret-down,
  .is-iconName-caret-up {
    margin-left: 4px;
    margin-right: -2px;
  }

  .column-title-as-icon + .is-iconName-caret-down,
  .column-title-as-icon + .is-iconName-caret-up {
    margin-left: 0;
    margin-right: -2px;
  }

  .column-title-as-icon {
    margin-left: -2px;
    margin-top: -4px;
    margin-bottom: -4px;
  }
`

export const SortableCellContentUI = styled('div')`
  display: inline-flex;
  align-items: center;
  justify-content: ${props => getCellAlignment(props.align)};
  padding: 6px 8px;
  margin-left: -8px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;

  &:hover,
  .sorted & {
    color: ${getColor('charcoal.700')};
    background-color: ${getColor('grey.300')};
  }
`

export const ButtonExpanderUI = styled(Button)`
  &.is-md {
    --buttonHeight: 26px;
    height: 26px;
    margin: 8px 0 8px 14px;
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
