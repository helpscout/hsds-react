import React from 'react'
import { HeadingUI } from './styles/Accordion.css'

export default ({ children, ...rest }) => (
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
