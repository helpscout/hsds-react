export type Sizes = 'xs' | 'sm' | 'md' | 'lg'

export type AccordionProps = {
  allowMultiple?: boolean
  children: any
  className?: string
  duration?: number
  isPage: boolean
  isSeamless: boolean
  isSortable: boolean
  onOpen: (uuid: string, openIds?: Array<any>) => void
  onClose: (uuid: string, openIds?: Array<any>) => void
  openSectionIds?: Array<any>
  size?: Sizes
}

export type AccordionState = {
  sections: Object
}

export type BodyProps = {
  children: Node
  className?: string
  duration?: number
  isOpen: boolean
  isPage: boolean
  isSeamless: boolean
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
  onOpen?: (uuid: string) => void
  onClose?: (uuid: string) => void
  sections: object
  setOpen: () => void
  size?: Sizes
  uuid: string
}

export type TitleProps = {
  children: Node
  className?: string
  href?: string
  isOpen: boolean
  isPage: boolean
  isSeamless: boolean
  isSortable: boolean
  onClick: (event: Event) => void
  onOpen?: (uuid: string) => void
  onClose?: (uuid: string) => void
  setOpen: (uuid: string, isOpen?: boolean) => void
  size?: Sizes
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
