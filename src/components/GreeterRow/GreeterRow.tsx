import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import AccordionLink from '../Accordion/Accordion.Link'
import Flexy from '../Flexy'
import Text from '../Text'
import Tooltip from '../Tooltip'
import { classNames } from '../../utilities/classNames'
import { renderChildrenSafely } from '../../utilities/component'
import { noop } from '../../utilities/other'
import { ContentUI, ErrorIconUI, PauseIconUI } from './styles/GreeterRow.css'
import { COMPONENT_KEY } from './GreeterRow.utils'

export interface Props {
  className?: string
  children?: any
  errorMessage?: string
  isError: boolean
  isPaused: boolean
  innerRef: (node: HTMLElement) => void
  pausedMessage: string
  name: any
}

export class GreeterRow extends React.PureComponent<Props> {
  static className = 'c-GreeterRow'
  static defaultProps = {
    errorMessage: 'Greeter paused because of an issue',
    innerRef: noop,
    isError: false,
    isPaused: false,
    pausedMessage: 'Paused',
    name: 'Greeter',
  }

  getClassName() {
    const { className, isError } = this.props

    return classNames(
      GreeterRow.className,
      isError && 'is-error',
      this.isPaused() && 'is-paused',
      className
    )
  }

  isPaused() {
    return this.props.isError || this.props.isPaused
  }

  renderErrorIcon() {
    const { errorMessage } = this.props

    return (
      <Flexy.Item>
        <Tooltip title={errorMessage} display="block">
          <ErrorIconUI data-cy="greeter-name-row-icon-error" />
        </Tooltip>
      </Flexy.Item>
    )
  }

  renderPausedIcon() {
    const { pausedMessage } = this.props

    return (
      <Flexy.Item>
        <Tooltip title={pausedMessage} display="block">
          <PauseIconUI data-cy="greeter-name-row-icon-paused" />
        </Tooltip>
      </Flexy.Item>
    )
  }

  renderIcon() {
    const { isError, isPaused } = this.props

    if (isError) {
      return this.renderErrorIcon()
    }
    if (isPaused) {
      return this.renderPausedIcon()
    }

    return null
  }

  renderName() {
    const { name } = this.props
    const shade = this.isPaused() ? 'faint' : 'default'

    return renderChildrenSafely(name, Text, {
      truncate: true,
      weight: 500,
      'data-cy': 'greeter-name-row-name',
      shade,
    })
  }

  render() {
    const { children, innerRef, name, ...rest } = this.props

    return (
      <AccordionLink
        data-cy-component="GreeterRow"
        data-cy="greeter-name-row"
        {...rest}
        className={this.getClassName()}
        innerRef={innerRef}
      >
        <ContentUI>
          <Flexy.Block>{this.renderName()}</Flexy.Block>
          {this.renderIcon()}
        </ContentUI>
      </AccordionLink>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(GreeterRow)

export default PropConnectedComponent
