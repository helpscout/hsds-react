import React, { useContext } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Collapsible from '../Collapsible'
import { classNames } from '../../utilities/classNames'
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
    className
  )
}

export const Body = props => {
  const { className } = props
  /* istanbul ignore next */
  const { isPage, isSeamless, duration, onOpen, onClose, size } =
    useContext(AccordionContext) || {}
  /* istanbul ignore next */
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
    >
      <BodyUI {...getValidProps(props)} className={componentClassName} />
    </Collapsible>
  )
}

Body.displayName = 'AccordionBody'

export default Body
