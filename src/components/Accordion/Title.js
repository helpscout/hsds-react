// @flow
import { Icon, Flexy } from '../..'
import Keys from '../../constants/Keys'
import React, { Component } from 'react'
import { TitleUI } from './styles/Accordion.css'
import type { TitleProps } from './types'
import classNames, { BEM } from '../../utilities/classNames'

const bem = BEM('c-Accordion__Section')

export const classNameStrings = {
  baseComponentClassName: bem.element('Title'),
  isOpenClassName: 'is-open',
  isSeamlessClassName: 'is-seamless',
  isSizeXsClassName: 'is-xs',
  isSizeSmClassName: 'is-sm',
  isSizeMdClassName: 'is-md',
  isSizeLgClassName: 'is-lg',
}

export const getComponentClassName = ({
  className,
  isOpen,
  isSeamless,
  size,
}: TitleProps): string => {
  const {
    baseComponentClassName,
    isOpenClassName,
    isSeamlessClassName,
    isSizeXsClassName,
    isSizeSmClassName,
    isSizeMdClassName,
    isSizeLgClassName,
  } = classNameStrings
  return classNames(
    baseComponentClassName,
    isOpen && isOpenClassName,
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

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  handleClick = e => {
    e && e.preventDefault()
    const { isOpen, setOpen, uuid } = this.props
    setOpen(uuid, !isOpen)
  }

  handleKeyPress = e => {
    const { ENTER, SPACE } = Keys
    if (e && (e.charCode === ENTER || e.charCode === SPACE)) {
      this.handleClick(e)
    }
  }

  render() {
    const {
      className,
      children,
      isOpen,
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
        aria-controls={ariaControls}
        aria-selected={isOpen}
        className={componentClassName}
        id={id}
        onClick={this.handleClick}
        onKeyPress={this.handleKeyPress}
        role="tab"
        tabIndex="0"
        {...rest}
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

export default Title
