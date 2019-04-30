import * as React from 'react'
import { createUniqueIDFactory } from '../../utilities/id'
import { noop } from '../../utilities/other'
import { classNames } from '../../utilities/classNames'
import EventListener from '../EventListener'
import Collapsible from '../Collapsible'
import Flexy from '../Flexy'
import Heading from '../Heading'
import Icon from '../Icon'
import SortableDragHandle from '../Sortable/DragHandle'
import {
  SidebarCollapsibleCardProps,
  SidebarCollapsibleCardState,
} from './SidebarCollapsibleCard.types'

const uniqueID = createUniqueIDFactory('SidebarCollapsibleCard')

class SidebarCollapsibleCard extends React.PureComponent<
  SidebarCollapsibleCardProps,
  SidebarCollapsibleCardState
> {
  constructor(props) {
    super(props)

    this.state = {
      id: props.id || uniqueID(),
      isOpen: props.isOpen,
    }
    this._prevIsOpen = props.isOpen
    this.isSorting = false
    this.handleToggleOpen = this.handleToggleOpen.bind(this)
    this.handleOnSortStart = this.handleOnSortStart.bind(this)
    this.handleOnSortEnd = this.handleOnSortEnd.bind(this)
  }

  static defaultProps = {
    duration: 200,
    durationOpen: 200,
    durationClose: 100,
    isOpen: false,
    onSortStart: noop,
    onSortEnd: noop,
    sortable: false,
  }

  isSorting: boolean
  _prevIsOpen: boolean

  componentWillUpdate(nextProps, nextState) {
    if (this.props.isOpen !== nextProps.isOpen) {
      this.handleToggleOpen()
    }
  }

  handleToggleOpen(e?) {
    e && e.preventDefault()
    this.setState({ isOpen: !this.state.isOpen })
  }

  handleOnSortStart() {
    const { onSortStart } = this.props
    this._prevIsOpen = this.state.isOpen
    this.isSorting = true
    this.setState({ isOpen: false })
    onSortStart()
  }

  handleOnSortEnd() {
    const { onSortEnd } = this.props
    if (!this.isSorting) return
    this.setState({ isOpen: this._prevIsOpen })
    this.isSorting = false
    onSortEnd()
  }

  render() {
    const {
      children,
      className,
      duration,
      durationOpen,
      durationClose,
      header,
      onClose,
      onOpen,
      onSortStart,
      onSortEnd,
      isOpen,
      sortable,
      title,
      ...rest
    } = this.props
    const { isOpen: open, id: cardId } = this.state

    const componentClassName = classNames(
      'c-SidebarCollapsibleCard',
      open && 'is-open',
      className
    )

    const handleToggleOpen = this.handleToggleOpen
    const handleOnSortStart = this.handleOnSortStart
    const handleOnSortEnd = this.handleOnSortEnd

    const displayHeader = () => {
      if (header) return header
      if (title) {
        return (
          <Heading
            className="c-SidebarCollapsibleCard__title"
            size="h4"
            lineHeightReset
          >
            {title}
          </Heading>
        )
      }
      return null
    }

    const iconName = open ? 'caret-up' : 'caret-down'
    const regionId = `${cardId}-region`
    const headerMarkup = displayHeader()
    const dragHandleMarkup = sortable ? (
      <Flexy.Item>
        <SortableDragHandle
          className="c-SidebarCollapsibleCard__drag-handle"
          onDragStart={handleOnSortStart}
        />
      </Flexy.Item>
    ) : null

    return (
      <div
        className={componentClassName}
        {...rest}
        role="presentation"
        id={cardId}
      >
        <EventListener event="mouseup" handler={handleOnSortEnd} />
        <a
          className="c-SidebarCollapsibleCard__header"
          onClick={handleToggleOpen}
          role="heading"
          aria-expanded={open}
          aria-controls={regionId}
          tabIndex={1}
        >
          <Flexy gap="sm">
            <Flexy.Block>{headerMarkup}</Flexy.Block>
            {dragHandleMarkup}
            <Flexy.Item>
              <Icon name={iconName} size="14" muted />
            </Flexy.Item>
          </Flexy>
        </a>
        <div
          className="c-SidebarCollapsibleCard__body"
          role="region"
          id={regionId}
        >
          <Collapsible
            duration={duration}
            durationOpen={durationOpen}
            durationClose={durationClose}
            onOpen={onOpen}
            onClose={onClose}
            isOpen={open}
          >
            <div className="c-SidebarCollapsibleCard__content">{children}</div>
          </Collapsible>
        </div>
      </div>
    )
  }
}

export default SidebarCollapsibleCard
