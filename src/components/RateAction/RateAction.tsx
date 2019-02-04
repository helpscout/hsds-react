import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Emoticon from '../Emoticon'
import { EmoticonName, EmoticonSize } from '../Emoticon/Emoticon.types'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { RateActionUI } from './RateAction.css'
import { COMPONENT_KEY } from './RateAction.utils'

export interface Props {
  className?: string
  children?: any
  disabled: boolean
  isActive: boolean
  innerRef: (node: HTMLElement) => void
  onBlur: (...args: any[]) => void
  onFocus: (...args: any[]) => void
  name: EmoticonName
  size: EmoticonSize
  withAnimation: boolean
}

export interface State {
  isActive: boolean
}

export class RateAction extends React.PureComponent<Props, State> {
  static className = 'c-RateAction'
  static defaultProps = {
    disabled: false,
    innerRef: noop,
    isActive: false,
    name: 'happy',
    onBlur: noop,
    onFocus: noop,
    size: 'md',
    withAnimation: true,
  }

  state = {
    isActive: this.props.isActive,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isActive !== this.props.isActive) {
      this.setState({
        isActive: nextProps.isActive,
      })
    }
  }

  handleOnBlur = event => {
    this.setState({
      isActive: false,
    })
    this.props.onBlur(event)
  }

  handleOnFocus = event => {
    this.setState({
      isActive: true,
    })
    this.props.onFocus(event)
  }

  getClassName() {
    const { className, name, size } = this.props

    return classNames(
      RateAction.className,
      name && `is-${name}`,
      size && `is-${size}`,
      className
    )
  }

  render() {
    const {
      children,
      disabled,
      innerRef,
      onBlur,
      onFocus,
      ...rest
    } = this.props

    return (
      <RateActionUI
        {...getValidProps(rest)}
        className={this.getClassName()}
        disabled={disabled}
        innerRef={innerRef}
        onBlur={this.handleOnBlur}
        onFocus={this.handleOnFocus}
      >
        <Emoticon
          {...rest}
          isActive={this.state.isActive}
          isDisabled={disabled}
        />
      </RateActionUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(RateAction)

export default PropConnectedComponent
