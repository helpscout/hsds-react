import * as React from 'react'
import Section from './Accordion.Section'
import Title from './Accordion.Title'

const Link = props => {
  const { children, isSeamless: isSeamlessProp, to, href, ...rest } = props
  const isLink = to || href
  const isSeamless = isLink ? false : isSeamlessProp
  const isOpen = false

  const sectionProps = {
    ...rest,
    children,
    isOpen,
    isSeamless,
    isLink,
  }

  const titleProps = {
    children,
    to,
    href,
    isOpen,
  }

  return (
    <Section {...sectionProps}>
      <Title {...titleProps} />
    </Section>
  )
}

export default Link
