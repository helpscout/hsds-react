import React from 'react'
import { HeadingUI } from './Accordion.css'

const AccordionHeading = ({ children, ...rest }) => (
  <HeadingUI
    truncate
    weight={500}
    size={14}
    className="c-Accordion__Heading"
    {...rest}
  >
    {children}
  </HeadingUI>
)

AccordionHeading.defaultProps = {
  'data-cy': 'AccordionHeading',
}

export default AccordionHeading
