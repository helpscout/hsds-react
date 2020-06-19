import React, { createContext, useContext, useState } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { SectionUI } from './Accordion.css'
import { AccordionContext } from './Accordion'
import { createUniqueIDFactory } from '../../utilities/id'

const nextUuid = createUniqueIDFactory('AccordionSection')

export const SectionContext = createContext()

export const classNameStrings = {
  baseComponentClassName: 'c-Accordion__Section',
  isLinkClassName: 'is-link',
  isOpenClassName: 'is-open',
  isSeamlessClassName: 'is-seamless',
  isStatusInfoClassName: 'is-info',
  isStatusErrorClassName: 'is-error',
}

const getComponentClassName = ({ className, isOpen, isLink, status }) => {
  let { isSeamless } = useContext(AccordionContext) || {}

  if (isLink) isSeamless = false

  const {
    baseComponentClassName,
    isLinkClassName,
    isOpenClassName,
    isSeamlessClassName,
    isStatusInfoClassName,
    isStatusErrorClassName,
  } = classNameStrings

  return classNames(
    baseComponentClassName,
    isLink && isLinkClassName,
    isOpen && isOpenClassName,
    isSeamless && isSeamlessClassName,
    status && status === 'info' && isStatusInfoClassName,
    status && status === 'error' && isStatusErrorClassName,
    className
  )
}

const isSectionOpen = ({ isLink, uuid }, openSections) => {
  if (isLink) return false
  return openSections.includes(uuid)
}

export const AccordionSection = props => {
  const { children, ...rest } = props

  const [uuid] = useState(props.id || nextUuid())
  const { openSections = [] } = useContext(AccordionContext) || {}

  const isOpen = isSectionOpen({ ...props, uuid }, openSections)

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

AccordionSection.defaultProps = {
  'data-cy': 'AccordionSection',
  isLink: false,
}

export default AccordionSection
