import React, { useContext } from 'react'
import { classNames } from '../../utilities/classNames'
import { SectionUI } from './Page.css'
import { PageContext } from './Page'

export const Section = ({ children, className }) => {
  const { isResponsive } = useContext(PageContext)

  const componentClassName = classNames(
    'c-PageSection',
    isResponsive && 'is-responsive',
    className
  )

  return <SectionUI className={componentClassName}>{children}</SectionUI>
}
Section.displayName = 'Page.Section'

export default Section
