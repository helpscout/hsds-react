import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon'
import { ButtonWrapperUI, ButtonUI } from './Condition.css'
import { classNames } from '../../utilities/classNames'
import { isNodeWithinViewport } from '../../utilities/node'
import { noop } from '../../utilities/other'
import { smoothScrollTo, linear } from '../../utilities/smoothScroll'

class AddButton extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    innerRef: PropTypes.func,
    onClick: PropTypes.func,
    isBorderless: PropTypes.bool,
    scrollDuration: PropTypes.number,
    scrollOffset: PropTypes.number,
    type: PropTypes.oneOf('and', 'or'),
  }

  static defaultProps = {
    isBorderless: false,
    onClick: noop,
    scrollDuration: 300,
    scrollOffset: 200,
    type: 'or',
  }

  static displayName = 'ConditionAddButton'

  static className = 'c-ConditionAddButton'

  node

  getClassName() {
    const { className, isBorderless, type } = this.props

    const isAnd = type.toLowerCase() === 'and'
    const label = isAnd ? 'and' : 'or'

    return classNames(
      AddButton.className,
      isBorderless && 'is-borderless',
      `is-${label}`,
      className
    )
  }

  handleOnClick = event => {
    this.props.onClick(event)
    this.scrollIntoView()
  }

  scrollIntoView = () => {
    const { scrollOffset: offset, scrollDuration: duration } = this.props
    /* istanbul ignore next */
    // Guard in case component because unmounted during the click event.
    if (!this.node) return

    const isVisible = isNodeWithinViewport({ node: this.node, offset })
    const position = offset + window.scrollY

    /* istanbul ignore next */
    // Can't easily be tested in JSDOM due to DOM calculations.
    if (isVisible) return

    smoothScrollTo({
      node: window,
      position,
      direction: 'y',
      duration,
      timingFunction: linear,
    })
  }

  setNodeRef = node => (this.node = node)

  render() {
    const { className, isBorderless, type, ...rest } = this.props

    const isAnd = type.toLowerCase() === 'and'

    const align = isAnd ? 'center' : 'left'
    const iconSize = isAnd ? 24 : 20
    const label = isAnd ? 'and' : 'or'
    const size = isAnd ? 'sm' : 'xxs'

    return (
      <ButtonWrapperUI align={align} ref={this.setNodeRef}>
        <ButtonUI
          {...rest}
          className={this.getClassName()}
          kind="secondaryAlt"
          onClick={this.handleOnClick}
          size={size}
        >
          <Icon name="plus-small" isWithHiddenTitle={false} size={iconSize} />
          {label}
        </ButtonUI>
      </ButtonWrapperUI>
    )
  }
}

export default AddButton
