import React from 'react'
import Section from './Accordion.Section'
import Title from './Accordion.Title'
import { renderChildrenSafely } from '../../utilities/component'

// Higher-order wrapper to render an enhanced Accordion.Section and Accordion.Title
export const Link = props => {
  const { children, to, href, title, ...rest } = props

  const isLink = !!(to || href)
  const isOpen = false

  const sectionProps = {
    ...rest,
    children,
    isOpen,
    isLink,
    title,
  }

  const titleProps = {
    to,
    href,
    isOpen,
    title,
  }

  return (
    <Section {...sectionProps}>
      <Title {...titleProps}>{renderChildrenSafely(children)}</Title>
    </Section>
  )
}

Link.displayName = 'AccordionLink'

export default Link
