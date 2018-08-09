// @flow
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import styled from '../styled'
import css from './styles/Page.css.js'

type Props = {
  children?: any,
  className?: string,
}

class Page extends Component<Props> {
  static displayName = 'Page'

  render() {
    const { children, className, ...rest } = this.props

    const componentClassName = classNames('c-Page', className)

    return (
      <div className={componentClassName} {...getValidProps(rest)}>
        {children}
      </div>
    )
  }
}

export default styled(Page)(css)
