import Body from './Body'
import { ChildrenArray, Element, Node } from 'react'
import Section from './Section'
import Title from './Title'

export type Sizes = 'xs' | 'sm' | 'md' | 'lg'

export type AccordionProps = {
  allowMultiple?: boolean,
  children: ChildrenArray<Element<typeof Section>>,
  className?: string,
  size?: Sizes
}

export type BodyProps = {
  children: Node,
  className?: string,
  isOpen: boolean,
  size?: Sizes,
  uuid: string,
}

export type SectionProps = {
  children: ChildrenArray<Element<typeof Title|Body>>,
  className?: string,
  sections: object,
  setOpen: () => void,
  size?: Sizes,
  uuid: string,
}

export type TitleProps = {
  children: Node,
  className?: string,
  isOpen: boolean,
  setOpen: () => void,
  size?: Sizes,
  uuid: string
}
