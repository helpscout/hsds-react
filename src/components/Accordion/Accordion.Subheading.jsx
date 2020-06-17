import React from 'react'
import { SubheadingUI } from './Accordion.css'

const AccordionSubheading = ({ children, ...rest }) => (
  <SubheadingUI
    truncate
    weight={400}
    size={13}
    className="c-Accordion__Subheading"
    {...rest}
  >
    {children}
  </SubheadingUI>
)

AccordionSubheading.defaultProps = {
  'data-cy': 'AccordionSubheading',
}

export default AccordionSubheading
