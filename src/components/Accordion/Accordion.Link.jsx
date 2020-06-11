import React from 'react'
import AccordionSection from './Accordion.Section'
import AccordionTitle from './Accordion.Title'
import { renderChildrenSafely } from '../../utilities/component'

// Higher-order wrapper to render an enhanced Accordion.Section and Accordion.Title
export const AccordionLink = props => {
  const { badge, children, href, status, title, to, ...rest } = props
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

export default AccordionLink
