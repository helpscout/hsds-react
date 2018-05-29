// @flow

type Placements =
'auto-start' |
'auto' |
'auto-end' |
'top-start' |
'top' |
'top-end' |
'right-start' |
'right' |
'right-end' |
'bottom-end' |
'bottom' |
'bottom-start' |
'left-end' |
'left' |
'left-start'

type SimplePlacements =
'auto' |
'top' |
'right' |
'bottom' |
'left' |

// prettier-ignore
export type Props = {
  animationDelay: number | string,
  animationDuration: number | string,
  animationEasing: string,
  animationSequence: string | Array<string>,
  arrowClassName: string,
  closeOnBodyClick: boolean,
  closeOnEscPress: boolean,
  display: string,
  isOpen: boolean,
  placement: Placements,
  renderContent: () => void,
  triggerOn: 'click' | 'hover',
  showArrow: boolean
}
