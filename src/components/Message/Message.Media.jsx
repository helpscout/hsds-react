import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Link from '../Link'
import Spinner from '../Spinner'
import Modal from '../Modal'
import MessageCaption from './Message.Caption'
import classNames, { BEM } from '../../utilities/classNames'
import { isString } from '../../utilities/is'
import { noop } from '../../utilities/other'
import { MediaUI, ImageUI } from './Message.Media.css'

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
        {...getValidProps(rest)}
        bubbleClassName="c-MessageMedia__bubble"
        className={componentClassName}
        size="sm"
      >
        {mediaContentMarkup}
      </MediaUI>
    )
  }
}

MessageMedia.propTypes = {
  body: PropTypes.string,
  caption: PropTypes.string,
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  errorMessage: PropTypes.string,
  from: PropTypes.any,
  height: PropTypes.number,
  icon: PropTypes.string,
  imageAlt: PropTypes.string,
  imageUrl: PropTypes.string,
  isNote: PropTypes.bool,
  isUploading: PropTypes.bool,
  ltr: PropTypes.bool,
  maxHeight: PropTypes.number,
  maxWidth: PropTypes.number,
  modalAnimationDuration: PropTypes.number,
  modalAnimationEasing: PropTypes.string,
  modalAnimationSequence: PropTypes.string,
  modalCardClassName: PropTypes.string,
  modalClassName: PropTypes.string,
  modalWrapperClassName: PropTypes.string,
  onClick: PropTypes.func,
  onErrorTryAgainClick: PropTypes.func,
  onMediaClick: PropTypes.func,
  onMediaLoad: PropTypes.func,
  openMediaInModal: PropTypes.bool,
  overlayAnimationDuration: PropTypes.number,
  primary: PropTypes.bool,
  read: PropTypes.bool,
  rtl: PropTypes.bool,
  showErrorTryAgainLink: PropTypes.bool,
  size: PropTypes.oneOf(['md', 'sm', '']),
  thumbnailImageUrl: PropTypes.string,
  timestamp: PropTypes.string,
  title: PropTypes.string,
  to: PropTypes.any,
  tryAgainLabel: PropTypes.string,
  typing: PropTypes.bool,
  width: PropTypes.number,
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

export default MessageMedia
