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
}) => {
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

const getOpenSectionIds = sections => {
  return Object.keys(sections).reduce((accumulator, key) => {
    if (sections[key] && sections[key] === true) {
      return [...accumulator, key]
    }
    return accumulator
  }, [])
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
    ...rest
  } = props

  const [sections, setOpenSections] = useState({})

  const { isPage: isPageContext, isSeamless: isSeamlessContext } = useContext(
    PageContext
  )

  const isPage = isPageContext || isPageProps
  const isSeamless = isSeamlessProps || isSeamlessContext

  useEffect(() => {
    setOpenSections(buildOpenSections(openSectionIds))
  }, [stringifyArray(openSectionIds)])

  const onClose = uuid => {
    props.onClose(uuid, getOpenSectionIds(sections))
  }

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

  const contextValue = {
    duration,
    isPage,
    isSeamless,
    onOpen,
    onClose,
    sections,
    setOpen,
    size,
  }

  return (
    <AccordionUI
      {...getValidProps(rest)}
      className={getComponentClassName({ ...props, isSeamless, isPage })}
      role="tablist"
    >
      <AccordionContext.Provider value={contextValue}>
        {children}
      </AccordionContext.Provider>
    </AccordionUI>
  )
}

Accordion.defaultProps = {
  isPage: false,
  isSeamless: false,
  onOpen: noop,
  onClose: noop,
  openSectionIds: [],
  size: 'md',
}

Accordion.Body = Body
Accordion.Link = Link
Accordion.Section = Section
Accordion.Title = Title

export default Accordion
