// @flow
import type { AccordionProps, AccordionState } from './types'
import React, { cloneElement, Children, Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Body from './Body'
import Section from './Section'
import Title from './Title'
import classNames from '../../utilities/classNames.ts'
import { namespaceComponent } from '../../utilities/component.ts'
import { noop } from '../../utilities/other'
import { AccordionUI } from './styles/Accordion.css.js'
import { COMPONENT_KEY } from './utils'

export const classNameStrings = {
  baseComponentClassName: 'c-Accordion',
  isAllowMultipleClassName: 'is-allow-multiple',
  isPageClassName: 'is-page',
  isSeamlessClassName: 'is-seamless',
}

const getComponentClassName = ({
  allowMultiple,
  className,
  isPage,
  isSeamless,
}: AccordionProps): string => {
  const {
    baseComponentClassName,
    isAllowMultipleClassName,
    isPageClassName,
    isSeamlessClassName,
  } = classNameStrings
  return classNames(
    baseComponentClassName,
    allowMultiple && isAllowMultipleClassName,
    isPage && isPageClassName,
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
      duration,
      onOpen,
      onClose,
      isPage,
      isSeamless,
      size,
      ...rest
    } = this.props
    const { sections } = this.state
    const componentClassName = getComponentClassName(this.props)
    const extraProps = {
      duration,
      isPage,
      isSeamless,
      onOpen,
      onClose,
      sections,
      setOpen: this.setOpen,
      size,
    }

    const content =
      Children.count(children) > 0
        ? Children.map(children, child =>
            cloneElement(child, {
              ...child.props,
              ...extraProps,
            })
          )
        : null

    return (
      <AccordionUI
        {...getValidProps(rest)}
        className={componentClassName}
        role="tablist"
      >
        {content}
      </AccordionUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY.Accordion)(Accordion)

export default Accordion
