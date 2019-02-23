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
  buttonRef: (ref: any) => void
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

  renderEndChatOptions() {
    const { disabled, dropdownProps: props } = this.props
    const trigger = this.renderDropdownTrigger()
    const dropdownProps = {
      ...defaultDropdownProps,
      disabled,
      renderTrigger: trigger,
      ...props,
    }

    return <AutoDropDown {...dropdownProps} />
  }

  getClassName() {
    const { className } = this.props
    return classNames(ButtonWithOptions.className, className)
  }

  render() {
    const {
      buttonRef,
      children,
      disabled,
      kind,
      onClick,
      size,
      ...rest
    } = this.props

    return (
      <ControlGroup className={this.getClassName()} {...getValidProps(rest)}>
        <ControlGroup.Item>
          <Button
            buttonRef={buttonRef}
            className="c-ButtonWithOptions__button"
            disabled={disabled}
            kind={kind}
            onClick={onClick}
            size={size}
            version={2}
          >
            {children}
          </Button>
        </ControlGroup.Item>
        <ControlGroup.Item>{this.renderEndChatOptions()}</ControlGroup.Item>
      </ControlGroup>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(ButtonWithOptions)

export default PropConnectedComponent
