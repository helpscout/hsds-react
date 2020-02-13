import React, { createContext, useState, useEffect, useContext } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Body from './Accordion.Body'
import Section from './Accordion.Section'
import Link from './Accordion.Link'
import Title from './Accordion.Title'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { AccordionUI } from './Accordion.css'
import { stringifyArray } from './Accordion.utils'
import { PageContext } from '../Page/Page'
import Sortable from '../Sortable'
import { GlobalContext } from '../HSDS/Provider'

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
    /* istanbul ignore next */
    isSorting && isSortingClassName,
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

/* istanbul ignore next */
const getOpenSectionIds = sections => {
  return Object.keys(sections).reduce((accumulator, key) => {
    if (sections[key] && sections[key] === true) {
      return [...accumulator, key]
    }
    return accumulator
  }, [])
}

export const getSortableProps = ({ distance, pressDelay }) => {
  return distance > 0 ? { distance } : { pressDelay }
}

export const AccordionContext = createContext(null)

const Accordion = props => {
  const {
    children,
    openSectionIds,
    duration,
    isPage: isPageProps,
    isSeamless: isSeamlessProps,
    size,
    isSortable,
    onSortEnd,
    ...rest
  } = props

  const [sections, setOpenSections] = useState({})
  const [isSorting, setIsSorting] = useState(false)

  const { accordion = {} } = useContext(PageContext)
  const { getCurrentScope } = React.useContext(GlobalContext) || {}
  /* istanbul ignore next */
  const scope = getCurrentScope ? getCurrentScope() : null

  const isPage = accordion.isPage || isPageProps
  const isSeamless = accordion.isSeamless || isSeamlessProps

  useEffect(() => {
    setOpenSections(buildOpenSections(openSectionIds))
  }, [stringifyArray(openSectionIds)])

  /* istanbul ignore next */
  const onClose = uuid => {
    props.onClose(uuid, getOpenSectionIds(sections))
  }

  /* istanbul ignore next */
  const onOpen = uuid => {
    props.onOpen(uuid, getOpenSectionIds(sections))
  }

  const setOpen = (uuid, isOpen) => {
    const { allowMultiple } = props

    if (allowMultiple) {
      return setOpenSections({
        ...sections,
        [uuid]: isOpen,
      })
    }
    return setOpenSections({
      [uuid]: isOpen,
    })
  }

  /* istanbul ignore next */
  const getContainer = () => {
    if (scope) {
      return document.querySelector(`.${scope}`)
    }

    return document.body
  }

  const contextValue = {
    duration,
    isPage,
    isSeamless,
    isSortable,
    isSorting,
    onClose,
    onOpen,
    sections,
    setOpen,
    size,
  }

  let content = children
  if (isSortable) {
    content = (
      <Sortable
        helperClass="is-sorting-item"
        lockAxis="y"
        helperContainer={getContainer}
        onSortStart={/* istanbul ignore next */ () => setIsSorting(true)}
        onSortEnd={(...args) => {
          setIsSorting(false)
          onSortEnd(...args)
        }}
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
}

Accordion.Body = Body
Accordion.Link = Link
Accordion.Section = Section
Accordion.Title = Title

export default Accordion
