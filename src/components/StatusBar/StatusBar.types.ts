import { CollapsibleProps } from '../Collapsible/Collapsible.types'
import { statusTypes } from '../../constants/types'

export type themeTypes = 'light' | 'bold'

export interface StatusBarProps extends CollapsibleProps {
  closeOnClick: boolean
  status: statusTypes
  theme: themeTypes
  onClick: (...args: any[]) => void
}

export interface StatusBarState {
  isOpen: boolean
}
