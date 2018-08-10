// @flow
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { CardUI } from './styles/Card.css.js'

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
      <CardUI className={componentClassName} {...getValidProps(rest)}>
        {children}
      </CardUI>
    )
  }
}

export default Card
