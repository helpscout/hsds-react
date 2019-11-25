export interface Skin {
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
  skin?: Skin
  isLoading: boolean
  isScrollLocked: boolean
  sortedInfo?: SortedInfo
  onRowClick?: (event: Event, row: Data) => void
  onExpand: (isTableCollapsed: boolean) => void
  tableRef: (node: HTMLElement) => void
  wrapperRef: (node: HTMLElement) => void
}

export interface TableState {
  isTableCollapsed?: boolean
}

export interface BodyProps {
  columns: Column[]
  isTableCollapsed?: boolean
  maxRowsToDisplay?: number
  rows: Data[]
  onRowClick?: (event: Event, row: Data) => void
}

export interface BodyState {
  rows: Data[]
}

export interface RowProps {
  columns: Column[]
  row: Data
  onRowClick?: (event: Event, row: Data) => void
}

export interface HeadProps {
  columns: Column[]
  isLoading?: boolean
  sortedInfo?: SortedInfo
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
