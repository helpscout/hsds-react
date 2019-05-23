import { TextShade, UIState } from '../../constants/types'

export type IconSize =
  | '8'
  | '10'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16'
  | '18'
  | '20'
  | '24'
  | '32'
  | '48'
  | '52'

export interface IconProps {
  center: boolean
  className?: string
  clickable: boolean
  ignoreClick: boolean
  faint?: boolean
  inline?: boolean
  isWithHiddenTitle: boolean
  muted?: boolean
  name: string
  onClick: () => void
  offsetLeft: boolean
  offsetRight: boolean
  shade?: TextShade
  state?: UIState
  size: IconSize
  subtle?: boolean
  title?: string
  withCaret: boolean
}
