// @flow
import React, { Component } from 'react'
import { BodyUI } from './styles/Section.css'
import classNames from '../../utilities/classNames'
import { Collapsible } from '../..'

type Props = {
  uuid: string,
  className?: string,
  isOpen: boolean,
  size?: string,
}

class Body extends Component<Props> {
  static displayName = 'AccordionSectionBody'

  render() {
    const { className, isOpen, size, uuid, ...rest } = this.props
    const id = `accordion__section__body--${uuid}`
    const componentClassName = classNames(
      'c-Accordion__Section__Body',
      isOpen && 'is-open',
      size && size === 'xs' && 'is-xs',
      size && size === 'sm' && 'is-sm',
      size && size === 'md' && 'is-md',
      className
    )

    return (
      <Collapsible id={id} isOpen={isOpen}>
        <BodyUI className={componentClassName} {...rest} />
      </Collapsible>
    )
  }
}

export default Body
