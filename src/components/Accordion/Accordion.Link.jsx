import React from 'react'
import PropTypes from 'prop-types'
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
Link.propTypes = {
  /** Content to render. */
  children: PropTypes.any,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Renders a `Link` with an href. */
  href: PropTypes.string,
  /** Renders a routable `Link` with an href. */
  to: PropTypes.string,
}
export default Link
