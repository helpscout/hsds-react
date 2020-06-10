export type Sizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type AccordionProps = {
  allowMultiple?: boolean
  children: any
  className?: string
  distance: number
  duration?: number
  isPage: boolean
  isSeamless: boolean
  isSortable?: boolean
  onOpen: (uuid: string, openIds?: Array<any>) => void
  onClose: (uuid: string, openIds?: Array<any>) => void
  onSortEnd: (...args: any[]) => void
  openSectionIds?: Array<any>
  pressDelay: number
  size?: Sizes
  useWindowAsScrollContainer?: boolean
}

export type AccordionState = {
  isSorting: boolean
  sections: Object
}

export type BodyProps = {
  children: Node
  className?: string
  duration?: number
  isOpen: boolean
  isPage: boolean
  isSeamless: boolean
  isSorting: boolean
  onOpen: (uuid: string) => void
  onClose: (uuid: string) => void
  size?: Sizes
  uuid: string
}

export type SectionProps = {
  children: any
  className?: string
  duration?: number
  id?: string
  isLink: boolean
  isPage: boolean
  isOpen: boolean
  isSeamless: boolean
  isSortable: boolean
  isSorting: boolean
  onOpen?: (uuid: string) => void
  onClose?: (uuid: string) => void
  sections: object
  setOpen: () => void
  size?: Sizes
  status?: string
  uuid: string
}

export type TitleProps = {
  badge?: string
  children: Node
  className?: string
  href?: string
  isCompact: boolean
  isOpen: boolean
  isPage: boolean
  isSeamless: boolean
  isSortable: boolean
  isSorting: boolean
  onClick: (event: Event) => void
  onOpen?: (uuid: string) => void
  onClose?: (uuid: string) => void
  setOpen: (uuid: string, isOpen?: boolean) => void
  size?: Sizes
  status?: string
  to?: string
  uuid: string
}

export type TitleState = {
  isSorting: boolean
}

export type WithUuidProps = {}
export type WithUuidState = {
  uuid: string
}
