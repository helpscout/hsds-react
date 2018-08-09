// @flow
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import styled from '../styled'
import css from './styles/Card.css.js'

type Props = {
  children?: any,
  className?: string,
}

class Card extends Component<Props> {
  static displayName = 'Page.Card'

  render() {
    const { children, className, ...rest } = this.props

    const componentClassName = classNames('c-PageCard', className)

    return (
      <div className={componentClassName} {...getValidProps(rest)}>
        {children}
      </div>
    )
  }
}

export default styled(Card)(css)
