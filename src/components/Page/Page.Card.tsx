import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { CardUI } from './styles/Page.Card.css'
import { PageCardProps } from './Page.types'

export class Card extends React.PureComponent<PageCardProps> {
  static displayName = 'Page.Card'
  render() {
    const { children, className, ...rest } = this.props

    const componentClassName = classNames('c-PageCard', className)

    return (
      <CardUI {...getValidProps(rest)} className={componentClassName}>
        {children}
      </CardUI>
    )
  }
}

export default Card
