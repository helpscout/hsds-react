import React, { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import MessageCardButton from './MessageCard.Button'
import classNames from 'classnames'
import { MessageCardUI, MessageCardWrapperUI } from './MessageCard.css'
import { MessageCardTitle } from './components/MessageCard.Title'
import { MessageCardSubtitle } from './components/MessageCard.Subtitle'
import { MessageCardImage } from './components/MessageCard.Image'
import { MessageCardAction } from './components/MessageCard.Action'
import { MessageCardBody } from './components/MessageCard.Body'
import { MessageCardContent } from './components/MessageCard.Content'
import { MessageCardSurvey } from './components/survey/MessageCard.Survey'
import MessageCardUrlAttachmentImage from './components/MessageCard.UrlAttachmentImage'
import MessageCardArticleCard from './components/MessageCard.ArticleCard'
import { MessageCardVideo } from './components/MessageCard.Video'

export const MessageCard = React.memo(
  React.forwardRef(
    (
      {
        onShow,
        in: inProp,
        image,
        video,
        action,
        animationDuration,
        animationEasing,
        animationSequence,
        children,
        title,
        subtitle,
        onBodyClick,
        body,
        withAnimation,
        className,
        align,
        isMobile,
        isWithBoxShadow,
        variables = [],
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
          MessageCard.className,
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
          >
            <MessageCardTitle title={title} />
            <MessageCardSubtitle subtitle={subtitle} />
            <MessageCardContent
              withMargin={!!(title || subtitle)}
              render={!!(body || image || children || video)}
            >
              <MessageCardBody
                body={body}
                onClick={onBodyClick}
                variables={variables}
              />
              {image ? (
                <MessageCardImage image={image} onLoad={makeMessageVisible} />
              ) : null}
              {video ? (
                <MessageCardVideo video={video} onLoad={makeMessageVisible} />
              ) : null}
              {children}
            </MessageCardContent>
            <MessageCardAction action={action} />
          </MessageCardUI>
        </MessageCardWrapperUI>
      ) : null
    }
  )
)

function noop() {}

MessageCard.defaultProps = {
  align: 'right',
  animationSequence: '',
  'data-cy': 'MessageCard',
  innerRef: noop,
  in: true,
  isMobile: false,
  isWithBoxShadow: true,
  onBodyClick: noop,
  onShow: noop,
  withAnimation: false,
}

MessageCard.propTypes = {
  /** Render-prop that is placed in the CTA section of the Message. */
  action: PropTypes.func,
  /** Apply styles for left or right-aligned Message. */
  align: PropTypes.oneOf(['left', 'right']),
  /** The duration (in `ms`) for the animation sequence. */
  animationDuration: PropTypes.number,
  /** Determines the CSS easing transition function. */
  animationEasing: PropTypes.string,
  /** Names of animation styles to apply. */
  animationSequence: PropTypes.string,
  /** Main text of the Message. */
  body: PropTypes.string,
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
  /** Callback invoked when the body of the Message is clicked. */
  onBodyClick: PropTypes.func,
  /** Subtitle of the Message. */
  subtitle: PropTypes.string,
  /** Title of the Message. */
  title: PropTypes.string,
  /** Definition of the Message image */
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    altText: PropTypes.string,
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
  /** List of variables that can be highlighted inside Message. */
  variables: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      display: PropTypes.string,
    })
  ),
}

MessageCard.className = 'c-MessageCard'
MessageCard.Button = MessageCardButton
MessageCard.UrlAttachmentImage = MessageCardUrlAttachmentImage
MessageCard.ArticleCard = MessageCardArticleCard
MessageCard.Survey = MessageCardSurvey

export default MessageCard
