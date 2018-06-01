import React, { Component } from 'react'
import styled from '../styled'
import Animate from '../Animate'
import Pop from '../Pop'
import type { Props } from './types'
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
      styles['c-Tooltip'],
      'c-Tooltip',
      className
    )

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
        <Pop.Popper arrowClassName={styles['c-Tooltip__arrow']}>
          <Popper>{contentMarkup}</Popper>
        </Pop.Popper>
      </Pop>
    )
  }
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
