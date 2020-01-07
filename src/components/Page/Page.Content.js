import React, { useContext } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { ContentUI } from './styles/Page.Content.css'
import { PageContext } from './Page'

export const Content = ({ children, className, ...rest }) => {
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

Content.displayName = 'Page.Content'

export default Content
