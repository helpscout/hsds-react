import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import Icon from '../Icon'

import {
  ButtonUI,
  ButtonWrapperUI,
  OptionsTriggerButtonUI,
  OptionsDropdownUI,
  VerticalDividerUI,
} from './ButtonWithOptions.css'
import { COMPONENT_KEY } from './ButtonWithOptions.utils'

export interface Props {
  className?: string
  children?: any
  disabled?: boolean
  buttonRef: (node: HTMLElement) => void
  onClick: (event: Event) => void
  options: Array<any>
}

export class ButtonWithOptions extends React.PureComponent<Props> {
  static className = 'c-ButtonWithOptions'

  static defaultProps = {
    buttonRef: noop,
    disabled: false,
    onClick: noop,
    options: [],
  }

  renderEndChatOptions() {
    const { disabled } = this.props
    const trigger = (
      <OptionsTriggerButtonUI
        canRenderFocus={false}
        disabled={disabled}
        kind="primary"
        size="lg"
        version={2}
      >
        <Icon name="caret-down" size="16" />
      </OptionsTriggerButtonUI>
    )

    const { options } = this.props

    return (
      <OptionsDropdownUI
        direction="left"
        disabled={disabled}
        items={options}
        renderTrigger={trigger}
      />
    )
  }

  getClassName() {
    const { className } = this.props
    return classNames(ButtonWithOptions.className, className)
  }

  render() {
    const { children, buttonRef, disabled, onClick, ...rest } = this.props

    return (
      <ButtonWrapperUI {...getValidProps(rest)} className={this.getClassName()}>
        <ButtonUI
          buttonRef={buttonRef}
          canRenderFocus={false}
          disabled={disabled}
          kind="primary"
          onClick={onClick}
          size="lg"
          version={2}
        >
          {children}
        </ButtonUI>
        <VerticalDividerUI disabled />
        {this.renderEndChatOptions()}
      </ButtonWrapperUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(ButtonWithOptions)

export default PropConnectedComponent
