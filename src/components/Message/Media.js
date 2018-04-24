import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import Image from '../Image'
import Modal from '../Modal'
import Chat from './Chat'
import Caption from './Caption'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { bubbleTypes, providerContextTypes } from './propTypes'

export const propTypes = Object.assign({}, bubbleTypes, {
  caption: PropTypes.string,
  errorMessage: PropTypes.string,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]),
  imageAlt: PropTypes.string,
  imageUrl: PropTypes.string,
  isUploading: PropTypes.bool,
  modalWrapperClassName: PropTypes.string,
  onMediaClick: PropTypes.func,
  onMediaLoad: PropTypes.func,
  openMediaInModal: PropTypes.bool
})

const defaultProps = {
  onMediaClick: noop,
  onMediaLoad: noop,
  openMediaInModal: true,
  isUploading: false
}

const contextTypes = providerContextTypes

class Media extends Component {
  render () {
    const {
      body,
      children,
      className,
      caption,
      imageUrl,
      imageAlt,
      isUploading,
      modalWrapperClassName,
      onMediaClick,
      onMediaLoad,
      openMediaInModal,
      type,
      ...rest
    } = this.props

    const {theme} = this.context

    const isThemeEmbed = theme === 'embed'
    const maybeOpenMediaInModal = !isThemeEmbed && openMediaInModal

    const componentClassName = classNames(
      'c-MessageMedia',
      className
    )

    const mediaMarkup = imageUrl ? (
      <div className='c-MessageMedia__media'>
        <Image
          alt={imageAlt || null}
          block
          className='c-MessageMedia__mediaImage'
          onClick={onMediaClick}
          onLoad={onMediaLoad}
          src={imageUrl}
          title={imageAlt || null}
          shape='rounded'
        />
      </div>
    ) : null

    const captionMarkup = (!isThemeEmbed && caption) ? (
      <div className='c-MessageMedia__caption'>
        <Caption>
          {caption}
        </Caption>
      </div>
    ) : null

    const mediaContainerMarkup = imageUrl ? maybeOpenMediaInModal ? (
      <div className='c-MessageMedia__mediaContainer'>
        <Modal trigger={mediaMarkup} wrapperClassName={modalWrapperClassName}>
          <Modal.Body scrollFade={false} isSeamless>
            <Modal.Content>
              {mediaMarkup}
              {captionMarkup}
            </Modal.Content>
          </Modal.Body>
        </Modal>
      </div>
    ) : (
      <div className='c-MessageMedia__mediaContainer'>
        {mediaMarkup}
      </div>
    ) : null

    return (
      <Chat
        {...rest}
        bubbleClassName='c-MessageMedia__bubble'
        caption={isThemeEmbed ? caption : undefined}
        className={componentClassName}
        isLoading={isUploading}
        size='sm'
      >
        {mediaContainerMarkup}
        {captionMarkup}
      </Chat>
    )
  }
}

Media.propTypes = propTypes
Media.defaultProps = defaultProps
Media.contextTypes = contextTypes

export default Media
