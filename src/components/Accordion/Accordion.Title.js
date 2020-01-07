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

export const classNameStrings = {
  baseComponentClassName: 'c-Accordion__Section__Title',
  iconCaretClassName: 'c-AccordionTitleCaretIcon',
  isLinkClassName: 'is-link',
  isOpenClassName: 'is-open',
  isPageClassName: 'is-page',
  isSeamlessClassName: 'is-seamless',
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
  size,
  isLink,
}) => {
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
  } = classNameStrings

  return classNames(
    baseComponentClassName,
    isLink && isLinkClassName,
    !isLink && isOpen && isOpenClassName,
    isPage && isPageClassName,
    isSeamless && isSeamlessClassName,
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

const Title = props => {
  const { children, className, onClick, ...rest } = props
  const { uuid, isOpen } = useContext(SectionContext) || {}
  const { isPage, isSeamless, setOpen = noop, size } =
    useContext(AccordionContext) || {}

  const isLink = props.href || props.to
  const isIconOpen = isLink ? false : isOpen

  const componentClassName = getComponentClassName({
    className,
    isOpen,
    isPage,
    isSeamless,
    size,
    isLink,
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
    /* istanbul ignore else */
    if (event && (event.keyCode === ENTER || event.keyCode === SPACE)) {
      handleClick(event)
    }
  }

  const iconProps = {
    className: classNameStrings.iconCaretClassName,
    faint: !isIconOpen,
    name: getIconName(isIconOpen, isLink),
    size: isLink ? 14 : 18,
  }

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
