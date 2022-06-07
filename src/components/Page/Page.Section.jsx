import React, { useContext } from 'react'
import { getValidProps } from '@hsds/utils-react'
import classNames from 'classnames'
import { SectionUI } from './Page.css'
import { PageContext } from './Page'

export const PageSection = ({ children, className, ...rest }) => {
  const { isResponsive } = useContext(PageContext)
  const componentClassName = classNames(
    'c-PageSection',
    isResponsive && 'is-responsive',
    className
  )

  return (
    <SectionUI {...getValidProps(rest)} className={componentClassName}>
      {children}
    </SectionUI>
  )
}

PageSection.defaultProps = {
  'data-cy': 'PageSection',
}

export default PageSection
