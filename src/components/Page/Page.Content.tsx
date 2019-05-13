import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../PropProvider/propConnect'
import { classNames } from '../../utilities/classNames'
import { ContentUI } from './styles/Page.Content.css'
import { COMPONENT_KEY } from './Page.utils'
import { PageContentProps } from './Page.types'

export class Content extends React.PureComponent<PageContentProps> {
  static defaultProps = {
    isResponsive: false,
  }

  render() {
    const { children, className, isResponsive, ...rest } = this.props

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
}

export default propConnect(COMPONENT_KEY.Content)(Content)
