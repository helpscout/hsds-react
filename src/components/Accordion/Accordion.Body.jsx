import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { getValidProps } from '@hsds/utils-react'
import Collapsible from '../Collapsible'
import classNames from 'classnames'
import { BodyUI } from './Accordion.css'
import { AccordionContext } from './Accordion'
import { SectionContext } from './Accordion.Section'

export const classNameStrings = {
  baseComponentClassName: 'c-Accordion__Section__Body',
  isOpenClassName: 'is-open',
  isPageClassName: 'is-page',
  isSeamlessClassName: 'is-seamless',
  isSizeXsClassName: 'is-xs',
  isSizeSmClassName: 'is-sm',
  isSizeMdClassName: 'is-md',
  isSizeLgClassName: 'is-lg',
  isSizeXlClassName: 'is-xl',
}

const getComponentClassName = ({
  className,
  isOpen,
  isPage,
  isSeamless,
  size,
}) => {
  const {
    baseComponentClassName,
    isOpenClassName,
    isPageClassName,
    isSeamlessClassName,
    isSizeXsClassName,
    isSizeSmClassName,
    isSizeMdClassName,
    isSizeLgClassName,
    isSizeXlClassName,
  } = classNameStrings
  return classNames(
    baseComponentClassName,
    isOpen && isOpenClassName,
    isPage && isPageClassName,
    isSeamless && isSeamlessClassName,
    size && size === 'xs' && isSizeXsClassName,
    size && size === 'sm' && isSizeSmClassName,
    size && size === 'md' && isSizeMdClassName,
    size && size === 'lg' && isSizeLgClassName,
    size && size === 'xl' && isSizeXlClassName,
    className
  )
}

export const AccordionBody = props => {
  const { className, preRender } = props
  const { isPage, isSeamless, duration, onOpen, onClose, size } =
    useContext(AccordionContext) || {}
  const { isOpen, uuid } = useContext(SectionContext) || {}
  const componentClassName = getComponentClassName({
    className,
    isOpen,
    isPage,
    isSeamless,
    size,
  })
  const id = `accordion__section__body--${uuid}`

  return (
    <Collapsible
      duration={duration}
      id={id}
      isOpen={isOpen}
      onOpen={() => {
        onOpen(uuid)
      }}
      onClose={() => {
        onClose(uuid)
      }}
      preRenderContent={preRender}
    >
      <BodyUI {...getValidProps(props)} className={componentClassName} />
    </Collapsible>
  )
}

AccordionBody.defaultProps = {
  'data-cy': 'AccordionBody',
  preRender: false,
}

AccordionBody.propTypes = {
  /** Content to render. */
  children: PropTypes.any,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Flag indicating if content should be pre-rendered to the DOM (otherwise the content would not be in the DOM until opened) */
  preRender: PropTypes.bool,
}

export default AccordionBody
