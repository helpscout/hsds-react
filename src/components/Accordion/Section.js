// @flow
import type { SectionProps } from './types'
import React, { Children, cloneElement, Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { BEM, classNames } from '../../utilities/classNames.ts'
import {
  namespaceComponent,
  isComponentNamed,
} from '../../utilities/component.ts'
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

  render() {
    const {
      uuid,
      className,
      duration,
      isPage,
      isSeamless,
      children,
      onOpen,
      onClose,
      sections,
      setOpen,
      size,
      ...rest
    } = this.props

    const isOpen = Object.keys(sections).length
      ? sections[uuid]
      : this.props.isOpen
    const componentClassName = getComponentClassName({ ...this.props, isOpen })
    const extraChildProps = {
      onOpen,
      onClose,
      isOpen,
      isPage,
      isSeamless,
      size,
      uuid,
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
