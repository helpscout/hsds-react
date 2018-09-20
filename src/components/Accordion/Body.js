// @flow
import type { BodyProps } from './types'
import React, { Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Collapsible from '../Collapsible'
import { BEM, classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { noop } from '../../utilities/other'
import { BodyUI } from './styles/Accordion.css.js'
import { COMPONENT_KEY } from './utils'

const bem = BEM('c-Accordion__Section')

export const classNameStrings = {
  baseComponentClassName: bem.element('Body'),
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
}: BodyProps): string => {
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

class Body extends Component<BodyProps> {
  static defaultProps = {
    onOpen: noop,
    onClose: noop,
  }

  handleOnOpen = () => {
    const { onOpen, uuid } = this.props

    onOpen(uuid)
  }

  handleOnClose = () => {
    const { onClose, uuid } = this.props

    onClose(uuid)
  }

  render() {
    const {
      className,
      isOpen,
      onOpen,
      onClose,
      size,
      uuid,
      ...rest
    } = this.props
    const id = `accordion__section__body--${uuid}`
    const componentClassName = getComponentClassName(this.props)

    return (
      <Collapsible
        id={id}
        isOpen={isOpen}
        onOpen={this.handleOnOpen}
        onClose={this.handleOnClose}
      >
        <BodyUI {...getValidProps(rest)} className={componentClassName} />
      </Collapsible>
    )
  }
}

namespaceComponent(COMPONENT_KEY.Body)(Body)

export default Body
