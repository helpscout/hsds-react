import * as React from 'react'
import { WithUuidProps, WithUuidState } from './Accordion.types'

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

export const mapConnectedPropsAsProps = connectedProps => {
  const { isOpen: isOpenProp, sections, uuid, ...rest } = connectedProps
  let isOpen = isOpenProp

  if (sections) {
    isOpen = Object.keys(sections).length ? sections[uuid] : isOpenProp
  }

  return {
    ...rest,
    isOpen: !!isOpen,
    uuid,
  }
}
