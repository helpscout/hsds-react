// @flow
import { Collapsible } from '../../'
import React, { Component } from 'react'
import { BodyUI } from './styles/Accordion.css'
import type { BodyProps } from './types'
import classNames, { BEM } from '../../utilities/classNames'

const bem = BEM('c-Accordion__Section')

export const classNameStrings = {
  baseComponentClassName: bem.element('Body'),
  isOpenClassName: 'is-open',
  isSizeXsClassName: 'is-xs',
  isSizeSmClassName: 'is-sm',
  isSizeMdClassName: 'is-md',
  isSizeLgClassName: 'is-lg',
}

export const getComponentClassName = ({
  className,
  isOpen,
  size,
}: BodyProps): string => {
  const {
    baseComponentClassName,
    isOpenClassName,
    isSizeXsClassName,
    isSizeSmClassName,
    isSizeMdClassName,
    isSizeLgClassName,
  } = classNameStrings
  return classNames(
    baseComponentClassName,
    isOpen && isOpenClassName,
    size && size === 'xs' && isSizeXsClassName,
    size && size === 'sm' && isSizeSmClassName,
    size && size === 'md' && isSizeMdClassName,
    size && size === 'lg' && isSizeLgClassName,
    className
  )
}

class Body extends Component<BodyProps> {
  static display = 'AccordionSectionBody'

  render() {
    const { className, isOpen, size, uuid, ...rest } = this.props
    const id = `accordion__section__body--${uuid}`
    const componentClassName = getComponentClassName(this.props)

    return (
      <Collapsible id={id} isOpen={isOpen}>
        <BodyUI className={componentClassName} {...rest} />
      </Collapsible>
    )
  }
}

export default Body
