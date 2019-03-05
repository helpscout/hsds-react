import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import PropProvider from '../PropProvider'
import propConnect from '../PropProvider/propConnect'
import { classNames } from '../../utilities/classNames'
import { createUniqueIDFactory } from '../../utilities/id'
import { noop } from '../../utilities/other'
import { COMPONENT_KEY, withUuid } from './Accordion.utils'
import { SectionProps } from './Accordion.types'
import { SectionUI } from './Accordion.css'

const nextUuid = createUniqueIDFactory('AccordionSection')

export const classNameStrings = {
  baseComponentClassName: 'c-Accordion__Section',
  isOpenClassName: 'is-open',
  isSeamlessClassName: 'is-seamless',
}

const getComponentClassName = ({
  className,
  isOpen,
  isSeamless,
}: SectionProps): string => {
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

export class Section extends React.Component<SectionProps> {
  static defaultProps = {
    isOpen: false,
    isPage: false,
    isSeamless: false,
    sections: {},
    setOpen: noop,
  }

  getId() {
    const { id, uuid } = this.props
    return id || uuid
  }

  render() {
    const {
      className,
      duration,
      id,
      isPage,
      isSeamless,
      children,
      onOpen,
      onClose,
      sections,
      setOpen,
      size,
      uuid,
      ...rest
    } = this.props

    const sectionId = this.getId()
    const isOpen = Object.keys(sections).length
      ? sections[sectionId]
      : this.props.isOpen
    const componentClassName = getComponentClassName({ ...this.props, isOpen })

    const childProps = {
      uuid: sectionId,
    }

    const propProviderValue = {
      [COMPONENT_KEY.Title]: childProps,
      [COMPONENT_KEY.Body]: childProps,
    }

    return (
      <SectionUI {...getValidProps(rest)} className={componentClassName}>
        <PropProvider value={propProviderValue}>{children}</PropProvider>
      </SectionUI>
    )
  }
}

const enhancedSection = withUuid(nextUuid)(Section)

const PropConnectedComponent = propConnect(COMPONENT_KEY.Section)(
  enhancedSection
)

export default PropConnectedComponent
