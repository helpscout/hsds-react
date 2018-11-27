import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { CardUI } from './styles/Card.css'
import { COMPONENT_KEY } from './utils'

export interface Props {
  children?: any
  className?: string
  isResponsive: boolean
}

class Card extends React.PureComponent<Props> {
  static defaultProps = {
    isResponsive: false,
  }

  render() {
    const { children, className, isResponsive, ...rest } = this.props

    const componentClassName = classNames(
      'c-PageCard',
      isResponsive && 'is-responsive',
      className
    )

    return (
      <CardUI {...getValidProps(rest)} className={componentClassName}>
        {children}
      </CardUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY.Card)(Card)

export default Card
