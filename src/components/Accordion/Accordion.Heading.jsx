import React from 'react'
import { HeadingUI } from './Accordion.css'

const Heading = ({ children }) => (
  <HeadingUI truncate weight={500} size={14} className="c-Accordion__Heading">
    {children}
  </HeadingUI>
)

Heading.displayName = 'AccordionHeading'
Heading.defaultProps = {
  'data-cy': Heading.displayName,
}

export default Heading
