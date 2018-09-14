// @flow
import type { FluffyCardTextAlign } from './types'
import React, { PureComponent as Component } from 'react'
import Container from './Container'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { noop } from '../../utilities/other'
import { FluffyCardUI } from './styles/FluffyCard.css.js'
import { COMPONENT_KEY } from './utils'

type Props = {
  autoWordWrap?: boolean,
  children?: any,
  className?: string,
  textAlign: FluffyCardTextAlign,
  fullHeight: boolean,
  hover: boolean,
  href?: string,
  nodeRef: () => void,
  onBlur: (event: Event) => void,
  onClick: (event: Event) => void,
  onFocus: (event: Event) => void,
  seamless: boolean,
  to?: string,
}

class FluffyCard extends Component<Props> {
  static defaultProps = {
    flex: false,
    floating: false,
    fullHeight: false,
    hover: false,
    nodeRef: noop,
    onBlur: noop,
    onClick: noop,
    onFocus: noop,
    seamless: false,
    selector: 'div',
    textAlign: 'center',
  }
  static Container = Container

  render() {
    const { children, className, textAlign, ...rest } = this.props

    const componentClassName = classNames(
      'c-FluffyCard',
      textAlign && `is-textAlign-${textAlign}`,
      className
    )

    return (
      <FluffyCardUI {...rest} borderless className={componentClassName}>
        {children}
      </FluffyCardUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY.FluffyCard)(FluffyCard)

export default FluffyCard
