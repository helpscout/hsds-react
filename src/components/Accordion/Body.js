// @flow
import React, { Component } from 'react'
import { BodyUI } from './styles/Section.css'
import classNames from '../../utilities/classNames'

type Props = {
  uuid: string,
  className?: string,
  isOpen: boolean,
}

class Body extends Component<Props> {
  static displayName = 'AccordionSectionBody'

  render() {
    const { className, disabled, expanded, isOpen, uuid, ...rest } = this.props

    const id = `accodion__section__body--${uuid}`
    const componentClassName = classNames(
      'c-Accordion__Section__Body',
      isOpen && 'is-open',
      className
    )

    return <BodyUI className={componentClassName} id={id} {...rest} />
  }
}

export default Body
