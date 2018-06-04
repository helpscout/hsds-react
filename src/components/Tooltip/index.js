import React, { Component } from 'react'
import styled from '../styled'
import Animate from '../Animate'
import Pop from '../Pop'
import Popper from './Popper'
import classNames from '../../utilities/classNames'
import css from './styles/Tooltip.css'

class Tooltip extends Component<Props> {
  render() {
    const {
      className,
      children,
      isOpen,
      placement,
      renderContent,
      styles,
      theme,
      title,
      triggerOn,
      ...rest
    } = this.props

    const componentClassName = classNames(
      styles.Tooltip,
      'c-Tooltip',
      className
    )

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
        placement={placement}
        triggerOn={triggerOn}
        {...rest}
      >
        <Pop.Reference className="c-Tooltip__reference">
          {children}
        </Pop.Reference>
        <Pop.Popper arrowClassName={styles.Tooltip__arrow}>
          <Popper>{contentMarkup}</Popper>
        </Pop.Popper>
      </Pop>
    )
  }
}

type Placements =
  | 'auto-start'
  | 'auto'
  | 'auto-end'
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'right-start'
  | 'right'
  | 'right-end'
  | 'bottom-end'
  | 'bottom'
  | 'bottom-start'
  | 'left-end'
  | 'left'
  | 'left-start'

type Props = {
  animationDelay: number | string,
  animationDuration: number | string,
  animationEasing: string,
  animationSequence: string | Array<string>,
  arrowClassName: string,
  closeOnBodyClick: boolean,
  closeOnEscPress: boolean,
  display: string,
  isOpen: boolean,
  placement: Placements,
  renderContent: () => void,
  triggerOn: 'click' | 'hover',
  showArrow: boolean,
}

Tooltip.defaultProps = {
  animationDelay: 100,
  animationDuration: 200,
  animationSequence: 'fade up',
  isOpen: false,
  placement: 'top',
  triggerOn: 'hover',
}

export default styled(Tooltip)(css)
