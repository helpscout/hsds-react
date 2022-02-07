import React from 'react'
import PropTypes from 'prop-types'
import Link from '../Link'
import Spinner from '../Spinner'
import Modal from '../Modal'
import MessageCaption from './Message.Caption'
import classNames, { BEM } from '../../utilities/classNames'
import { isString } from '../../utilities/is'
import { MediaUI, ImageUI } from './Message.Media.css'

const noop = () => undefined

export class MessageMedia extends React.Component {
  /**
   * Retrieves the appropriate caption for the media.
   *
   * @returns {string} The caption text.
   */
  getCaption = () => {
    const { caption, error, errorMessage } = this.props

    let text = caption

    if (error) {
      text = isString(error) ? error : errorMessage
    }

    return text
  }

  getSpinnerMarkup = () => {
    return (
      this.props.isUploading && (
        <Spinner className="c-MessageMedia__loadingSpinner" size="xs" />
      )
    )
  }

  getCaptionMarkup = () => {
    const captionText = this.getCaption()
    const spinnerMarkup = this.getSpinnerMarkup()
    const tryAgainMarkup = this.getTryAgainMarkup()
    const shouldRender = captionText || spinnerMarkup || tryAgainMarkup

    return (
      shouldRender && (
        <div className="c-MessageMedia__caption">
          <MessageCaption size="11">
            {spinnerMarkup}
            {captionText}
            {tryAgainMarkup}
          </MessageCaption>
        </div>
      )
    )
  }

  getMediaMarkup = ({ src, maxHeight, maxWidth } = {}) => {
    const {
      height,
      onMediaClick,
      onMediaLoad,
      imageAlt,
      imageUrl,
      width,
    } = this.props

    const imageSrc = src || imageUrl

    if (!imageSrc) return null

    return (
      <div className="c-MessageMedia__media">
        <ImageUI
          alt={imageAlt}
          block
          className="c-MessageMedia__mediaImage"
          height={height}
          onClick={onMediaClick}
          onLoad={onMediaLoad}
          maxHeight={maxHeight}
          maxWidth={maxWidth}
          src={imageSrc}
          title={imageAlt}
          shape="rounded"
          width={width}
        />
      </div>
    )
  }

  getTryAgainMarkup = () => {
    const { error, showErrorTryAgainLink, tryAgainLabel } = this.props

    if (!error || !showErrorTryAgainLink) return null

    const markup = (
      <span className="c-MessageMedia__tryAgainActionWrapper">
        {' '}
        <Link
          className="c-MessageMedia__tryAgainAction"
          onClick={this.handleOnTryAgainClick}
        >
          {tryAgainLabel}
        </Link>
      </span>
    )

    return markup
  }

  /**
   * Handles the callback when the "Try Again" action is clicked.
   *
   * @param   {Event} The click event.
   */
  handleOnTryAgainClick = event => {
    event.preventDefault()
    event.stopPropagation()

    this.props.onErrorTryAgainClick(event)
  }

  render() {
    const {
      body,
      children,
      className,
      caption,
      errorMessage,
      error,
      height,
      imageUrl,
      imageAlt,
      isUploading,
      maxHeight,
      maxWidth,
      modalAnimationDuration,
      modalAnimationEasing,
      modalAnimationSequence,
      modalCardClassName,
      modalClassName,
      modalWrapperClassName,
      overlayAnimationDuration,
      onErrorTryAgainClick,
      onMediaClick,
      onMediaLoad,
      openMediaInModal,
      showErrorTryAgainLink,
      thumbnailImageUrl,
      tryAgainLabel,
      width,
      ...rest
    } = this.props

    const { theme } = this.context
    const isThemeEmbed = theme === 'embed'
    const maybeOpenMediaInModal = !isThemeEmbed && openMediaInModal
    const componentClassName = classNames(
      'c-MessageMedia',
      error && 'is-error',
      className
    )
    const bem = BEM(componentClassName)
    const inlineCaptionMarkup = this.getCaptionMarkup()
    const mediaMarkup = this.getMediaMarkup({
      src: thumbnailImageUrl || imageUrl,
      maxWidth,
      maxHeight,
    })
    const modalMediaMarkup = this.getMediaMarkup({
      maxWidth: 980,
      maxHeight: 820,
    })
    const mediaContainerMarkup = imageUrl ? (
      maybeOpenMediaInModal ? (
        <div className="c-MessageMedia__mediaContainer">
          <Modal
            modalAnimationDuration={modalAnimationDuration}
            modalAnimationEasing={modalAnimationEasing}
            modalAnimationSequence={modalAnimationSequence}
            overlayAnimationDuration={overlayAnimationDuration}
            trigger={mediaMarkup}
            className={classNames(
              'c-MessageMedia__modal',
              modalClassName,
              bem.element('modal')
            )}
            cardClassName={classNames(
              'c-MessageMedia__modalCard',
              modalCardClassName,
              bem.element('modalCard')
            )}
            wrapperClassName={classNames(
              'c-MessageMedia__modalWrapper',
              modalWrapperClassName,
              bem.element('modalWrapper')
            )}
          >
            <Modal.Body scrollFade={false} isSeamless>
              <Modal.Content>{modalMediaMarkup}</Modal.Content>
            </Modal.Body>
          </Modal>
        </div>
      ) : (
        <div className="c-MessageMedia__mediaContainer">{mediaMarkup}</div>
      )
    ) : null

    const mediaContentMarkup = (
      <div className="c-MessageMedia__mediaContent">
        {mediaContainerMarkup}
        {inlineCaptionMarkup}
      </div>
    )

    return (
      <MediaUI
        {...rest}
        bubbleClassName="c-MessageMedia__bubble"
        className={componentClassName}
        size="sm"
      >
        {mediaContentMarkup}
      </MediaUI>
    )
  }
}

MessageMedia.defaultProps = {
  className: '',
  'data-cy': 'MessageMedia',
  errorMessage: `Couldn't send.`,
  onErrorTryAgainClick: noop,
  onMediaClick: noop,
  onMediaLoad: noop,
  openMediaInModal: true,
  maxHeight: 250,
  maxWidth: 350,
  modalAnimationDuration: 250,
  modalAnimationEasing: 'ease',
  overlayAnimationDuration: 250,
  modalAnimationSequence: 'fade up',
  showErrorTryAgainLink: true,
  tryAgainLabel: 'Try again',
  isUploading: false,
}

MessageMedia.contextTypes = {
  theme: noop,
}

MessageMedia.propTypes = {
  /** Description of the media. */
  caption: PropTypes.string,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Renders the error caption. Default `false`. */
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Customizes the error caption. */
  errorMessage: PropTypes.string,
  /** Provides author information and applies "From" styles. */
  from: PropTypes.any,
  /** Height of the image. */
  height: PropTypes.number,
  /** Alt/title of the media image. */
  imageAlt: PropTypes.string,
  /** URL of the media image. */
  imageUrl: PropTypes.string,
  /** Renders the uploading spinner UI. Default `false`. */
  isUploading: PropTypes.bool,
  /** Applies left-to-right text styles. */
  ltr: PropTypes.bool,
  /** Max-height of the media content. */
  maxHeight: PropTypes.number,
  /** Max-width of the media content. */
  maxWidth: PropTypes.number,
  /** Custom [animation](../Animate) duration for the child [Card](../Card) component. */
  modalAnimationDuration: PropTypes.number,
  /** Custom [animation](../Animate) easing for the child [Card](../Card) component. */
  modalAnimationEasing: PropTypes.string,
  /** Custom [animation](../Animate) sequence for the child [Card](../Card) component. */
  modalAnimationSequence: PropTypes.string,
  /** Custom class names for the [Modal](../Modal) card. */
  modalCardClassName: PropTypes.string,
  /** Custom class names for the [Modal](../Modal). */
  modalClassName: PropTypes.string,
  /** Custom class names for the [Modal](../Modal) wrapper. */
  modalWrapperClassName: PropTypes.string,
  /** Callback when "Try again" action is clicked. */
  onErrorTryAgainClick: PropTypes.func,
  /** Callback when the media image is clicked. */
  onMediaClick: PropTypes.func,
  /** Callback when the media image is loaded. */
  onMediaLoad: PropTypes.func,
  /** Opens the media image in a Modal when clicked. Default `true`. */
  openMediaInModal: PropTypes.bool,
  /** Custom [animation](../Animate) duration for the child [Overlay](../Overlay) component. */
  overlayAnimationDuration: PropTypes.number,
  /** Determines if the Message is read. */
  read: PropTypes.bool,
  /** Applies right-to-left text styles. */
  rtl: PropTypes.bool,
  /** Shows the "Try again" action, if error. Default `true`. */
  showErrorTryAgainLink: PropTypes.bool,
  /** URL of the media image (thumbnail). */
  thumbnailImageUrl: PropTypes.string,
  /** Timestamp for the Message. */
  timestamp: PropTypes.string,
  /** Provides author information and applies "To" styles. */
  to: PropTypes.any,
  /** Label for the "Try Again" action, on error. */
  tryAgainLabel: PropTypes.string,
  /** Width of the image. */
  width: PropTypes.number,
  /** Applies "primary" styles. */
  primary: PropTypes.bool,
  icon: PropTypes.string,
  /** Applies "note" styles. */
  isNote: PropTypes.bool,
  /** Callback when clicked. */
  onClick: PropTypes.func,
  /** Determines the size of the component. */
  size: PropTypes.oneOf(['md', 'sm', '']),
  /** Renders a Heading title in the component. */
  title: PropTypes.string,
  /** Renders TypingDots within the component. */
  typing: PropTypes.bool,
  body: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default MessageMedia
