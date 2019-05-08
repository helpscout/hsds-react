export type ColSize = 'md' | 'sm' | 'xs'

export interface GridColProps {
  className?: string
  children?: any
  size?: ColSize
}

export type ContainerSize = 'md' | 'sm' | 'xs'

export interface GridContainerProps {
  className?: string
  children?: any
  fluid: boolean // deprecating
  responsive: boolean // deprecating
  isFluid: boolean
  isResponsive: boolean
  size?: ContainerSize
}

export type RowSize = 'md' | 'sm' | 'xs'
export interface GridRowProps {
  className?: string
  children?: any
  flex: boolean // deprecating
  isFlex: boolean
  size?: RowSize
}
