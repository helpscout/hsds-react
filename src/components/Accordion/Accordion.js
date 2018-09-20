// @flow
import type { AccordionProps, AccordionState } from './types'
import React, { cloneElement, Children, Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Body from './Body'
import Section from './Section'
import Title from './Title'
import classNames from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { noop } from '../../utilities/other'
import { AccordionUI } from './styles/Accordion.css.js'
import { COMPONENT_KEY } from './utils'

export const classNameStrings = {
  baseComponentClassName: 'c-Accordion',
  isAllowMultipleClassName: 'is-allow-multiple',
  isSeamlessClassName: 'is-seamless',
}

export const getComponentClassName = ({
  allowMultiple,
  className,
  isSeamless,
}: AccordionProps): string => {
  const {
    baseComponentClassName,
    isAllowMultipleClassName,
    isSeamlessClassName,
  } = classNameStrings
  return classNames(
    baseComponentClassName,
    allowMultiple && isAllowMultipleClassName,
    isSeamless && isSeamlessClassName,
    className
  )
}

class Accordion extends Component<AccordionProps, AccordionState> {
  static Body = Body
  static Section = Section
  static Title = Title

  static defaultProps = {
    onOpen: noop,
    onClose: noop,
    size: 'md',
  }

  state = {
    sections: {},
  }

  setOpen = (uuid: string, isOpen: boolean) => {
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
    const {
      allowMultiple,
      className,
      children,
      onOpen,
      onClose,
      isSeamless,
      size,
      ...rest
    } = this.props
    const { sections } = this.state
    const componentClassName = getComponentClassName(this.props)
    const extraProps = {
      isSeamless,
      onOpen,
      onClose,
      sections,
      setOpen: this.setOpen,
      size,
    }

    return (
      <AccordionUI
        {...getValidProps(rest)}
        className={componentClassName}
        role="tablist"
      >
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

namespaceComponent(COMPONENT_KEY.Accordion)(Accordion)

export default Accordion
