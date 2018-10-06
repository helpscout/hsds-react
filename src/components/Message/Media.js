// @flow
import type { Node } from 'react'
import type { MessageBubble } from './types'
import React, { Component } from 'react'
import styled from '../styled'
import Image from '../Image'
import Link from '../Link'
import Spinner from '../Spinner'
import Modal from '../Modal'
import Chat from './Chat'
import Caption from './Caption'
import classNames, { BEM } from '../../utilities/classNames.ts'
import { namespaceComponent } from '../../utilities/component.ts'
import { isString } from '../../utilities/is'
import { noop } from '../../utilities/other'
import { providerContextTypes } from './propTypes'
import css from './styles/Media.css.js'
import { COMPONENT_KEY } from './utils'

type Props = MessageBubble & {
  className: string,
  caption?: string,
  errorMessage?: string,
  error?: boolean | string,
  imageAlt?: string,
  imageUrl?: string,
  height?: number,
  isUploading?: boolean,
  maxHeight: number,
  maxWidth: number,
  modalClassName?: string,
  modalCardClassName?: string,
  modalWrapperClassName?: string,
  onErrorTryAgainClick: (event: Event) => void,
  onMediaClick: (event: Event) => void,
  onMediaLoad: () => void,
  openMediaInModal?: boolean,
  thumbnailImageUrl?: string,
  showErrorTryAgainLink: boolean,
  tryAgainLabel: string,
  width?: number,
}

export class Media extends Component<Props> {
  static defaultProps = {
    className: '',
    errorMessage: `Couldn't send.`,
    onErrorTryAgainClick: noop,
    onMediaClick: noop,
    onMediaLoad: noop,
    openMediaInModal: true,
    maxHeight: 250,
    maxWidth: 350,
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
  getCaption = (): ?string => {
    const { caption, error, errorMessage } = this.props

    let text = caption

    if (error) {
      text = isString(error) ? error : errorMessage
    }

    // $FlowFixMe
    return text
  }

  getSpinnerMarkup = (): ?Node => {
    return (
      this.props.isUploading && (
        <Spinner className="c-MessageMedia__loadingSpinner" size="xs" />
      )
    )
  }

  getCaptionMarkup = (): ?Node => {
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

  getMediaMarkup = ({
    src,
    maxHeight,
    maxWidth,
  }: { src?: string, maxHeight?: number, maxWidth?: number } = {}): ?Node => {
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
        <Image
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

  getTryAgainMarkup = (): ?Node => {
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
      maxHeight,
      maxWidth,
      modalClassName,
      modalCardClassName,
      modalWrapperClassName,
      onErrorTryAgainClick,
      onMediaClick,
      onMediaLoad,
      openMediaInModal,
      showErrorTryAgainLink,
      thumbnailImageUrl,
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
                {modalMediaMarkup}
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

namespaceComponent(COMPONENT_KEY.Media)(Media)

export default styled(Media)(css)
