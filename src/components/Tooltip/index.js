// @flow
import type { PopProps } from '../Pop/types'
import React, { Component } from 'react'
import { getValidProps } from '@helpscout/react-utils'
import styled from '../styled'
import Pop from '../Pop'
import Popper from './Popper'
import { configConnect } from '../ConfigProvider'
import classNames, { BEM } from '../../utilities/classNames'
import { isFunction } from '../../utilities/is'
import css from './styles/Tooltip.css.js'
import configs from './configs'

type Props = {|
  ...PopProps,
  renderContent?: () => void,
  title?: any,
  zIndex?: number,
|}

class Tooltip extends Component<Props> {
  static defaultProps = {
    ...configs,
    animationDelay: 100,
    animationDuration: 100,
    animationSequence: 'fade up',
    isOpen: false,
    modifiers: {},
    placement: 'top',
    triggerOn: 'hover',
  }

  hasRenderContentProp = () => {
    const { renderContent } = this.props

    return renderContent && isFunction(renderContent)
  }

  shouldRenderPopper = () => {
    return this.props.title || this.hasRenderContentProp()
  }

  render() {
    const {
      animationDelay,
      animationDuration,
      animationSequence,
      className,
      children,
      isOpen,
      placement,
      renderContent,
      maxWidth,
      modifiers,
      theme,
      title,
      triggerOn,
      ...rest
    } = this.props

    const componentClassName = classNames('c-Tooltip', className)

    if (!this.shouldRenderPopper()) {
      return children ? (
        <span className={componentClassName} {...getValidProps(rest)}>
          {children}
        </span>
      ) : null
    }

    const arrowClassName = BEM(className).element('arrow')

    /**
     * Pop, which uses Popper.js, uses document.createRange. Enzyme/JSDOM
     * doesn't like it when this function fires from a (grand)parent component.
     * The rendering of both content types have been manually tested in
     * Storybook.
     */
    /* istanbul ignore next */
    const contentMarkup = this.hasRenderContentProp()
      ? renderContent({ placement, title })
      : title

    const popProps = {
      animationDelay,
      animationDuration,
      animationSequence,
      isOpen,
      modifiers,
      placement,
      triggerOn,
    }

    return (
      <Pop className={componentClassName} {...popProps} {...rest}>
        <Pop.Reference className="c-Tooltip__reference">
          {children}
        </Pop.Reference>
        <Pop.Popper arrowClassName={arrowClassName}>
          <Popper style={{ maxWidth }}>{contentMarkup}</Popper>
        </Pop.Popper>
      </Pop>
    )
  }
}

const StyledTooltip = styled(Tooltip)(css)

export default configConnect('Tooltip')(StyledTooltip)
