import React from 'react'
import { SubheadingUI } from './styles/Accordion.css'

export default ({ children, ...rest }) => (
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
