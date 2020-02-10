import { CollapsibleProps } from '../Collapsible/Collapsible.types'
import { UIStatus } from '../../constants/types'

export type themeTypes = 'light' | 'bold'

export interface StatusBarProps extends CollapsibleProps {
  closeOnClick: boolean
  status: UIStatus
  theme: themeTypes
  onClick: (...args: any[]) => void
}

export interface StatusBarState {
  isOpen: boolean
}
