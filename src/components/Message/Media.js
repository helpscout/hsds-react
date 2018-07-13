// @flow
import React, { PureComponent as Component } from 'react'
import PropTypes from 'prop-types'
import styled from '../styled'
import Flexy from '../Flexy'
import Image from '../Image'
import Link from '../Link'
import Spinner from '../Spinner'
import Modal from '../Modal'
import Chat from './Chat'
import Caption from './Caption'
import classNames, { BEM } from '../../utilities/classNames'
import { isString } from '../../utilities/is'
import { noop } from '../../utilities/other'
import { bubbleTypes, providerContextTypes } from './propTypes'
import type { MessageBubble } from './types'
import css from './styles/Media.css.js'

type Props = MessageBubble & {
  className: string,
  caption?: string,
  errorMessage?: string,
  error?: boolean | string,
  imageAlt?: string,
  imageUrl?: string,
  height?: number | string,
  isUploading?: boolean,
  maxWidth?: number,
  modalClassName?: string,
  modalCardClassName?: string,
  modalWrapperClassName?: string,
  onErrorTryAgainClick: (event: Event) => void,
  onMediaClick: (event: Event) => void,
  onMediaLoad: () => void,
  openMediaInModal?: boolean,
  showErrorTryAgainLink: boolean,
  tryAgainLabel: string,
  width?: number | string,
}

export class Media extends Component<Props> {
  static defaultProps = {
    className: '',
    errorMessage: `Couldn't send.`,
    onErrorTryAgainClick: noop,
    onMediaClick: noop,
    onMediaLoad: noop,
    openMediaInModal: true,
    maxWidth: 1080,
    showErrorTryAgainLink: true,
    tryAgainLabel: 'Try again',
    isUploading: false,
  }
  static contextTypes = providerContextTypes
  static displayName = 'Message.Media'

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
          <Caption size="11">
            {spinnerMarkup}
            {captionText}
            {tryAgainMarkup}
          </Caption>
        </div>
      )
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
  handleOnTryAgainClick = (event: Event) => {
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
      maxWidth,
      modalClassName,
      modalCardClassName,
      modalWrapperClassName,
      onErrorTryAgainClick,
      onMediaClick,
      onMediaLoad,
      openMediaInModal,
      showErrorTryAgainLink,
      tryAgainLabel,
      type,
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

    const captionMarkup = caption && (
      <div className="c-MessageMedia__caption">
        <Caption size="11">{caption}</Caption>
      </div>
    )

    const inlineCaptionMarkup = this.getCaptionMarkup()

    const mediaMarkup = imageUrl ? (
      <div className="c-MessageMedia__media" style={{ maxWidth }}>
        <Image
          alt={imageAlt || null}
          block
          className="c-MessageMedia__mediaImage"
          height={height}
          onClick={onMediaClick}
          onLoad={onMediaLoad}
          src={imageUrl}
          title={imageAlt || null}
          shape="rounded"
          width={width}
        />
      </div>
    ) : null

    const mediaContainerMarkup = imageUrl ? (
      maybeOpenMediaInModal ? (
        <div className="c-MessageMedia__mediaContainer">
          <Modal
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
              <Modal.Content>
                {mediaMarkup}
                {captionMarkup}
              </Modal.Content>
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
      <Chat
        {...rest}
        bubbleClassName="c-MessageMedia__bubble"
        className={componentClassName}
        size="sm"
      >
        {mediaContentMarkup}
      </Chat>
    )
  }
}

export default styled(Media)(css)
