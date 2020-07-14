import React from 'react'
import PropTypes from 'prop-types'
import AccordionSection from './Accordion.Section'
import AccordionTitle from './Accordion.Title'
import { renderChildrenSafely } from '../../utilities/component'

// Higher-order wrapper to render an enhanced Accordion.Section and Accordion.Title
export const AccordionLink = props => {
  const { badge, children, href, isCompact, status, title, to, ...rest } = props

  const isLink = !!(to || href)
  const isOpen = false
  const sectionProps = {
    ...rest,
    children,
    isOpen,
    isLink,
    status,
    title,
  }
  const titleProps = {
    badge,
    href,
    isCompact,
    isOpen,
    status,
    title,
    to,
  }

  return (
    <AccordionSection {...sectionProps}>
      <AccordionTitle {...titleProps}>
        {renderChildrenSafely(children)}
      </AccordionTitle>
    </AccordionSection>
  )
}

AccordionLink.defaultProps = {
  'data-cy': 'AccordionLink',
}

AccordionLink.propTypes = {
  /** Content to render. */
  children: PropTypes.any,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Renders a `Link` with an href. */
  href: PropTypes.string,
  /** Renders a routable `Link` with an href. */
  to: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default AccordionLink
