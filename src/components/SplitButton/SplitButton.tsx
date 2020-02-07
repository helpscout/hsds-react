import * as React from 'react'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import SearchableDropdown from '../SearchableDropdown'
import Button from '../Button'
import ControlGroup from '../ControlGroup'
import Icon from '../Icon'

import { OptionsTriggerButtonUI } from './SplitButton.css'

export interface Props {
  buttonRef?: (ref: any) => void
  children?: any
  className?: string
  disabled?: boolean
  dropdownProps?: any
  kind?: string
  onClick?: (event: Event) => void
  size?: string
  state?: string
}

const defaultDropdownProps = {
  className: 'c-SplitButton__dropdown',
  direction: 'right',
  onTriggerClick: noop,
}

export class SplitButton extends React.PureComponent<Props> {
  static className = 'c-SplitButton'

  static defaultProps = {
    buttonRef: noop,
    dropdownProps: {},
    disabled: false,
    kind: 'primary',
    onClick: noop,
    size: 'lg',
  }

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
    return (
      <ControlGroup className={this.getClassName()}>
        <ControlGroup.Item>{this.renderButton()}</ControlGroup.Item>
        <ControlGroup.Item>{this.renderDropdown()}</ControlGroup.Item>
      </ControlGroup>
    )
  }
}

export default SplitButton
