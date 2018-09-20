// @flow
import React, { Children, cloneElement, Component, Element } from 'react'
import { SectionUI } from './styles/Accordion.css'
import Title from './Title'
import type { SectionProps } from './types'
import classNames, { BEM } from '../../utilities/classNames'
import { createUniqueIDFactory } from '../../utilities/id'

const bem = BEM('c-Accordion')

export const nextUuid = createUniqueIDFactory('AccordionSection')

export const classNameStrings = {
  baseComponentClassName: bem.element('Section'),
  isOpenClassName: 'is-open',
}

export const getComponentClassName = ({
  className,
  isOpen,
}: SectionProps): string => {
  const { baseComponentClassName, isOpenClassName } = classNameStrings
  return classNames(
    baseComponentClassName,
    isOpen && isOpenClassName,
    className
  )
}

class Section extends Component<SectionProps> {
  static defaultProps = {
    sections: {},
    setOpen: () => {},
  }

  static displayName = 'AccordionSection'

  render() {
    const {
      uuid,
      className,
      children,
      sections = {},
      setOpen,
      size,
      ...rest
    } = this.props
    const isOpen = sections[uuid]
    const componentClassName = getComponentClassName({ ...this.props, isOpen })
    const extraChildProps = { isOpen, size, uuid }

    return (
      <SectionUI className={componentClassName} {...rest}>
        {Children.map(children, child => {
          const extraProps = child.type === Title ? { setOpen } : {}
          return cloneElement(child, {
            ...child.props,
            ...extraChildProps,
            ...extraProps,
          })
        })}
      </SectionUI>
    )
  }
}

const withUuid = (
  WrappedComponent: Element<typeof Section>
): Element<typeof Section> =>
  class extends Component {
    constructor(props) {
      super(props)
      this.state = {
        uuid: nextUuid(),
      }
    }

    render() {
      const { uuid } = this.state
      return React.createElement(WrappedComponent, {
        ...this.props,
        uuid,
      })
    }
  }

export default withUuid(Section)
