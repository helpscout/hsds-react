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

MessageEmbed.propTypes = {
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

MessageEmbed.defaultProps = {
  'data-cy': 'MessageEmbed',
}

export default MessageEmbed
