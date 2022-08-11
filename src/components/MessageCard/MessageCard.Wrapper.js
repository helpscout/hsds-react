import React, { useCallback, useEffect, useRef, useState } from 'react'

import classNames from 'classnames'
import PropTypes from 'prop-types'

import {
  MessageCardContentUI,
  MessageCardUI,
  MessageCardWrapperUI,
} from './MessageCard.styles'
import getValidProps from '../../utilities/getValidProps'

function noop() {}

export const MessageCardWrapper = React.memo(
  React.forwardRef(
    (
      {
        onShow,
        in: inProp,
        image,
        video,
        children,
        withAnimation,
        className,
        align,
        isMobile,
        isWithBoxShadow,
        nodeRef,
        footer,
        ...rest
      },
      ref
    ) => {
      const [visible, setVisible] = useState(false)
      const isShown = useRef(false)
      const isMounted = useRef(true)
      useEffect(() => {
        return () => {
          isMounted.current = false
        }
      }, [])

      const hasImage = useCallback(() => image && image.url, [image])

      const makeMessageVisible = useCallback(() => {
        setTimeout(() => {
          isMounted.current && setVisible(true)
        }, 0)
      }, [])

      const videoHtml = video ? video.html : undefined

      useEffect(() => {
        if (inProp && !hasImage() && !isShown.current && !videoHtml) {
          makeMessageVisible()
        }
      }, [inProp, hasImage, videoHtml, makeMessageVisible])

      useEffect(() => {
        if (visible && !isShown.current) {
          onShow()
          isShown.current = true
        }
      }, [visible, onShow])

      const getClassName = () => {
        return classNames(
          align && `is-align-${align}`,
          className,
          isMobile && 'is-mobile',
          isWithBoxShadow && `is-with-box-shadow`
        )
      }

      return inProp ? (
        <MessageCardWrapperUI
          className="c-MessageCardWrapper"
          visible={visible}
          withAnimation={withAnimation}
        >
          <MessageCardUI
            {...getValidProps(rest)}
            className={getClassName()}
            ref={ref}
            nodeRef={nodeRef}
          >
            <MessageCardContentUI>
              {children({ makeMessageVisible })}
            </MessageCardContentUI>
            {footer ? footer : null}
          </MessageCardUI>
        </MessageCardWrapperUI>
      ) : null
    }
  )
)

MessageCardWrapper.defaultProps = {
  align: 'right',
  'data-cy': 'MessageCard',
  in: true,
  isMobile: false,
  isWithBoxShadow: true,
  onShow: noop,
  withAnimation: false,
}

MessageCardWrapper.propTypes = {
  /** Apply styles for left or right-aligned Message. */
  align: PropTypes.oneOf(['left', 'right']),
  /** The className of the component. */
  className: PropTypes.string,
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  /** Programatically triggering the animation. */
  in: PropTypes.bool,
  /** Adds mobile styles */
  isMobile: PropTypes.bool,
  /** Adds a box shadow. */
  isWithBoxShadow: PropTypes.bool,
  /** Definition of the Message image */
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }),
  /** Definition of the Message video */
  video: PropTypes.shape({
    html: PropTypes.string.isRequired,
  }),
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Callback invoked when the MessageCard is show to the user. */
  onShow: PropTypes.func,
  /** Enable animations when showing the Message. */
  withAnimation: PropTypes.bool,
  /** ref of the MessageCard HTML element */
  nodeRef: PropTypes.object,
  /** Optional footer to be displayed below content */
  footer: PropTypes.object,
}

export default MessageCardWrapper
