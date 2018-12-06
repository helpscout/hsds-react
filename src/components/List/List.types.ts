export interface ListGenericProps {
  className?: string
  children?: any
  inlineSize: 'md' | 'sm' | 'xs'
  role: string
  size: 'lg' | 'md' | 'sm' | 'xs' | null
  type: 'bullet' | 'inline' | 'number' | null
}

export type ListBorder = 'line' | 'dot' | null
