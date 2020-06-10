import React from 'react'
import { SubheadingUI } from './Accordion.css'

const Subheading = ({ children }) => (
  <SubheadingUI
    truncate
    weight={400}
    size={13}
    className="c-Accordion__Subheading"
  >
    {children}
  </SubheadingUI>
)

Subheading.displayName = 'AccordionSubheading'
Subheading.defaultProps = {
  'data-cy': Subheading.displayName,
}

export default Subheading
