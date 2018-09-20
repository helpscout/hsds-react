// @flow
import React, { Children, Component } from 'react'
import classNames from '../../utilities/classNames'
import { createUniqueIDFactory } from '../../utilities/id'
import { SectionUI } from './styles/Section.css'
import Title from './Title'

const nextUuid = createUniqueIDFactory('AccordionSection')

export const withUuid = WrappedComponent =>
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

type Props = {
  uuid: string,
  className?: string,
  sections: object,
  setOpen: () => void,
  size?: string,
}

class Section extends Component<Props> {
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
    const componentClassName = classNames(
      'c-Accordion__Section',
      isOpen && 'is-open',
      className
    )

    return (
      <SectionUI className={componentClassName} {...rest}>
        {Children.map(children, child => {
          const props = child.type === Title ? { setOpen } : {}

          return React.cloneElement(child, {
            ...child.props,
            uuid,
            isOpen,
            size,
            ...props,
          })
        })}
      </SectionUI>
    )
  }
}

export default withUuid(Section)
