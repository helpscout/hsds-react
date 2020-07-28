import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import LoadingDots from '../LoadingDots'
import { classNames } from '../../utilities/classNames'
import { EmbedUI } from './Message.Embed.css'

class MessageEmbed extends React.Component {
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
      theme && `is-theme-${theme}`,
      className
    )

    return (
      <EmbedUI
        {...getValidProps(rest)}
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

MessageEmbed.defaultProps = {
  'data-cy': 'MessageEmbed',
}

MessageEmbed.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Provides author information and applies "From" styles. */
  from: PropTypes.any,
  /** HTML markup to be dangerously set inside the component. */
  html: PropTypes.string,
  /** Applies the "Note" theme styles. */
  isNote: PropTypes.bool,
  /** Applies left-to-right text styles. */
  ltr: PropTypes.bool,
  /** Determines if the Message is read. */
  read: PropTypes.bool,
  /** Applies right-to-left text styles. */
  rtl: PropTypes.bool,
  /** Timestamp for the Message. */
  timestamp: PropTypes.string,
  /** Provides author information and applies "To" styles. */
  to: PropTypes.any,
  /** Callback when clicked. */
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['action', 'message', '']),
}

export default MessageEmbed
