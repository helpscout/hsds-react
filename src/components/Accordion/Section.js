// @flow
import type { SectionProps } from './types'
import React, { Children, cloneElement, Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { BEM, classNames } from '../../utilities/classNames'
import { namespaceComponent, isComponentNamed } from '../../utilities/component'
import { createUniqueIDFactory } from '../../utilities/id'
import { noop } from '../../utilities/other'
import { COMPONENT_KEY, withUuid } from './utils'
import { SectionUI } from './styles/Accordion.css.js'

const bem = BEM('c-Accordion')
const nextUuid = createUniqueIDFactory('AccordionSection')

export const classNameStrings = {
  baseComponentClassName: bem.element('Section'),
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

class Section extends Component<SectionProps> {
  static defaultProps = {
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
    const extraChildProps = {
      onOpen,
      onClose,
      isOpen,
      isPage,
      isSeamless,
      size,
      uuid: sectionId,
    }

    const content =
      Children.count(children) > 0
        ? Children.map(children, child => {
            const extraProps = isComponentNamed(child, COMPONENT_KEY.Title)
              ? { setOpen }
              : { duration }
            return cloneElement(child, {
              ...child.props,
              ...extraChildProps,
              ...extraProps,
            })
          })
        : null

    return (
      <SectionUI {...getValidProps(rest)} className={componentClassName}>
        {content}
      </SectionUI>
    )
  }
}

const enhancedSection = withUuid(nextUuid)(Section)

namespaceComponent(COMPONENT_KEY.Section)(enhancedSection)

export default enhancedSection
