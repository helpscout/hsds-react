import React, { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
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

Section.propTypes = {
  /** Content to render. */
  children: PropTypes.any,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** The id used to track the section's open state. */
  id: PropTypes.string,
  /** Renders a Link based UI. */
  isLink: PropTypes.bool,
  /** Callback to be invoked when the section is opened. */
  onOpen: PropTypes.func,
  /** Callback to be invoked when the section is closed. */
  onClose: PropTypes.func,
}

Section.displayName = 'AccordionSection'

export default Section
