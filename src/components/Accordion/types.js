import Body from './Body'
import { ChildrenArray, Element, Node } from 'react'
import Section from './Section'
import Title from './Title'

export type Sizes = 'xs' | 'sm' | 'md' | 'lg'

export type AccordionProps = {
  allowMultiple?: boolean,
  children: ChildrenArray<Element<typeof Section>>,
  className?: string,
  isSeamless?: boolean,
  size?: Sizes
}

export type BodyProps = {
  children: Node,
  className?: string,
  isOpen: boolean,
  isSeamless?: boolean,
  size?: Sizes,
  uuid: string,
}

export type SectionProps = {
  children: ChildrenArray<Element<typeof Title|Body>>,
  className?: string,
  isSeamless?: boolean,
  sections: object,
  setOpen: () => void,
  size?: Sizes,
  uuid: string,
}

export type TitleProps = {
  children: Node,
  className?: string,
  isOpen: boolean,
  isSeamless?: boolean,
  setOpen: () => void,
  size?: Sizes,
  uuid: string
}
