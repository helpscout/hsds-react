import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../PropProvider/propConnect'
import Flexy from '../Flexy'
import Link from '../Link'
import Icon from '../Icon'
import Keys from '../../constants/Keys'
import { classNames } from '../../utilities/classNames'
import { memoize } from '../../utilities/memoize'
import { noop } from '../../utilities/other'
import { BadgeUI, TitleContentUI, makeTitleUI } from './styles/Accordion.css'
import { TitleProps, TitleState } from './Accordion.types'
import { COMPONENT_KEY, mapConnectedPropsAsProps } from './Accordion.utils'
import SortableDragHandle from '../Sortable/Sortable.DragHandle'

export const classNameStrings = {
  baseComponentClassName: 'c-Accordion__Section__Title',
  iconCaretClassName: 'c-AccordionTitleCaretIcon',
  isLinkClassName: 'is-link',
  isOpenClassName: 'is-open',
  isPageClassName: 'is-page',
  isSeamlessClassName: 'is-seamless',
  isSortableClassName: 'is-sortable',
  isSizeXsClassName: 'is-xs',
  isSizeSmClassName: 'is-sm',
  isSizeMdClassName: 'is-md',
  isSizeLgClassName: 'is-lg',
  isSizeXlClassName: 'is-xl',
}

const getComponentClassName = ({
  className,
  href,
  isOpen,
  isPage,
  isSeamless,
  isSortable,
  size,
  to,
}: TitleProps): string => {
  const {
    baseComponentClassName,
    isLinkClassName,
    isOpenClassName,
    isPageClassName,
    isSeamlessClassName,
    isSizeXsClassName,
    isSizeSmClassName,
    isSizeMdClassName,
    isSizeLgClassName,
    isSizeXlClassName,
    isSortableClassName,
  } = classNameStrings

  const isLink = href || to

  return classNames(
    baseComponentClassName,
    isLink && isLinkClassName,
    !isLink && isOpen && isOpenClassName,
    isPage && isPageClassName,
    isSeamless && isSeamlessClassName,
    isSortable && isSortableClassName,
    size && size === 'xs' && isSizeXsClassName,
    size && size === 'sm' && isSizeSmClassName,
    size && size === 'md' && isSizeMdClassName,
    size && size === 'lg' && isSizeLgClassName,
    size && size === 'xl' && isSizeXlClassName,
    className
  )
}

const getDragHandleClassName = ({ isPage }: TitleProps): string => {
  const { isPageClassName } = classNameStrings

  return classNames('drag-handle', isPage && isPageClassName)
}

class Title extends React.Component<TitleProps, TitleState> {
  static defaultProps = {
    isOpen: false,
    isPage: false,
    isSeamless: false,
    isSortable: false,
    setOpen: noop,
    onClick: noop,
    onOpen: noop,
    onClose: noop,
  }

  state = {
    isSorting: false,
  }

  static displayName = 'AccordionSectionTitle'

  makeTitleUI = memoize(makeTitleUI)

  getIsOpen() {
    if (this.getIsLink()) return false

    return this.props.isOpen
  }

  getIsLink() {
    return this.props.href || this.props.to
  }

  getIsSorting() {
    return this.props.isSorting
  }

  handleClick = (event: Event | KeyboardEvent) => {
    this.props.onClick(event)
    if (this.getIsLink() || this.getIsSorting()) return

    event && event.preventDefault()
    const { isOpen, setOpen, uuid } = this.props
    setOpen(uuid, !isOpen)
  }

  handleKeyPress = (event: KeyboardEvent) => {
    const { ENTER, SPACE } = Keys
    /* istanbul ignore else */
    if (event && (event.keyCode === ENTER || event.keyCode === SPACE)) {
      this.handleClick(event)
    }
  }

  handleMouseDown = (event: Event) => {
    event.preventDefault()
  }

  getTitleUI() {
    const selector = this.getIsLink() ? Link : 'div'

    // TODO: fix typescript complains
    // @ts-ignore
    return this.makeTitleUI(selector)
  }

  renderBadge() {
    const { badge, status } = this.props
    return badge ? (
      <Flexy.Item>
        <BadgeUI status={status} inverted={true}>
          {badge}
        </BadgeUI>
      </Flexy.Item>
    ) : null
  }

  renderIcon() {
    const isOpen = this.getIsOpen()
    const isLink = this.getIsLink()

    let name = isOpen ? 'caret-up' : 'caret-down'
    if (isLink) {
      name = 'caret-right'
    }

    const iconProps = {
      className: classNameStrings.iconCaretClassName,
      faint: !isOpen,
      name,
      size: 14,
    }

    return <Icon {...iconProps} />
  }

  render() {
    const { children, isOpen, isPage, isSortable, uuid, ...rest } = this.props

    const id = `accordion__section__title--${uuid}`
    const ariaControls = `accordion__section__body--${uuid}`
    const componentClassName = getComponentClassName(this.props)

    const TitleUI = this.getTitleUI()
    const restProps = this.getIsLink() ? rest : getValidProps(rest)

    const dragHandle = isSortable ? (
      <SortableDragHandle
        className={getDragHandleClassName(this.props)}
        iconSize={isPage ? '24' : '20'}
        onDragStart={this.handleMouseDown}
      />
    ) : null

    return (
      <TitleUI
        {...restProps}
        aria-controls={ariaControls}
        aria-selected={isOpen}
        className={componentClassName}
        id={id}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyPress}
        role="tab"
        tabIndex="0"
      >
        {dragHandle}
        <TitleContentUI>
          <Flexy.Block>{children}</Flexy.Block>
          <Flexy.Item>{this.renderBadge()}</Flexy.Item>
          <Flexy.Item>{this.renderIcon()}</Flexy.Item>
        </TitleContentUI>
      </TitleUI>
    )
  }
}

const remappedProps = (props, ownProps) => {
  const remappedConnectedProps = mapConnectedPropsAsProps(props)
  const isLink = ownProps.to || ownProps.href
  const isSeamless = isLink ? false : remappedConnectedProps.isSeamless

  return {
    ...remappedConnectedProps,
    isSeamless,
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY.Title, {
  mapConnectedPropsAsProps: remappedProps,
})(Title)

export default PropConnectedComponent
