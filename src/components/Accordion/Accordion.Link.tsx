import * as React from 'react'
import Section from './Accordion.Section'
import Title from './Accordion.Title'
import { renderChildrenSafely } from '../../utilities/component'

// Higher-order wrapper to render an enhanced Accordion.Section and
// Accordion.Title
export const Link = props => {
  const {
    badge,
    children,
    isCompact,
    isSeamless: isSeamlessProp,
    to,
    href,
    status,
    title,
    ...rest
  } = props
  const isLink = !!(to || href)
  const isSeamless = isLink ? false : isSeamlessProp
  const isOpen = false

  const sectionProps = {
    ...rest,
    children,
    isOpen,
    isSeamless,
    isLink,
    status,
    title,
  }

  const titleProps = {
    badge,
    to,
    href,
    isCompact,
    isOpen,
    status,
    title,
  }

  return (
    <Section {...sectionProps}>
      <Title {...titleProps}>{renderChildrenSafely(children)}</Title>
    </Section>
  )
}

export default Link
