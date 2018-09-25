// @flow

// This Provider component is constructed using patterns adapted from libraries
// like Emotion and Styled Components. The have an internal Pub/Sub system that
// allows them nested Providers to communicate to pass along configs internally.
//
// The propConnect() component then subscribes to the closest PropProvider,
// where the extended props are then merged and rendered.
//
// https://github.com/emotion-js/emotion/blob/master/packages/emotion-theming/src/theme-provider.js

import type { PropProviderProps } from './types'
import React, { Component } from 'react'
import createBroadcast from '@helpscout/react-utils/dist/createBroadcast'
import { channel, contextTypes, getProps } from './utils'

type Props = {
  children: any,
  value: PropProviderProps,
}

class PropProvider extends Component<Props> {
  static childContextTypes = contextTypes
  static contextTypes = contextTypes

  outerProps: Object
  broadcast: *
  unsubscribeToOuterId: number

  componentWillMount() {
    // If there is a PropProvider wrapper anywhere around this PropProvider,
    // merge this prop value with the outer prop value
    if (this.context[channel] !== undefined) {
      this.unsubscribeToOuterId = this.context[channel].subscribe(props => {
        this.outerProps = props

        /* istanbul ignore next */
        if (this.broadcast !== undefined) {
          this.publish(this.props.value)
        }
      })
    }

    this.broadcast = createBroadcast(
      getProps(this.props.value, this.outerProps)
    )
  }

  getChildContext() {
    return {
      [channel]: {
        subscribe: this.broadcast.subscribe,
        unsubscribe: this.broadcast.unsubscribe,
      },
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    /* istanbul ignore else */
    if (this.props.value !== nextProps.value) {
      this.publish(nextProps.value)
    }
  }

  componentWillUnmount() {
    const propContext = this.context[channel]
    /* istanbul ignore else */
    if (propContext !== undefined) {
      propContext.unsubscribe(this.unsubscribeToOuterId)
    }
  }

  publish(props: PropProviderProps) {
    this.broadcast.publish(getProps(props, this.outerProps))
  }

  render() {
    const { children } = this.props

    if (!children) {
      return null
    }

    if (React.Children.count(children) > 1) {
      return <div className="c-PropProvider">{children}</div>
    }

    return React.Children.only(children)
  }
}

export default PropProvider
