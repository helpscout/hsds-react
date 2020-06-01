import React from 'react'
import { HeadingUI } from './Accordion.css'

export default ({ children }) => (
  <HeadingUI truncate weight={500} size={14} className="Accordion__Heading">
    {children}
  </HeadingUI>
)
