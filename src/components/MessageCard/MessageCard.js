import React from 'react'

import classNames from 'classnames'
import PropTypes from 'prop-types'

import { MessageCardAction } from './components/MessageCard.Action'
import MessageCardArticleCard from './components/MessageCard.ArticleCard'
import { MessageCardBody } from './components/MessageCard.Body'
import { MessageCardContent } from './components/MessageCard.Content'
import { MessageCardImage } from './components/MessageCard.Image'
import { MessageCardSubtitle } from './components/MessageCard.Subtitle'
import { MessageCardTitle } from './components/MessageCard.Title'
import MessageCardUrlAttachmentImage from './components/MessageCard.UrlAttachmentImage'
import { MessageCardVideo } from './components/MessageCard.Video'
import { MessageCardSurvey } from './components/survey/MessageCard.Survey'
import MessageCardButton from './MessageCard.Button'
import MessageCardWrapper from './MessageCard.Wrapper'
import MessageCardNPS from './NPS/MessageCard.NPS'

function noop() {}

export const MessageCard = React.memo(
  React.forwardRef(
    (
      {
        image,
        video,
        action,
        children,
        title,
        subtitle,
        onBodyClick,
        body,
        className,
        variables = [],
        ...rest
      },
      ref
    ) => {
      const getClassName = () => {
        return classNames(MessageCard.className, className)
      }

      return (
        <MessageCardWrapper
          className={getClassName()}
          image={image}
          video={video}
          ref={ref}
          {...rest}
        >
          {({ makeMessageVisible }) => (
            <>
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
            </>
          )}
        </MessageCardWrapper>
      )
    }
  )
)

MessageCard.defaultProps = {
  align: 'right',
  animationSequence: '',
  'data-cy': 'MessageCard',
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
MessageCard.NPS = MessageCardNPS

export default MessageCard
