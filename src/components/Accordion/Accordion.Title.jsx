import React, { useContext } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Flexy from '../Flexy'
import Link from '../Link'
import Icon from '../Icon'
import Keys from '../../constants/Keys'
import { classNames } from '../../utilities/classNames'
import { TitleUI } from './Accordion.css'
import { SectionContext } from './Accordion.Section'
import { AccordionContext } from './Accordion'
import { noop } from '../../utilities/other'
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
}

const getComponentClassName = ({
  className,
  isOpen,
  isPage,
  isSeamless,
  isSortable,
  size,
  isLink,
}) => {
  const {
    baseComponentClassName,
    isLinkClassName,
    isOpenClassName,
    isPageClassName,
    isSeamlessClassName,
    isSortableClassName,
    isSizeXsClassName,
    isSizeSmClassName,
    isSizeMdClassName,
    isSizeLgClassName,
  } = classNameStrings

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

const Title = props => {
  const { children, className, onClick, ...rest } = props
  const { uuid, isOpen } = useContext(SectionContext) || {}
  const { isPage, isSeamless, setOpen = noop, size, isSorting, isSortable } =
    useContext(AccordionContext) || {}

  const isLink = props.href || props.to || isSorting
  const isIconOpen = isLink ? false : isOpen

  const componentClassName = getComponentClassName({
    className,
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
    if (isLink) return
    event && event.preventDefault()
    setOpen(uuid, !isOpen)
  }

  const handleKeyPress = event => {
    const { ENTER, SPACE } = Keys

    if (event && (event.keyCode === ENTER || event.keyCode === SPACE)) {
      handleClick(event)
    }
  }

  const iconProps = {
    className: classNameStrings.iconCaretClassName,
    faint: !isIconOpen,
    name: getIconName(isIconOpen, isLink),
    size: 14,
  }

  const dragHandle = isSortable ? (
    <SortableDragHandle className={getDragHandleClassName(isPage)} />
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
      <Flexy>
        <Flexy.Block>{children}</Flexy.Block>
        <Flexy.Item>
          <Icon {...iconProps} />
        </Flexy.Item>
      </Flexy>
    </TitleUI>
  )
}

Title.defaultProps = {
  onClick: noop,
}

Title.displayName = 'AccordionSectionTitle'

export default Title
