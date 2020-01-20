import React, { createContext, useContext, useState } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { useComponentId } from './Accordion.utils'
import { SectionUI } from './Accordion.css'
import { AccordionContext } from './Accordion'
import { createUniqueIDFactory } from '../../utilities/id'

const nextUuid = createUniqueIDFactory('AccordionSection')

export const SectionContext = createContext()

export const classNameStrings = {
  baseComponentClassName: 'c-Accordion__Section',
  isOpenClassName: 'is-open',
  isSeamlessClassName: 'is-seamless',
}

const getComponentClassName = ({ className, isOpen, isLink }) => {
  let { isSeamless } = useContext(AccordionContext) || {}

  if (isLink) isSeamless = false

  const {
    baseComponentClassName,
    isOpenClassName,
    isSeamlessClassName,
  } = classNameStrings

  return classNames(
    baseComponentClassName,
    isOpen && isOpenClassName,
    isSeamless && isSeamlessClassName,
    className
  )
}

const getIsOpen = ({ isLink, isOpen, uuid }) => {
  if (isLink) return false

  const { sections = {} } = useContext(AccordionContext) || {}

  return !!(Object.keys(sections).length ? sections[uuid] : isOpen)
}

export const Section = props => {
  const { children, ...rest } = props

  const [uuid] = useState(props.id || nextUuid())

  const isOpen = getIsOpen({ ...props, uuid })

  const componentClassName = getComponentClassName({ ...props, isOpen })

  const sectionContextValue = { uuid, isOpen }

  return (
    <SectionUI {...getValidProps(rest)} className={componentClassName}>
      <SectionContext.Provider value={sectionContextValue}>
        {children}
      </SectionContext.Provider>
    </SectionUI>
  )
}

Section.defaultProps = {
  isLink: false,
}

Section.displayName = 'AccordionSection'

export default Section
