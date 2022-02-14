import React, { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from 'classnames'
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
  // eslint-disable-next-line react-hooks/rules-of-hooks
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

AccordionSection.propTypes = {
  /** Content to render. */
  children: PropTypes.any,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** The id used to track the section's open state. */
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Renders a Link based UI. */
  isLink: PropTypes.bool,
  /** Callback to be invoked when the section is opened. */
  onOpen: PropTypes.func,
  /** Callback to be invoked when the section is closed. */
  onClose: PropTypes.func,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default AccordionSection
