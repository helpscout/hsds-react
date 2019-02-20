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
  innerRef: (node: HTMLElement) => void
  onClick: (event: Event) => void
  options: Array<any>
}

export class ButtonWithOptions extends React.PureComponent<Props> {
  static className = 'c-ButtonWithOptions'

  static defaultProps = {
    innerRef: noop,
    onClick: noop,
    options: [],
  }

  renderEndChatOptions() {
    const trigger = (
      <OptionsTriggerButtonUI
        canRenderFocus={false}
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
    const { children, innerRef, onClick, ...rest } = this.props

    return (
      <ButtonWrapperUI
        {...getValidProps(rest)}
        className={this.getClassName()}
        innerRef={innerRef}
      >
        <ButtonUI
          canRenderFocus={false}
          kind="primary"
          onClick={onClick}
          size="lg"
          version={2}
        >
          {children}
        </ButtonUI>
        <VerticalDividerUI />
        {this.renderEndChatOptions()}
      </ButtonWrapperUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(ButtonWithOptions)

export default PropConnectedComponent
