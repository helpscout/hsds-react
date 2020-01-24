import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { AccordionProps, AccordionState } from './Accordion.types'
import PropProvider from '../PropProvider'
import propConnect from '../PropProvider/propConnect'
import Body from './Accordion.Body'
import Section from './Accordion.Section'
import Link from './Accordion.Link'
import Title from './Accordion.Title'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { AccordionUI } from './styles/Accordion.css'
import { COMPONENT_KEY } from './Accordion.utils'
import Sortable from '../Sortable'

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
  static Link = Link
  static Section = Section
  static Title = Title

  static defaultProps = {
    isPage: false,
    isSeamless: false,
    isSortable: false,
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

  getSubComponentProps() {
    const { duration, isPage, isSeamless, isSortable, size } = this.props
    const { sections } = this.state

    return {
      duration,
      isPage,
      isSeamless,
      isSortable,
      onOpen: this.onOpen,
      onClose: this.onClose,
      sections,
      setOpen: this.setOpen,
      size,
    }
  }

  getPropProviderProps = () => {
    const props = this.getSubComponentProps()
    return {
      [COMPONENT_KEY.Section]: props,
      [COMPONENT_KEY.Title]: props,
      [COMPONENT_KEY.Body]: props,
    }
  }

  render() {
    const { children, isSortable, ...rest } = this.props
    const componentClassName = getComponentClassName(this.props)

    const content = isSortable ? (
      <Sortable
        hideDragHandles
        lockAxis="y"
        pressDelay={200}
        useDragHandle={true}
      >
        {children}
      </Sortable>
    ) : (
      children
    )

    return (
      <AccordionUI
        {...getValidProps(rest)}
        className={componentClassName}
        role="tablist"
      >
        <PropProvider value={this.getPropProviderProps()}>
          {content}
        </PropProvider>
      </AccordionUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY.Accordion)(Accordion)

export default PropConnectedComponent
