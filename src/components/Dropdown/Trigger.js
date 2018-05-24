import React, { PureComponent as Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'
import Icon from '../Icon'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { dropdownDirectionTypes } from './propTypes'

export const propTypes = {
  children: PropTypes.node.isRequired,
  direction: dropdownDirectionTypes,
  onClick: PropTypes.func,
}
const defaultProps = {
  children: 'Dropdown',
  direction: 'down',
  onClick: noop,
}

class Trigger extends Component {
  constructor() {
    super()
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  /* istanbul ignore next */
  // Tested, but Istanbul isn't picking it up
  handleOnClick(event) {
    const { onClick } = this.props
    if (event) event.preventDefault()
    onClick(event)
  }

  render() {
    const { isActive, children, className, direction, ...rest } = this.props

    const handleOnClick = this.handleOnClick

    const child =
      typeof children !== 'object' ? children : React.Children.only(children)

    const componentClassName = classNames(
      'c-DropdownTrigger',
      direction && `is-${direction}`,
      isActive && 'is-active',
      className
    )

    const iconMarkup = (
      <Icon
        className="c-DropdownTrigger__icon"
        inline
        muted
        name={`caret-${direction}`}
        size="14"
      />
    )

    const triggerMarkup =
      typeof child !== 'object' ? (
        <Button
          buttonRef={node => {
            this.node = node
          }}
          className={componentClassName}
          isActive={isActive}
          onClick={handleOnClick}
          tabIndex={0}
          {...rest}
        >
          {children}
          {iconMarkup}
        </Button>
      ) : (
        React.cloneElement(child, {
          ...rest,
          className: componentClassName,
          onClick: handleOnClick,
          tabIndex: 0,
        })
      )

    return triggerMarkup
  }
}

Trigger.propTypes = propTypes
Trigger.defaultProps = defaultProps

export default Trigger
