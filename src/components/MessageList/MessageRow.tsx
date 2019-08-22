import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import AccordionLink from '../Accordion/Accordion.Link'
import Flexy from '../Flexy'
import Badge from '../Badge'
import { getColor } from '../../styles/utilities/color'
import Text from '../Text'
import Tooltip from '../Tooltip'
import Truncate from '../Truncate'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { ContentUI, HandleUI, SortableItemUI } from './styles/MessageRow.css'
import { SortableElement, SortableHandle } from 'react-sortable-hoc'
import Icon from '../Icon/index'

const COMPONENT_KEY = 'MessageRow'

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
  index: number
  isDragging: boolean
  isDraggingOnList: boolean
  isError: boolean
  isNotStarted: boolean
  isPaused: boolean
  innerRef: (node: HTMLElement) => void
  notStartedMessage: string
  pausedMessage: string
  name: any
  isValid: boolean
}

export class MessageRow extends React.PureComponent<Props> {
  static className = 'c-MessageRow'
  static defaultProps = {
    errorMessage: 'Message paused because of an issue',
    innerRef: noop,
    isError: false,
    isNotStarted: false,
    isPaused: false,
    notStartedMessage: 'Message not finished setup',
    pausedMessage: 'Paused',
    name: 'Message',
  }

  getClassName() {
    const { className, isError, isPaused } = this.props
    return classNames(
      MessageRow.className,
      isError && 'is-error',
      'is-open',
      isPaused && 'is-paused',
      className
    )
  }

  renderErrorBadge() {
    const { errorMessage } = this.props

    return (
      <Flexy.Item>
        <Tooltip title={errorMessage} display="block">
          <Badge color={getColor('red.700')} inverted={true} size="sm">
            Needs Attention
          </Badge>
        </Tooltip>
      </Flexy.Item>
    )
  }

  renderPausedBadge() {
    const { pausedMessage } = this.props

    return (
      <Flexy.Item>
        <Tooltip title={pausedMessage} display="block">
          <Badge color={getColor('charcoal.200')} inverted={true} size="sm">
            Paused
          </Badge>
        </Tooltip>
      </Flexy.Item>
    )
  }

  renderNotStartedBadge() {
    const { notStartedMessage } = this.props

    return (
      <Flexy.Item>
        <Tooltip title={notStartedMessage} display="block">
          <Badge
            color={getColor('yellow.500')}
            inverted={true}
            size="sm"
            textColor={getColor('yellow.900')}
          >
            Finish Setup
          </Badge>
        </Tooltip>
      </Flexy.Item>
    )
  }

  renderBadge() {
    const { isNotStarted, isPaused, isValid } = this.props

    if (!isValid) {
      return this.renderErrorBadge()
    } else if (isPaused) {
      return this.renderPausedBadge()
    } else if (isNotStarted) {
      return this.renderNotStartedBadge()
    }

    return null
  }

  renderName() {
    const { name, isPaused, isValid, isNotStarted } = this.props
    const shade = isPaused || isNotStarted ? 'faint' : 'default'

    return (
      <Text weight={500} state={!isValid ? 'error' : null} shade={shade}>
        <Truncate>{name}</Truncate>
      </Text>
    )
  }

  render() {
    const {
      children,
      isDraggingOnList,
      isDragging,
      index,
      innerRef,
      name,
      ...rest
    } = this.props

    return (
      <SortableItem index={index} isDragging={isDragging}>
        <AccordionLink
          data-cy-component="MessageRow"
          data-cy="message-name-row"
          {...rest}
          className={this.getClassName()}
          innerRef={innerRef}
          style={{ pointerEvents: isDraggingOnList ? 'none' : 'all' }}
        >
          <ContentUI>
            <DraggableHandle />
            <Flexy.Block>{this.renderName()}</Flexy.Block>
            {this.renderBadge()}
          </ContentUI>
        </AccordionLink>
      </SortableItem>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(MessageRow)

export default PropConnectedComponent
