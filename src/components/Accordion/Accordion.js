// @flow
import Body from './Body'
import React, { cloneElement, Children, Component } from 'react'
import Section from './Section'
import { AccordionUI } from './styles/Accordion.css'
import Title from './Title'
import type { AccordionProps } from './types'
import classNames from '../../utilities/classNames'

export const classNameStrings = {
  baseComponentClassName: 'c-Accordion',
  isAllowMuliple: 'is-allow-multiple',
}

export const getComponentClassName = ({
  allowMultiple,
  className,
}: AccordionProps): string => {
  const { baseComponentClassName, isAllowMultipleClassName } = classNameStrings
  return classNames(
    baseComponentClassName,
    allowMultiple && isAllowMultipleClassName,
    className
  )
}

class Accordion extends Component<AccordionProps> {
  static Body = Body
  static Section = Section
  static Title = Title

  static defaultProps = {
    size: 'md',
  }

  static displayName = 'Accordion'

  constructor(props) {
    super(props)

    this.state = { sections: {} }
    this.setOpen = this.setOpen.bind(this)
  }

  setOpen(uuid: string, isOpen: boolean) {
    const { allowMultiple } = this.props
    if (allowMultiple) {
      return this.setState({
        sections: {
          ...this.state.sections,
          [uuid]: isOpen,
        },
      })
    }
    return this.setState({
      sections: {
        [uuid]: isOpen,
      },
    })
  }

  render() {
    const { allowMultiple, className, children, size, ...rest } = this.props
    const { sections } = this.state
    const componentClassName = getComponentClassName(this.props)
    const extraProps = { sections, setOpen: this.setOpen, size }

    return (
      <AccordionUI className={componentClassName} role="tablist" {...rest}>
        {Children.map(children, child =>
          cloneElement(child, {
            ...child.props,
            ...extraProps,
          })
        )}
      </AccordionUI>
    )
  }
}

export default Accordion
