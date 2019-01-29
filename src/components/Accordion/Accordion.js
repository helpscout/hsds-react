// @flow
import type { AccordionProps, AccordionState } from './types'
import React, { cloneElement, Children, PureComponent } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Body from './Body'
import Section from './Section'
import Title from './Title'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
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

const buildOpenSections = sectionIds =>
  sectionIds.reduce(
    (accumulator, id) => ({
      ...accumulator,
      [id]: true,
    }),
    {}
  )

class Accordion extends PureComponent<AccordionProps, AccordionState> {
  static Body = Body
  static Section = Section
  static Title = Title

  static defaultProps = {
    onOpen: noop,
    onClose: noop,
    openSectionIds: [],
    size: 'md',
  }

  constructor(props) {
    super(props)

    this.state = {
      sections: buildOpenSections(props.openSectionIds),
    }
  }

  componentWillReceiveProps(nextProps) {
    this.forceSetOpen(nextProps)
  }

  forceSetOpen({ openSectionIds }) {
    const sections = buildOpenSections(openSectionIds)
    this.setState({ sections })
  }

  getOpenSectionIds() {
    const { sections } = this.state
    return Object.keys(sections).reduce((accumulator, key) => {
      if (sections[key] && sections[key] === true) {
        return [...accumulator, key]
      }
      return accumulator
    }, [])
  }

  onClose = uuid => {
    this.props.onClose(uuid, this.getOpenSectionIds())
  }

  onOpen = uuid => {
    this.props.onOpen(uuid, this.getOpenSectionIds())
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
      onOpen: this.onOpen,
      onClose: this.onClose,
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
