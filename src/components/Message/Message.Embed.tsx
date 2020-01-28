import * as React from 'react'
import { MessageChat, MessageThemeContext } from './Message.types'
import LoadingDots from '../LoadingDots'
import { classNames } from '../../utilities/classNames'
import { EmbedUI } from './Message.Embed.css'

type Props = MessageChat & {
  className?: string
  html?: string
}

type State = {
  isLoading: boolean
}

type Context = MessageThemeContext

class Embed extends React.Component<Props, State> {
  static displayName = 'Message.Embed'

  state = {
    isLoading: true,
  }
  context: Context

  node: HTMLDivElement

  componentDidMount() {
    this.loadContent()
  }

  loadContent = () => {
    /* istanbul ignore next */
    if (!this.node) return

    const iframes = this.node.getElementsByTagName('iframe')

    if (!iframes.length) {
      return this.toggleLoading()
    }
    const iframe = iframes[0]
    iframe.onload = this.toggleLoading
  }

  toggleLoading = () => {
    this.setState({
      isLoading: !this.state.isLoading,
    })
  }

  setNodeRef = (node: HTMLDivElement) => (this.node = node)

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
      <EmbedUI
        {...rest}
        bubbleClassName="c-MessageEmbed__bubble"
        className={componentClassName}
      >
        <div
          dangerouslySetInnerHTML={{ __html: html || '' }}
          className="c-MessageEmbed__html"
          ref={this.setNodeRef}
        />
        {isLoading && <LoadingDots className="c-MessageEmbed__loading" />}
      </EmbedUI>
    )
  }
}

export default Embed
