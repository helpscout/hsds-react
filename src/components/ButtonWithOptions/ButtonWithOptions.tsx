import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'

import AutoDropDown from '../AutoDropdown'
import Button from '../Button'
import ControlGroup from '../ControlGroup'
import Icon from '../Icon'

import { OptionsTriggerButtonUI } from './ButtonWithOptions.css'
import { COMPONENT_KEY } from './ButtonWithOptions.utils'

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
  className: 'c-ButtonWithOptions__dropdown',
  direction: 'right',
  onTriggerClick: noop,
}

export class ButtonWithOptions extends React.PureComponent<Props> {
  static className = 'c-ButtonWithOptions'

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

    return (
      <Button {...rest} version={2} className="c-ButtonWithOptions__button" />
    )
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
        className="c-ButtonWithOptions__dropdownTrigger"
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
    }

    return <AutoDropDown {...props} />
  }

  getClassName() {
    const { className } = this.props
    return classNames(ButtonWithOptions.className, className)
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

const PropConnectedComponent = propConnect(COMPONENT_KEY)(ButtonWithOptions)

export default PropConnectedComponent
