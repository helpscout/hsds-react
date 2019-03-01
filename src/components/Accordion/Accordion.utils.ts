import { WithUuidProps, WithUuidState } from './Accordion.types'
import * as React from 'react'

export const COMPONENT_KEY = {
  Accordion: 'Accordion',
  Body: 'AccordionBody',
  Section: 'AccordionSection',
  Title: 'AccordionTitle',
}

export const withUuid = (nextUuid: Function) => (
  WrappedComponent: any
): any => {
  class WithUuid extends React.Component<WithUuidProps, WithUuidState> {
    state = {
      uuid: nextUuid(),
    }

    render() {
      const { uuid } = this.state

      return React.createElement(WrappedComponent, {
        ...this.props,
        uuid,
      })
    }
  }

  return WithUuid
}
