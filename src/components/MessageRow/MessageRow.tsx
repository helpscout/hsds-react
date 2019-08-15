import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import AccordionLink from '../Accordion/Accordion.Link'
import Flexy from '../Flexy'
import Text from '../Text'
import Tooltip from '../Tooltip'
import { classNames } from '../../utilities/classNames'
import { renderChildrenSafely } from '../../utilities/component'
import { noop } from '../../utilities/other'
import {
  ContentUI,
  ErrorIconUI,
  PauseIconUI,
  HandleUI,
  SortableItemUI,
} from './styles/MessageRow.css'
import { COMPONENT_KEY } from './MessageRow.utils'
import { SortableElement, SortableHandle } from 'react-sortable-hoc'
import Icon from '../Icon/'

const DraggableHandle = SortableHandle(() => (
  <HandleUI>
    <Icon name="drag-handle" />
  </HandleUI>
))

const SortableItem = SortableElement(({ index, children }) => {
  return <SortableItemUI>{children}</SortableItemUI>
})

export interface Props {
  className?: string
  children?: any
  errorMessage?: string
  isDragging: boolean
  isError: boolean
  isPaused: boolean
  innerRef: (node: HTMLElement) => void
  pausedMessage: string
  name: any
}

export class MessageRow extends React.PureComponent<Props> {
  static className = 'c-MessageRow'
  static defaultProps = {
    errorMessage: 'Message paused because of an issue',
    innerRef: noop,
    isError: false,
    isPaused: false,
    pausedMessage: 'Paused',
    name: 'Message',
  }

  getClassName() {
    const { className, isError } = this.props
    return classNames(
      MessageRow.className,
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
          <ErrorIconUI data-cy="message-name-row-icon-error" />
        </Tooltip>
      </Flexy.Item>
    )
  }

  renderPausedIcon() {
    const { pausedMessage } = this.props

    return (
      <Flexy.Item>
        <Tooltip title={pausedMessage} display="block">
          <PauseIconUI data-cy="message-name-row-icon-paused" />
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
      'data-cy': 'message-name-row-name',
      shade,
    })
  }

  render() {
    const { children, isDragging, index, innerRef, name, ...rest } = this.props

    return (
      <SortableItem index={index}>
        <AccordionLink
          data-cy-component="MessageRow"
          data-cy="message-name-row"
          {...rest}
          className={this.getClassName()}
          innerRef={innerRef}
          style={{ pointerEvents: isDragging ? 'none' : 'all' }}
        >
          <ContentUI>
            <DraggableHandle />
            <Flexy.Block>{this.renderName()}</Flexy.Block>
            {this.renderIcon()}
          </ContentUI>
        </AccordionLink>
      </SortableItem>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(MessageRow)

export default PropConnectedComponent
