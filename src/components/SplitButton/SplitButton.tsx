import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'

import AutoDropDown from '../AutoDropdown'
import Button from '../Button'
import ControlGroup from '../ControlGroup'
import Icon from '../Icon'

import { OptionsTriggerButtonUI } from './SplitButton.css'
import { COMPONENT_KEY } from './SplitButton.utils'

export interface Props {
  buttonRef?: (ref: any) => void
  children?: any
  className?: string
  disabled?: boolean
  dropdownProps?: any
  kind?: string
  onClick?: (event: Event) => void
  size?: string
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

    return <Button {...rest} version={2} className="c-SplitButton__button" />
  }

  renderDropdownTrigger() {
    const {
      disabled,
      dropdownProps: { onTriggerClick },
      kind,
      size,
    } = this.props

    return (
      <OptionsTriggerButtonUI
        className="c-SplitButton__dropdownTrigger"
        disabled={disabled}
        isLast
        kind={kind}
        onClick={onTriggerClick}
        size={size}
        version={2}
      >
        <Icon name="caret-down" size="16" />
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
    }

    return <AutoDropDown {...props} />
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

const PropConnectedComponent = propConnect(COMPONENT_KEY)(SplitButton)

export default PropConnectedComponent
