import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import SearchableDropdown from '../SearchableDropdown'
import Button from '../Button'
import ControlGroup from '../ControlGroup'
import Icon from '../Icon'
import { OptionsTriggerButtonUI } from './SplitButton.css'

const defaultDropdownProps = {
  className: 'c-SplitButton__dropdown',
  direction: 'right',
  onTriggerClick: noop,
}

export class SplitButton extends React.PureComponent {
  static className = 'c-SplitButton'

  renderButton() {
    const { dropdownProps, ...rest } = this.props

    return <Button {...rest} className="c-SplitButton__button" />
  }

  renderDropdownTrigger() {
    const {
      disabled,
      dropdownProps: { onTriggerClick },
      kind,
      size,
      state,
    } = this.props

    return (
      <OptionsTriggerButtonUI
        className="c-SplitButton__dropdownTrigger"
        disabled={disabled}
        isLast
        kind={kind}
        onClick={onTriggerClick}
        size={size}
        state={state}
      >
        <Icon name="caret-down" size="14" />
      </OptionsTriggerButtonUI>
    )
  }

  renderDropdown() {
    const trigger = this.renderDropdownTrigger()
    const {
      disabled,
      dropdownProps: { onTriggerClick, ...dropdownPropsRest },
    } = this.props

    const props = {
      ...defaultDropdownProps,
      ...dropdownPropsRest,
      disabled,
      renderTrigger: trigger,
      triggerProps: {
        tabIndex: -1,
      },
      autoInput: true,
    }

    return <SearchableDropdown {...props} />
  }

  getClassName() {
    const { className } = this.props
    return classNames(SplitButton.className, className)
  }

  render() {
    const { 'data-cy': dataCy } = this.props

    return (
      <ControlGroup data-cy={dataCy} className={this.getClassName()}>
        <ControlGroup.Item>{this.renderButton()}</ControlGroup.Item>
        <ControlGroup.Item>{this.renderDropdown()}</ControlGroup.Item>
      </ControlGroup>
    )
  }
}

SplitButton.propTypes = {
  buttonRef: PropTypes.func,
  children: PropTypes.any,
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  disabled: PropTypes.bool,
  dropdownProps: PropTypes.any,
  kind: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.string,
  state: PropTypes.string,
}

SplitButton.defaultProps = {
  buttonRef: noop,
  'data-cy': 'SplitButton',
  dropdownProps: {},
  disabled: false,
  kind: 'primary',
  onClick: noop,
  size: 'lg',
}

export default SplitButton
