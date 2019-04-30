import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../PropProvider/propConnect'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { CloseButtonSize } from './CloseButton.types'
import { noop } from '../../utilities/other'
import { COMPONENT_KEY } from './CloseButton.utils'
import { CloseButtonUI, IconUI } from './CloseButton.css'

export interface Props {
  className?: string
  children?: any
  innerRef: (node: HTMLElement) => void
  onBlur: (event: Event) => void
  onClick: (event: Event) => void
  onFocus: (event: Event) => void
  seamless: boolean
  size?: CloseButtonSize
  title?: string
}

export class CloseButton extends React.PureComponent<Props> {
  static defaultProps = {
    innerRef: noop,
    onBlur: noop,
    onClick: noop,
    onFocus: noop,
    seamless: false,
    title: 'Close',
  }

  renderIcon() {
    const { size } = this.props
    const isTiny = size === 'tiny'
    const iconName = !isTiny ? 'cross-large' : 'cross-small'

    return (
      <IconUI
        center
        className="c-CloseButton__icon"
        ignoreClick
        name={iconName}
        title="Close"
      />
    )
  }

  render() {
    const {
      children,
      className,
      innerRef,
      seamless,
      size,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-CloseButton',
      seamless && 'is-seamless',
      size && `is-${size}`,
      className
    )

    return (
      <CloseButtonUI
        aria-label="Close"
        {...getValidProps(rest)}
        className={componentClassName}
        innerRef={innerRef}
      >
        {this.renderIcon()}
      </CloseButtonUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(CloseButton)
const PropConnectedComponent = propConnect(COMPONENT_KEY)(CloseButton)

export default PropConnectedComponent
