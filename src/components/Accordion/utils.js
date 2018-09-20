import type { WithUuidProps, WithUuidState } from './types'
import React, { Component } from 'react'

export const COMPONENT_KEY = {
  Accordion: 'Accordion',
  Body: 'Accordion.Body',
  Section: 'Accordion.Section',
  Title: 'Accordion.Title',
}

export const withUuid = (nextUuid: Function) => (
  WrappedComponent: Element<typeof Section>
): Element<typeof Section> => {
  class WithUuid extends Component<WithUuidProps, WithUuidState> {
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
