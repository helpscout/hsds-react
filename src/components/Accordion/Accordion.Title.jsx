import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Flexy from '../Flexy'
import Link from '../Link'
import Icon from '../Icon'
import Keys from '../../constants/Keys'
import { classNames } from '../../utilities/classNames'
import { BadgeUI, TitleContentUI, TitleUI } from './Accordion.css'
import { SectionContext } from './Accordion.Section'
import { AccordionContext } from './Accordion'
import { noop } from '../../utilities/other'
import SortableDragHandle from '../Sortable/Sortable.DragHandle'

export const classNameStrings = {
  baseComponentClassName: 'c-Accordion__Section__Title',
  iconCaretClassName: 'c-AccordionTitleCaretIcon',
  isCompactClassName: 'is-compact',
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
  isCompact,
  isOpen,
  isPage,
  isSeamless,
  isSortable,
  size,
  isLink,
}) => {
  const {
    baseComponentClassName,
    isCompactClassName,
    isLinkClassName,
    isOpenClassName,
    isPageClassName,
    isSeamlessClassName,
    isSortableClassName,
    isSizeXsClassName,
    isSizeSmClassName,
    isSizeMdClassName,
    isSizeLgClassName,
    isSizeXlClassName,
  } = classNameStrings

  return classNames(
    baseComponentClassName,
    isCompact && isCompactClassName,
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

const getIconName = (isOpen, isLink) => {
  let name = isOpen ? 'caret-up' : 'caret-down'
  if (isLink) {
    name = 'caret-right'
  }
  return name
}

const getDragHandleClassName = isPage => {
  const { isPageClassName } = classNameStrings

  return classNames('drag-handle', isPage && isPageClassName)
}

const AccordionTitle = props => {
  const {
    badge,
    children,
    className,
    isCompact,
    onClick,
    status,
    ...rest
  } = props
  const { uuid, isOpen } = useContext(SectionContext) || {}
  const {
    isPage,
    isSeamless,
    setSectionState = noop,
    size,
    isSorting,
    isSortable,
  } = useContext(AccordionContext) || {}

  const isLink = props.href || props.to
  const isIconOpen = isLink ? false : isOpen

  const componentClassName = getComponentClassName({
    className,
    isCompact,
    isOpen,
    isPage,
    isSeamless,
    size,
    isLink,
    isSortable,
    isSorting,
  })

  const restProps = isLink ? rest : getValidProps(rest)

  const handleClick = event => {
    onClick(event)
    if (event.isDefaultPrevented() || event.isPropagationStopped()) return
    if (isLink) return
    event && event.preventDefault()
    setSectionState(uuid, !isOpen)
  }

  const handleKeyPress = event => {
    const { ENTER, SPACE } = Keys

    if (event && (event.keyCode === ENTER || event.keyCode === SPACE)) {
      handleClick(event)
    }
  }

  const handleMouseDown = event => event.preventDefault()

  const iconProps = {
    className: classNameStrings.iconCaretClassName,
    faint: !isIconOpen,
    name: getIconName(isIconOpen, isLink),
    size: 14,
  }

  const badgeMarkup = badge ? (
    <Flexy.Item>
      <BadgeUI status={status} inverted={true}>
        {badge}
      </BadgeUI>
    </Flexy.Item>
  ) : null

  const dragHandle = isSortable ? (
    <SortableDragHandle
      className={getDragHandleClassName(isPage)}
      iconSize={isPage ? '24' : '20'}
      onDragStart={handleMouseDown}
    />
  ) : null

  const id = `accordion__section__title--${uuid}`
  const ariaControls = `accordion__section__body--${uuid}`

  return (
    <TitleUI
      {...restProps}
      aria-controls={ariaControls}
      aria-selected={isOpen}
      className={componentClassName}
      id={id}
      onClick={handleClick}
      onKeyDown={handleKeyPress}
      role="tab"
      tabIndex="0"
      as={isLink ? Link : 'div'}
    >
      {dragHandle}
      <TitleContentUI>
        <Flexy.Block>{children}</Flexy.Block>
        {badgeMarkup}
        <Flexy.Item>
          <Icon {...iconProps} />
        </Flexy.Item>
      </TitleContentUI>
    </TitleUI>
  )
}

AccordionTitle.defaultProps = {
  'data-cy': 'AccordionTitle',
  isCompact: false,
  onClick: noop,
}

AccordionTitle.propTypes = {
  /** Content to render. */
  children: PropTypes.any,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Callback to be invoked when clicked. */
  onClick: PropTypes.func,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default AccordionTitle
