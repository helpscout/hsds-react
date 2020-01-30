import * as React from 'react'
import AccordionLink from '../Accordion/Accordion.Link'
import Flexy from '../Flexy'
import Badge from '../Badge'
import { getColor } from '../../styles/utilities/color'
import Text from '../Text'
import Tooltip from '../Tooltip'
import Truncate from '../Truncate'
import { classNames } from '../../utilities/classNames'
import { ContentUI, HandleUI, IconUI, SortableItemUI } from './MessageList.css'
import { SortableElement, SortableHandle } from 'react-sortable-hoc'

const DraggableHandle = SortableHandle(({ isVisible }) => (
  <HandleUI>
    {isVisible ? <IconUI alt="" name="drag-handle" shade="faint" /> : null}
  </HandleUI>
))

const SortableItem = SortableElement(({ index, isDragging, children }) => {
  return <SortableItemUI isDragging={isDragging}>{children}</SortableItemUI>
})

export interface Props {
  className?: string
  children?: any
  errorMessage?: string
  index: number
  isDragging: boolean
  isDraggingOnList: boolean
  isNotStarted: boolean
  isPaused: boolean
  isValid: boolean
  notStartedMessage: string
  pausedMessage: string
  name: any
}

export interface State {
  isHovering: boolean
}

export class MessageRow extends React.PureComponent<Props, State> {
  static className = 'c-MessageRow'
  static defaultProps = {
    errorMessage: 'Message paused because of an issue',
    isDragging: false,
    isDraggingOnList: false,
    isNotStarted: false,
    isPaused: false,
    isValid: true,
    notStartedMessage: 'Message not finished setup',
    pausedMessage: 'Paused',
    name: 'Message',
  }

  state = {
    isHovering: false,
  }

  getClassName() {
    const { className } = this.props
    return classNames(MessageRow.className, 'is-open', className)
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

  hideHandle = () => {
    this.setState({
      isHovering: false,
    })
  }

  showHandle = () => {
    this.setState({
      isHovering: true,
    })
  }

  render() {
    const {
      children,
      isDraggingOnList,
      isDragging,
      index,
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
          onMouseOver={this.showHandle}
          onMouseLeave={this.hideHandle}
          onDragStart={event => {
            // suppresses drag images on rest of components
            event.preventDefault()
          }}
          style={{ pointerEvents: isDraggingOnList ? 'none' : 'all' }}
        >
          <ContentUI>
            <DraggableHandle isVisible={this.state.isHovering} />
            <Flexy.Block>{this.renderName()}</Flexy.Block>
            {this.renderBadge()}
          </ContentUI>
        </AccordionLink>
      </SortableItem>
    )
  }
}

export default MessageRow
