// @flow
import React, { Component } from 'react'
import styled from '../styled'
import Animate from '../Animate'
import Pop from '../Pop'
import Popper from './Popper'
import classNames, { BEM } from '../../utilities/classNames'
import css from './styles/Tooltip.css.js'
import type { PopProps, Placements } from '../Pop/types'

type Props = {|
  ...PopProps,
  renderContent: () => void,
  title?: any,
|}

class Tooltip extends Component<Props> {
  static defaultProps = {
    animationDelay: 100,
    animationDuration: 200,
    animationSequence: 'fade up',
    isOpen: false,
    modifiers: {},
    placement: 'top',
    triggerOn: 'hover',
  }

  render() {
    const {
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

    if (!title) return children || null

    const componentClassName = classNames('c-Tooltip', className)
    const arrowClassName = BEM(className).element('arrow')

    /**
     * Pop, which uses Popper.js, uses document.createRange. Enzyme/JSDOM
     * doesn't like it when this function fires from a (grand)parent component.
     * The rendering of both content types have been manually tested in
     * Storybook.
     */
    /* istanbul ignore next */
    const contentMarkup =
      renderContent && typeof renderContent === 'function'
        ? renderContent({ placement, title })
        : title

    return (
      <Pop
        className={componentClassName}
        isOpen={isOpen}
        modifiers={modifiers}
        placement={placement}
        triggerOn={triggerOn}
        {...rest}
      >
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

export default styled(Tooltip)(css)
