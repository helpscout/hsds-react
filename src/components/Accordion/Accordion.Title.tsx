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
  return classNames(
    baseComponentClassName,
    (href || to) && isLinkClassName,
    isOpen && isOpenClassName,
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

  isLink() {
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
    const selector = this.isLink() ? Link : 'div'

    return this.makeTitleUI(selector)
  }

  render() {
    const {
      className,
      children,
      isOpen,
      isPage,
      onOpen,
      onClose,
      setOpen,
      size,
      uuid,
      ...rest
    } = this.props

    const id = `accordion__section__title--${uuid}`
    const ariaControls = `accordion__section__body--${uuid}`
    const componentClassName = getComponentClassName(this.props)
    const iconProps = {
      faint: !isOpen,
      name: isOpen ? 'caret-up' : 'caret-down',
      size: 18,
    }

    const TitleUI = this.getTitleUI()
    const restProps = this.isLink() ? rest : getValidProps(rest)

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
          <Flexy.Item>
            <Icon {...iconProps} />
          </Flexy.Item>
        </Flexy>
      </TitleUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY.Title, {
  mapConnectedPropsAsProps,
})(Title)

export default PropConnectedComponent
