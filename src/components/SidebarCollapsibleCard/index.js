import React, { PureComponent as Component } from 'react'
import PropTypes from 'prop-types'
import {
  default as Collapsible,
  propTypes as collapsibleTypes,
} from '../Collapsible'
import EventListener from '../EventListener'
import Flexy from '../Flexy'
import Heading from '../Heading'
import SortableDragHandle from '../Sortable/DragHandle'
import Icon from '../Icon'
import { createUniqueIDFactory } from '../../utilities/id'
import { noop } from '../../utilities/other'
import classNames from '../../utilities/classNames.ts'

export const propTypes = Object.assign({}, collapsibleTypes, {
  header: PropTypes.element,
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  sortable: PropTypes.bool,
  onSortStart: PropTypes.func,
  onSortEnd: PropTypes.func,
})

export const defaultProps = {
  duration: 200,
  durationOpen: 200,
  durationClose: 100,
  isOpen: false,
  onSortStart: noop,
  onSortEnd: noop,
  sortable: false,
}

const uniqueID = createUniqueIDFactory('SidebarCollapsibleCard')

class SidebarCollapsibleCard extends Component {
  constructor(props) {
    super()
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

  componentWillUpdate(nextProps, nextState) {
    if (this.props.isOpen !== nextProps.isOpen) {
      this.handleToggleOpen()
    }
  }

  handleToggleOpen(e) {
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
          href="#"
          className="c-SidebarCollapsibleCard__header"
          onClick={handleToggleOpen}
          role="heading"
          aria-expanded={open}
          aria-controls={regionId}
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

SidebarCollapsibleCard.propTypes = propTypes
SidebarCollapsibleCard.defaultProps = defaultProps

export default SidebarCollapsibleCard
