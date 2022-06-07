// Deprecated
/* istanbul ignore file */
import React from 'react'
import PropTypes from 'prop-types'
import { getValidProps } from '@hsds/utils-react'
import { connect } from '@helpscout/wedux'
import { toggleOpen, openDropdown, closeDropdown } from './Dropdown.actions'
import { TriggerUI } from './Dropdown.css.js'
import { Keys } from '@hsds/utils-keyboard'
import classNames from 'classnames'
import { renderRenderPropComponent } from './Dropdown.utils'

function noop() {}

export class DropdownTrigger extends React.PureComponent {
  state = { isHovered: false }

  handleOnClick = event => {
    this.props.onClick(event)
    this.props.toggleOpen()
  }

  handleOnKeyDown = event => {
    switch (event.keyCode) {
      case Keys.DOWN_ARROW:
        this.openDropdown(event)
        break

      case Keys.ENTER:
        this.openDropdown(event)
        break

      case Keys.TAB:
        if (event.shiftKey) {
          this.closeDropdown()
        }
        break

      default:
        break
    }

    this.props.onKeyDown(event)
  }

  openDropdown(event) {
    const { isOpen, openDropdown } = this.props

    if (!isOpen) {
      event.preventDefault()
      return openDropdown()
    }
  }

  closeDropdown() {
    const { isOpen, closeDropdown } = this.props

    if (isOpen) {
      return closeDropdown()
    }
  }

  renderChildren() {
    const { children } = this.props
    const { isHovered } = this.state
    const renderedChildren = renderRenderPropComponent(children, { isHovered })

    return renderedChildren ? renderedChildren : children
  }

  render() {
    const {
      className,
      disabled,
      onBlur,
      onFocus,
      triggerRef,
      isOpen,
      ...rest
    } = this.props

    const componentClassName = classNames(
      className,
      isOpen && 'is-open',
      disabled && 'is-disabled',
      'c-DropdownTrigger'
    )

    return (
      <TriggerUI
        role="button"
        {...getValidProps(rest)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={componentClassName}
        disabled={disabled}
        ref={triggerRef}
        onBlur={onBlur}
        onFocus={onFocus}
        onClick={this.handleOnClick}
        onKeyDown={this.handleOnKeyDown}
        onMouseOver={() => this.setState({ isHovered: true })}
        onMouseLeave={() => this.setState({ isHovered: false })}
      >
        {this.renderChildren()}
      </TriggerUI>
    )
  }
}

DropdownTrigger.propTypes = {
  className: PropTypes.string,
  closeDropdown: PropTypes.func,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  disabled: PropTypes.bool,
  triggerRef: PropTypes.func,
  id: PropTypes.string,
  isOpen: PropTypes.bool,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onClick: PropTypes.func,
  openDropdown: PropTypes.func,
  style: PropTypes.object,
  toggleOpen: PropTypes.func,
}

DropdownTrigger.defaultProps = {
  'data-cy': 'DropdownTrigger',
  disabled: false,
  triggerRef: noop,
  isOpen: false,
  onBlur: noop,
  onFocus: noop,
  onKeyDown: noop,
  onClick: noop,
  openDropdown: noop,
  closeDropdown: noop,
  style: {},
  toggleOpen: noop,
}

export const mapStateToProps = state => {
  const { isOpen, triggerId, triggerProps, triggerStyle } = state

  return { ...triggerProps, isOpen, id: triggerId, style: triggerStyle }
}

const ConnectedTrigger = connect(
  mapStateToProps,
  // mapDispatchToProps
  {
    toggleOpen,
    openDropdown,
    closeDropdown,
  }
)(DropdownTrigger)

export default ConnectedTrigger
