import * as React from 'react'
import { FluffyCardTextAlign } from './FluffyCard.types'
import Container from './FluffyCard.Container'
import { classNames } from '../../utilities/classNames'

import { noop } from '../../utilities/other'
import { FluffyCardUI } from './styles/FluffyCard.css'
import { COMPONENT_KEY } from './FluffyCard.utils'

type Props = {
  autoWordWrap?: boolean
  children?: any
  className?: string
  flex: boolean
  fullHeight: boolean
  hover: boolean
  href?: string
  innerRef: (node: HTMLElement) => void
  nodeRef: () => void
  onBlur: (event: Event) => void
  onClick: (event: Event) => void
  onFocus: (event: Event) => void
  seamless: boolean
  selector: 'string'
  textAlign: FluffyCardTextAlign
  to?: string
}

class FluffyCard extends React.PureComponent<Props> {
  static defaultProps = {
    flex: false,
    floating: false,
    fullHeight: false,
    hover: false,
    innerRef: noop,
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
    const { children, className, innerRef, textAlign, ...rest } = this.props

    const componentClassName = classNames(
      'c-FluffyCard',
      textAlign && `is-textAlign-${textAlign}`,
      className
    )

    return (
      <FluffyCardUI
        {...rest}
        borderless
        className={componentClassName}
        ref={innerRef}
      >
        {children}
      </FluffyCardUI>
    )
  }
}

export default FluffyCard
