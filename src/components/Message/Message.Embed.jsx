import React from 'react'
import PropTypes from 'prop-types'
import LoadingDots from '../LoadingDots'
import { classNames } from '../../utilities/classNames'
import { EmbedUI } from './Message.Embed.css'

class Embed extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    from: PropTypes.any,
    isNote: PropTypes.bool,
    ltr: PropTypes.bool,
    onClick: PropTypes.func,
    read: PropTypes.bool,
    rtl: PropTypes.bool,
    timestamp: PropTypes.string,
    to: PropTypes.any,
    type: PropTypes.oneOf(['action', 'message', '']),
    html: PropTypes.string,
  }
  static displayName = 'Message.Embed'

  state = {
    isLoading: true,
  }
  context

  node

  componentDidMount() {
    this.loadContent()
  }

  loadContent = () => {
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

  setNodeRef = node => (this.node = node)

  render() {
    const { className, html, ...rest } = this.props
    const { isLoading } = this.state
    const { theme } = this.context

    const componentClassName = classNames(
      'c-MessageEmbed',
      isLoading && 'is-loading',

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
