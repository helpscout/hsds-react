import React, { createContext, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import AccordionBody from './Accordion.Body'
import AccordionHeading from './Accordion.Heading'
import AccordionLink from './Accordion.Link'
import AccordionSection from './Accordion.Section'
import AccordionSubheading from './Accordion.Subheading'
import AccordionTitle from './Accordion.Title'
import classNames from 'classnames'
import { AccordionUI } from './Accordion.css'
import { PageContext } from '../Page/Page'
import Sortable from '../Sortable'

const noop = () => undefined

export const classNameStrings = {
  baseComponentClassName: 'c-Accordion',
  isAllowMultipleClassName: 'is-allow-multiple',
  isPageClassName: 'is-page',
  isSeamlessClassName: 'is-seamless',
  isSortableClassName: 'is-sortable',
  isSortingClassName: 'is-sorting',
}

const getComponentClassName = ({
  allowMultiple,
  className,
  isPage,
  isSeamless,
  isSorting,
  isSortable,
}) => {
  const {
    baseComponentClassName,
    isAllowMultipleClassName,
    isPageClassName,
    isSeamlessClassName,
    isSortableClassName,
    isSortingClassName,
  } = classNameStrings
  return classNames(
    baseComponentClassName,
    allowMultiple && isAllowMultipleClassName,
    isPage && isPageClassName,
    isSeamless && isSeamlessClassName,
    isSortable && isSortableClassName,
    isSorting && isSortingClassName,
    className
  )
}

export const getSortableProps = ({ distance, pressDelay }) => {
  return distance > 0 ? { distance } : { pressDelay }
}

const useSectionState = (originalState, allowMultiple) => {
  const [openSections, setOpenSections] = useState(originalState)

  const setSectionState = (uuid, isOpen) => {
    setOpenSections(isOpen ? [uuid] : [])
  }

  const setMultipleState = (uuid, isOpen) => {
    if (isOpen) {
      const newSections = [...openSections, uuid]
      setOpenSections(
        newSections.filter((item, pos) => newSections.indexOf(item) === pos)
      )
    } else {
      setOpenSections(openSections.filter(id => id !== uuid))
    }
  }

  return [openSections, allowMultiple ? setMultipleState : setSectionState]
}

export const AccordionContext = createContext(null)

const Accordion = props => {
  const {
    allowMultiple,
    children,
    duration,
    isPage: isPageProps,
    isSeamless: isSeamlessProps,
    isSortable,
    onSortEnd,
    openSectionIds,
    size,
    useWindowAsScrollContainer,
    ...rest
  } = props

  const [isSorting, setIsSorting] = useState(false)
  const [openSections, setSectionState] = useSectionState(
    openSectionIds,
    allowMultiple
  )

  const { accordion = {} } = useContext(PageContext)
  const isPage = accordion.isPage || isPageProps
  const isSeamless = accordion.isSeamless || isSeamlessProps

  const onClose = uuid => {
    props.onClose(uuid, openSections)
  }

  const onOpen = uuid => {
    props.onOpen(uuid, openSections)
  }

  const getContainer = () => {
    return document.querySelector('.hsds-react') || document.body
  }

  const contextValue = {
    duration,
    isPage,
    isSeamless,
    isSortable,
    isSorting,
    onClose,
    onOpen,
    // WARN: we use the internal state only if there is no outside method to update the list of open sections
    openSections: props.setSectionState ? openSectionIds : openSections,
    setSectionState: props.setSectionState || setSectionState,
    size,
  }

  let content = children
  if (isSortable) {
    content = (
      <Sortable
        helperClass="is-sorting-item"
        lockAxis="y"
        helperContainer={getContainer}
        onSortStart={() => setIsSorting(true)}
        onSortEnd={(...args) => {
          setIsSorting(false)
          onSortEnd(...args)
        }}
        useWindowAsScrollContainer={useWindowAsScrollContainer}
        {...getSortableProps(rest)}
      >
        {children}
      </Sortable>
    )
  }

  return (
    <AccordionUI
      {...getValidProps(rest)}
      className={getComponentClassName({
        ...props,
        isSeamless,
        isPage,
        isSortable,
        isSorting,
      })}
      role="tablist"
    >
      <AccordionContext.Provider value={contextValue}>
        {content}
      </AccordionContext.Provider>
    </AccordionUI>
  )
}

Accordion.defaultProps = {
  'data-cy': 'Accordion',
  distance: 5,
  isPage: false,
  isSeamless: false,
  isSortable: false,
  onClose: noop,
  onOpen: noop,
  onSortEnd: noop,
  openSectionIds: [],
  pressDelay: 0,
  size: 'md',
  useWindowAsScrollContainer: false,
}

Accordion.propTypes = {
  /** Allows multiple sections to have their body revealed simultaneously. */
  allowMultiple: PropTypes.bool,
  /** Sections to be stacked and controlled. */
  children: PropTypes.any,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** When isSortable is true, the distance determines how far a user must drag in order to sort. */
  distance: PropTypes.number,
  /** Exclude borders and horizontal padding. */
  isSeamless: PropTypes.bool,
  /** Adds styling to fit inside a <Page> component */
  isPage: PropTypes.bool,
  /** Enable sections to be re-ordered by drag and drop. */
  isSortable: PropTypes.bool,
  /** Callback to be invoked when the body of a section is revealed. */
  onOpen: PropTypes.func,
  /** Callback to be invoked when the body of a section is concealed. */
  onClose: PropTypes.func,
  /** When is sortable is true, callback to be invoked when sorting ends. */
  onSortEnd: PropTypes.func,
  /** An array of ids corresponding to sections that should be open. */
  openSectionIds: PropTypes.array,
  /** When isSortable is true and distance is 0, the time in ms that must elapse on a press in order to sort. */
  pressDelay: PropTypes.number,
  /** The amount of padding. */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

Accordion.Body = AccordionBody
Accordion.Heading = AccordionHeading
Accordion.Link = AccordionLink
Accordion.Section = AccordionSection
Accordion.Subheading = AccordionSubheading
Accordion.Title = AccordionTitle

export default Accordion
