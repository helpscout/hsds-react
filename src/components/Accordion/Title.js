// @flow
import type { TitleProps } from './types'
import React, { Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Flexy from '../Flexy'
import Icon from '../Icon'
import Keys from '../../constants/Keys'
import { BEM, classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { TitleUI } from './styles/Accordion.css.js'
import { COMPONENT_KEY } from './utils'

const bem = BEM('c-Accordion__Section')

export const classNameStrings = {
  baseComponentClassName: bem.element('Title'),
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
}: TitleProps): string => {
  const {
    baseComponentClassName,
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

class Title extends Component<TitleProps> {
  static defaultProps = {
    setOpen: () => {},
  }

  static displayName = 'AccordionSectionTitle'

  handleClick = (event: Event | SyntheticKeyboardEvent<HTMLElement>) => {
    event && event.preventDefault()
    const { isOpen, setOpen, uuid } = this.props
    setOpen(uuid, !isOpen)
  }

  handleKeyPress = (event: SyntheticKeyboardEvent<HTMLElement>) => {
    const { ENTER, SPACE } = Keys
    /* istanbul ignore else */
    if (event && (event.keyCode === ENTER || event.keyCode === SPACE)) {
      this.handleClick(event)
    }
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
    }

    return (
      <TitleUI
        {...getValidProps(rest)}
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

namespaceComponent(COMPONENT_KEY.Title)(Title)

export default Title
