export type Placements =
  | 'auto-start'
  | 'auto'
  | 'auto-end'
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'right-start'
  | 'right'
  | 'right-end'
  | 'bottom-end'
  | 'bottom'
  | 'bottom-start'
  | 'left-end'
  | 'left'
  | 'left-start'

export type PopProps = {
  animationDelay: number | string,
  animationDuration: number | string,
  animationEasing: string,
  animationSequence: string | Array<string>,
  arrowClassName: string,
  children?: any,
  className?: string,
  closeOnBodyClick: boolean,
  closeOnEscPress: boolean,
  display: string,
  id?: string,
  isOpen: boolean,
  onClose: (Pop: Object) => void,
  onOpen: (Pop: Object) => void,
  placement: Placements,
  triggerOn: 'click' | 'hover',
  showArrow: boolean,
  zIndex?: number,
}

export type PopperStyles = {
  arrowSize: string,
  offset: string,
  placement: Placement,
  style: Object
}