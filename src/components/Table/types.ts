export interface Theme {
  fontColorHeader?: string
  fontColorBody?: string
  fontColorAlternate?: string
  bgColor?: string
  bgAlternate?: string
  bgHeader?: string
  bgColorHover?: string
  borderTableBody?: string
  borderTableHeader?: string
  borderRows?: string
  borderColumns?: string
}

export interface Column {
  title: string
  columnKey: string | string[]
  width?: string
  align?: string
  renderCell?: (title: string | object) => React.ReactNode
  renderHeaderCell?: (name: Column, conf?: object) => React.ReactNode
  sortKey?: string
  sorter?: (columnKey) => void
}

export interface Data {
  id: string
  [key: string]: any
}

export interface SortedInfo {
  columnKey: string
  order: string
}

export interface TableWidth {
  min?: string
  max?: string
}

export interface TableProps {
  className?: string
  tableClassName?: string
  columns: Column[]
  data: Data[]
  maxRowsToDisplay?: number
  containerWidth?: string
  tableWidth?: TableWidth
  theme?: Theme
  isLoading?: boolean
  sortedInfo?: SortedInfo
  onRowClick?: (row: Data, event: Event) => void
  onExpand: (isTableCollapsed: boolean) => void
  tableRef: (node: HTMLElement) => void
  wrapperRef: (node: HTMLElement) => void
}

export interface TableState {
  isTableCollapsed?: boolean
}

export interface RowProps {
  columns: Column[]
  row: Data
  onRowClick?: (row: Data, event: Event) => void
}

export interface HeaderCellProps {
  column: Column
  isLoading?: boolean
  sortedInfo?: SortedInfo
}

export interface CellProps {
  column: Column
  row: Data
}
