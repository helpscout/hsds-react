import Body from './Body'
import { ChildrenArray, Element, Node } from 'react'
import Section from './Section'
import Title from './Title'

export type Sizes = 'xs' | 'sm' | 'md' | 'lg'

export type AccordionProps = {
  allowMultiple?: boolean,
  children: ChildrenArray<Element<typeof Section>>,
  className?: string,
  isPage?: boolean,
  isSeamless?: boolean,
  onOpen?: (uuid: string) => void,
  onClose?: (uuid: string) => void,
  size?: Sizes
}

export type AccordionState = {
  sections: Object,
}

export type BodyProps = {
  children: Node,
  className?: string,
  isOpen: boolean,
  isPage?: boolean,
  isSeamless?: boolean,
  onOpen: (uuid: string) => void,
  onClose: (uuid: string) => void,
  size?: Sizes,
  uuid: string,
}

export type SectionProps = {
  children: ChildrenArray<Element<typeof Title|Body>>,
  className?: string,
  isPage?: boolean,
  isSeamless?: boolean,
  onOpen?: (uuid: string) => void,
  onClose?: (uuid: string) => void,
  sections: object,
  setOpen: () => void,
  size?: Sizes,
  uuid: string,
}

export type TitleProps = {
  children: Node,
  className?: string,
  isOpen: boolean,
  isPage?: boolean,
  isSeamless?: boolean,
  setOpen: () => void,
  size?: Sizes,
  uuid: string
}

export type WithUuidProps = {}
export type WithUuidState = {
  uuid: string
}