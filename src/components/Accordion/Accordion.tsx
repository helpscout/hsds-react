import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { AccordionProps, AccordionState } from './Accordion.types'
import propConnect from '../PropProvider/propConnect'
import Body from './Accordion.Body'
import Section from './Accordion.Section'
import Title from './Accordion.Title'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { AccordionUI } from './Accordion.css'
import { COMPONENT_KEY } from './Accordion.utils'

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

const stringifyArray = arr => arr.sort().toString()

const didOpenSectionIdsChange = (prevSectionIds, nextSectionIds) =>
  stringifyArray(prevSectionIds) !== stringifyArray(nextSectionIds)

export class Accordion extends React.PureComponent<
  AccordionProps,
  AccordionState
> {
  static Body = Body
  static Section = Section
  static Title = Title

  static defaultProps = {
    isPage: false,
    isSeamless: false,
    onOpen: noop,
    onClose: noop,
    openSectionIds: [],
    size: 'md',
  }

  state = {
    sections: buildOpenSections(this.props.openSectionIds),
  }

  componentWillReceiveProps(nextProps) {
    const { openSectionIds: nextOpenSectionIds } = nextProps
    const { openSectionIds: prevOpenSectionIds } = this.props

    if (didOpenSectionIdsChange(prevOpenSectionIds, nextOpenSectionIds)) {
      this.forceSetOpen(nextProps)
    }
  }

  forceSetOpen({ openSectionIds }) {
    const sections = buildOpenSections(openSectionIds)
    this.setState({ sections })
  }

  getOpenSectionIds(): Array<any> {
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
      React.Children.count(children) > 0
        ? React.Children.map(children, child =>
            React.cloneElement(child, {
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

const PropConnectedComponent = propConnect(COMPONENT_KEY.Accordion)(Accordion)

export default PropConnectedComponent
