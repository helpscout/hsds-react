import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import MessageCardButton from './MessageCard.Button'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import Animate from '../Animate'
import {
  ActionUI,
  BodyUI,
  ImageContainerUI,
  ImageUI,
  MAX_IMAGE_SIZE,
  MessageCardUI,
  SubtitleUI,
  TitleUI,
} from './MessageCard.css'
import Truncate from '../Truncate'

const sizeWithRatio = (recalculatedSide, otherSide, defaultValue) =>
  // Check if other side is smaller than max size to not recalculate unnecessarily this side as it doesn't need any scaling
  // other condition checks that the image fits the boundaries
  otherSide < MAX_IMAGE_SIZE
    ? defaultValue
    : (recalculatedSide / otherSide) * MAX_IMAGE_SIZE

export class MessageCard extends React.PureComponent {
  static className = 'c-MessageCard'
  static Button = MessageCardButton

  constructor(props) {
    super(props)

    this.state = {
      show: !(this.props.image && this.props.image.url),
    }

    this.imageRef = React.createRef()
  }

  componentDidMount() {
    if (this.state.show) {
      this.props.onShow()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.show && this.state.show) {
      this.props.onShow()
    }
  }

  getClassName() {
    const { align, className, isMobile, isWithBoxShadow } = this.props
    return classNames(
      MessageCard.className,
      align && `is-align-${align}`,
      className,
      isMobile && 'is-mobile',
      isWithBoxShadow && `is-with-box-shadow`,
      !this.state.show && 'is-not-shown'
    )
  }

  getTruncatedText(text, limit) {
    return (
      <Truncate limit={limit} type="end">
        {text}
      </Truncate>
    )
  }

  renderTitle() {
    const { title } = this.props
    return title ? (
      <TitleUI size="h4" data-cy="beacon-message-title">
        {this.getTruncatedText(title, 110)}
      </TitleUI>
    ) : null
  }

  renderSubtitle() {
    const { subtitle } = this.props
    return subtitle ? (
      <SubtitleUI
        size="h5"
        weight={500}
        light
        data-cy="beacon-message-subtitle"
      >
        {this.getTruncatedText(subtitle, 110)}
      </SubtitleUI>
    ) : null
  }

  renderBody() {
    const { onBodyClick, title, subtitle } = this.props
    let { body } = this.props
    const withMargin = title || subtitle

    // if there is no html in the string, transform new line to paragraph
    if (body && !/<\/?[a-z][\s\S]*>/i.test(body)) {
      body = body.split('\n').join('<br>')
    }

    return body ? (
      <BodyUI
        onClick={onBodyClick}
        withMargin={withMargin}
        data-cy="beacon-message-body-content"
      >
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </BodyUI>
    ) : null
  }

  afterImageLoad = () => this.setState({ show: true })

  renderImage() {
    const { image } = this.props

    if (!image) {
      return null
    }

    const { height, width } = this.calculateSize(image)

    return (
      <ImageContainerUI>
        <ImageUI
          src={image.url}
          alt={image.altText || 'Message image'}
          width={width ? `${width}px` : '100%'}
          height={height ? `${height}px` : 'auto'}
          onLoad={this.afterImageLoad}
        />
      </ImageContainerUI>
    )
  }

  // Calculate size of image to keep the original aspect ratio, but fit within 278x278 square for image
  calculateSize = image => {
    if (!image.width || !image.height) {
      return {}
    }
    const width = parseInt(image.width)
    const height = parseInt(image.height)

    // Not necessary to recalculate if it fits within boundaries
    if (width < MAX_IMAGE_SIZE && height < MAX_IMAGE_SIZE) {
      return { width, height }
    }

    if (width > height) {
      return {
        height: sizeWithRatio(height, width, height),
        width: Math.min(width, MAX_IMAGE_SIZE),
      }
    } else {
      return {
        width: sizeWithRatio(width, height, MAX_IMAGE_SIZE),
        height: Math.min(height, MAX_IMAGE_SIZE),
      }
    }
  }

  renderAction() {
    const { action } = this.props
    return action ? (
      <ActionUI data-cy="beacon-message-cta-wrapper">{action()}</ActionUI>
    ) : null
  }

  render() {
    const {
      action,
      animationDuration,
      animationEasing,
      animationSequence,
      children,
      innerRef,
      in: inProp,
      title,
      ...rest
    } = this.props

    return (
      <Animate
        className={`c-MessageCardWrapper`}
        // style={{opacity: this.state.show ? 1 : 0, transform: this.state.show ? 'translateY(0px)' : 'translateY(12px)' }}
        in={inProp}
        duration={animationDuration}
        easing={animationEasing}
        sequence={animationSequence}
      >
        {
          <MessageCardUI
            {...getValidProps(rest)}
            className={this.getClassName()}
            ref={innerRef}
          >
            {this.renderTitle()}
            {this.renderSubtitle()}
            {this.renderBody()}
            {this.renderImage()}
            {children}
            {this.renderAction()}
          </MessageCardUI>
        }
      </Animate>
    )
  }
}

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
  innerRef: PropTypes.func,
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
    width: PropTypes.string,
    height: PropTypes.string,
    altText: PropTypes.string,
  }),
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Callback invoked when the MessageCard is show to the user. */
  onShow: PropTypes.func,
}

export default MessageCard
