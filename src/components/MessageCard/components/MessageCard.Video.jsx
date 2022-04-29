import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const MessageCardVideoContainerUI = styled.div`
  iframe {
    border-radius: 3px;
  }
`

export const MessageCardVideo = ({ video, onLoad }) => {
  const videoIframeRef = useRef(null)
  const videoContainerRef = useRef(null)

  useEffect(() => {
    if (video && videoContainerRef.current) {
      videoIframeRef.current = videoContainerRef.current.querySelector('iframe')
      if (videoIframeRef.current) {
        videoIframeRef.current.onload = () => onLoad()
        videoIframeRef.current.onerror = () => onLoad()
      } else {
        // in case something went wrong rendering iframe, just show a Message
        onLoad()
      }
    }

    return () => {
      if (videoIframeRef.current) {
        videoIframeRef.current.onload = undefined
        videoIframeRef.current.onerror = undefined
      }
    }
  }, [onLoad, video])

  return (
    <MessageCardVideoContainerUI
      ref={videoContainerRef}
      dangerouslySetInnerHTML={{ __html: video.html }}
    />
  )
}

MessageCardVideo.propTypes = {
  /** Video to render */
  video: PropTypes.shape({
    html: PropTypes.string.isRequired,
  }).isRequired,
  /** Callback when video loaded */
  onLoad: PropTypes.func,
}

MessageCardVideo.defaultProps = {
  onLoad: () => {},
}
