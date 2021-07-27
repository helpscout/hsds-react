import React, { useContext } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from 'classnames'
import { ContentUI } from './Page.css'
import { PageContext } from './Page'

export const PageContent = ({ children, className, ...rest }) => {
  const { isResponsive } = useContext(PageContext)

  const componentClassName = classNames(
    'c-PageContent',
    isResponsive && 'is-responsive',
    className
  )

  return (
    <ContentUI {...getValidProps(rest)} className={componentClassName}>
      {children}
    </ContentUI>
  )
}

PageContent.defaultProps = {
  'data-cy': 'PageContent',
}

export default PageContent
