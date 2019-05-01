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
import { makeTitleUI } from './Accordion.css'
import { TitleProps } from './Accordion.types'
import { COMPONENT_KEY, mapConnectedPropsAsProps } from './Accordion.utils'

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
  href,
  isOpen,
  isPage,
  isSeamless,
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
  } = classNameStrings

  const isLink = href || to

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

class Title extends React.Component<TitleProps> {
  static defaultProps = {
    isOpen: false,
    isPage: false,
    isSeamless: false,
    setOpen: noop,
    onOpen: noop,
    onClose: noop,
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

  handleClick = (event: Event | KeyboardEvent) => {
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

  getTitleUI() {
    const selector = this.getIsLink() ? Link : 'div'

    // TODO: fix typescript complains
    // @ts-ignore
    return this.makeTitleUI(selector)
  }

  renderIcon() {
    const isOpen = this.getIsOpen()
    const isLink = this.getIsLink()

    let name = isOpen ? 'caret-up' : 'caret-down'
    if (isLink) {
      name = 'caret-right'
    }

    const size = isLink ? 14 : 18

    const iconProps = {
      className: classNameStrings.iconCaretClassName,
      faint: !isOpen,
      name,
      size,
    }

    return <Icon {...iconProps} />
  }

  render() {
    const { children, isOpen, uuid, ...rest } = this.props

    const id = `accordion__section__title--${uuid}`
    const ariaControls = `accordion__section__body--${uuid}`
    const componentClassName = getComponentClassName(this.props)

    const TitleUI = this.getTitleUI()
    const restProps = this.getIsLink() ? rest : getValidProps(rest)

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
        <Flexy>
          <Flexy.Block>{children}</Flexy.Block>
          <Flexy.Item>{this.renderIcon()}</Flexy.Item>
        </Flexy>
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
