import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import { default as Collapsible, propTypes as collapsibleTypes } from '../Collapsible'
import Flexy from '../Flexy'
import Heading from '../Heading'
import SortableDragHandle from '../Sortable/DragHandle'
import Icon from '../Icon'
import { createUniqueIDFactory } from '../../utilities/id'
import classNames from '../../utilities/classNames'

export const propTypes = Object.assign({}, collapsibleTypes, {
  header: PropTypes.element,
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  sortable: PropTypes.bool
})

export const defaultProps = {
  duration: 200,
  isOpen: false,
  sortable: false
}

const uniqueID = createUniqueIDFactory('SidebarCollapsibleCard')

class SidebarCollapsibleCard extends Component {
  constructor (props) {
    super()
    this.state = {
      id: props.id || uniqueID(),
      isOpen: props.isOpen
    }
    this.handleToggleOpen = this.handleToggleOpen.bind(this)
  }

  componentWillUpdate (nextProps, nextState) {
    if (this.props.isOpen !== nextProps.isOpen) {
      this.handleToggleOpen()
    }
  }

  handleToggleOpen () {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render () {
    const {
      children,
      className,
      duration,
      header,
      onClose,
      onOpen,
      isOpen,
      sortable,
      title,
      ...rest
    } = this.props
    const {
      isOpen: open,
      id: cardId
    } = this.state

    const componentClassName = classNames(
      'c-SidebarCollapsibleCard',
      open && 'is-open',
      className
    )

    const handleToggleOpen = this.handleToggleOpen

    const displayHeader = () => {
      if (header) return header
      if (title) {
        return (
          <Heading className='c-SidebarCollapsibleCard__title' size='h4' lineHeightReset>
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
        <SortableDragHandle className='c-SidebarCollapsibleCard__drag-handle' />
      </Flexy.Item>
    ) : null

    return (
      <div className={componentClassName} {...rest} role='presentation' id={cardId}>
        <a href='#' className='c-SidebarCollapsibleCard__header' onClick={handleToggleOpen} role='heading' aria-expanded={open} aria-controls={regionId}>
          <Flexy gap='sm'>
            <Flexy.Block>
              {headerMarkup}
            </Flexy.Block>
            {dragHandleMarkup}
            <Flexy.Item>
              <Icon name={iconName} size='14' muted />
            </Flexy.Item>
          </Flexy>
        </a>
        <div className='c-SidebarCollapsibleCard__body' role='region' id={regionId}>
          <Collapsible
            duration={duration}
            onOpen={onOpen}
            onClose={onClose}
            isOpen={open}
          >
            <div className='c-SidebarCollapsibleCard__content'>
              {children}
            </div>
          </Collapsible>
        </div>
      </div>
    )
  }
}

SidebarCollapsibleCard.propTypes = propTypes
SidebarCollapsibleCard.defaultProps = defaultProps

export default SidebarCollapsibleCard
