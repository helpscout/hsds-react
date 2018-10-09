// @flow
import type { MessageThemeContext } from './types'
import React, { Component } from 'react'
import styled from '../styled'
import Chat from './Chat'
import LoadingDots from '../LoadingDots'
import classNames from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import css from './styles/Embed.css.js'
import { COMPONENT_KEY } from './utils'

type Props = {
  className?: string,
  html: string,
}

type Context = MessageThemeContext

class Embed extends Component<Props, Context> {
  static displayName = 'Message.Embed'

  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
    }
    this.toggleLoading = this.toggleLoading.bind(this)
  }

  componentDidMount() {
    this.loadContent()
  }

  loadContent() {
    const iframes = this.htmlNode.getElementsByTagName('iframe')
    if (!iframes.length) {
      return this.toggleLoading()
    }
    const iframe = iframes[0]
    iframe.onload = this.toggleLoading
  }

  toggleLoading() {
    this.setState({
      isLoading: !this.state.isLoading,
    })
  }

  render() {
    const { className, html, ...rest } = this.props
    const { isLoading } = this.state
    const { theme } = this.context

    const componentClassName = classNames(
      'c-MessageEmbed',
      isLoading && 'is-loading',
      /* istanbul ignore next */
      // Tested, but Istanbul isn't picking it up.
      theme && `is-theme-${theme}`,
      className
    )

    return (
      <Chat
        {...rest}
        bubbleClassName="c-MessageEmbed__bubble"
        className={componentClassName}
      >
        <div
          dangerouslySetInnerHTML={{ __html: html }}
          className="c-MessageEmbed__html"
          ref={node => (this.htmlNode = node)}
        />
        {isLoading && <LoadingDots className="c-MessageEmbed__loading" />}
      </Chat>
    )
  }
}

namespaceComponent(COMPONENT_KEY.Embed)(Embed)

export default styled(Embed)(css)
