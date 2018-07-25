import React, { PureComponent as Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Body from './Body'
import Content from './Content'
import Footer from './Footer'
import Header from './Header'
import Animate from '../Animate'
import Card from '../Card'
import CloseButton from '../CloseButton'
import EventListener from '../EventListener'
import KeypressListener from '../KeypressListener'
import Overlay from '../Overlay'
import PortalWrapper from '../PortalWrapper'
import Keys from '../../constants/Keys'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { propTypes as portalTypes } from '../Portal'
import { findFocusableNodes } from '../../utilities/focus'
import { getClosestDocument, isNodeElement } from '../../utilities/node'

export const propTypes = Object.assign({}, portalTypes, {
  cardClassName: PropTypes.string,
  closeIcon: PropTypes.bool,
  closeIconRepositionDelay: PropTypes.number,
  containTabKeyPress: PropTypes.bool,
  modalAnimationDelay: PropTypes.number,
  modalAnimationDuration: PropTypes.number,
  modalAnimationEasing: PropTypes.string,
  modalAnimationSequence: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  modalFocusTimeout: PropTypes.number,
  overlayAnimationDelay: PropTypes.number,
  overlayAnimationDuration: PropTypes.number,
  overlayAnimationEasing: PropTypes.string,
  overlayAnimationSequence: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  overlayClassName: PropTypes.string,
  seamless: PropTypes.bool,
  trigger: PropTypes.element,
  timeout: PropTypes.number,
  wrapperClassName: PropTypes.string,
})

const defaultProps = {
  closeIcon: true,
  seamless: false,
  isOpen: false,
  closeIconRepositionDelay: 0,
  containTabKeyPress: true,
  modalAnimationDelay: 0,
  modalAnimationDuration: 200,
  modalAnimationEasing: 'bounce',
  modalAnimationSequence: 'fade down',
  modalFocusTimeout: 90,
  overlayAnimationDelay: 0,
  overlayAnimationDuration: 200,
  overlayAnimationEasing: 'ease',
  overlayAnimationSequence: 'fade',
  onScroll: noop,
  timeout: 80,
  wrapperClassName: 'c-ModalWrapper',
}

const childContextTypes = {
  positionCloseNode: PropTypes.func,
}

const modalBaseZIndex = 1040
const portalOptions = {
  id: 'Modal',
  zIndex: modalBaseZIndex,
}

class Modal extends Component {
  constructor() {
    super()

    this.documentNode = null
    this.cardNode = null
    this.closeNode = null
    this.scrollableNode = null
    this.handleOnResize = this.handleOnResize.bind(this)
    this.handleOnTab = this.handleOnTab.bind(this)
    this.handleOnShiftTab = this.handleOnShiftTab.bind(this)
    this.positionCloseNode = this.positionCloseNode.bind(this)
  }

  componentWillMount() {
    this.documentNode = getClosestDocument(ReactDOM.findDOMNode(this))
  }

  componentDidMount() {
    this.positionCloseNode()
    this.focusModalCard()
    /* istanbul ignore next */
    setTimeout(this.positionCloseNode, this.props.modalAnimationDuration)
  }

  componentWillUnmount() {
    this.documentNode = null
    this.cardNode = null
    this.closeNode = null
    this.scrollableNode = null
  }

  /* istanbul ignore next */
  handleOnResize() {
    this.positionCloseNode()
  }

  handleOnTab(event) {
    const { containTabKeyPress } = this.props
    if (!containTabKeyPress || !this.cardNode || !this.documentNode) return
    const focusedNode = event.target
    const focusableNodes = findFocusableNodes(this.cardNode, this.documentNode)
    const focusedNodeIndex = Array.prototype.indexOf.call(
      focusableNodes,
      focusedNode
    )

    if (focusedNodeIndex === focusableNodes.length - 1) {
      event.preventDefault()
    }
  }

  handleOnShiftTab(event) {
    const { containTabKeyPress } = this.props
    if (!containTabKeyPress || !this.cardNode || !this.documentNode) return
    const focusedNode = event.target
    const focusableNodes = findFocusableNodes(this.cardNode, this.documentNode)
    const focusedNodeIndex = Array.prototype.indexOf.call(
      focusableNodes,
      focusedNode
    )

    if (focusedNodeIndex === 0) {
      event.preventDefault()
    }
  }

  focusModalCard() {
    const { modalFocusTimeout } = this.props
    setTimeout(() => {
      /* istanbul ignore else */
      if (this.cardNode) {
        this.cardNode.focus()
      }
    }, modalFocusTimeout)
  }

  positionCloseNode(scrollableNode) {
    const scrollNode = scrollableNode || this.scrollableNode
    if (!this.closeNode || !isNodeElement(scrollNode)) return

    const topOffset = 11
    // Adjust closeButton when the scrollableNode is being pushed down by, say,
    // a Modal.Header.
    // TODO: This is a (semi-naive) work-around.
    /* istanbul ignore next */
    if (scrollNode.getBoundingClientRect().top > this.closeNode.offsetTop) {
      this.closeNode.style.top = `${topOffset}px`
      return
    }

    const defaultOffset = 9
    const offset = `${scrollNode.offsetWidth -
      scrollNode.clientWidth +
      defaultOffset}px`

    this.closeNode.style.right = offset
  }

  getChildContext() {
    return {
      positionCloseNode: this.positionCloseNode,
    }
  }

  render() {
    const {
      cardClassName,
      children,
      className,
      closeIcon,
      closeIconRepositionDelay,
      closePortal,
      containTabKeyPress,
      exact,
      isOpen,
      modalAnimationDelay,
      modalAnimationDuration,
      modalAnimationEasing,
      modalAnimationSequence,
      modalFocusTimeout,
      onClose,
      onScroll,
      openPortal,
      overlayAnimationDelay,
      overlayAnimationDuration,
      overlayAnimationEasing,
      overlayAnimationSequence,
      overlayClassName,
      path,
      portalIsMounted,
      portalIsOpen,
      seamless,
      style,
      timeout,
      trigger,
      wrapperClassName,
      zIndex,
      ...rest
    } = this.props

    const handleOnResize = this.handleOnResize

    const componentClassName = classNames(
      'c-Modal',
      isOpen && 'is-open',
      className
    )
    const cardComponentClassName = classNames('c-Modal__Card', cardClassName)
    const overlayComponentClassName = classNames(
      'c-Modal__Overlay',
      overlayClassName
    )

    const closeMarkup = closeIcon ? (
      <div
        className="c-Modal__close"
        ref={node => {
          this.closeNode = node
        }}
      >
        <CloseButton onClick={closePortal} tabIndex="-1" />
      </div>
    ) : null

    const modalStyle = style
      ? Object.assign({}, style, {
          zIndex,
        })
      : { zIndex }

    const parsedChildren = React.Children.map(children, child => {
      if (child && (child.type === Content || child.type === Body)) {
        return React.cloneElement(child, {
          scrollableRef: node => {
            this.scrollableNode = node
            child.props.scrollableRef(node)
          },
        })
      }

      return child
    })

    const modalContentMarkup = !seamless ? (
      <Card
        className={cardComponentClassName}
        seamless
        role="dialog"
        nodeRef={node => {
          this.cardNode = node
        }}
        tabIndex="-1"
      >
        {closeMarkup}
        {parsedChildren}
      </Card>
    ) : (
      <div className="c-Modal__innerContent" role="dialog">
        {parsedChildren}
      </div>
    )

    return (
      <div
        className={componentClassName}
        role="document"
        style={modalStyle}
        {...rest}
      >
        <KeypressListener
          keyCode={Keys.TAB}
          handler={this.handleOnTab}
          type="keydown"
        />
        <KeypressListener
          keyCode={Keys.TAB}
          modifier="shift"
          handler={this.handleOnShiftTab}
          type="keydown"
        />
        <EventListener event="resize" handler={handleOnResize} />
        <div className="c-Modal__innerWrapper">
          <Animate
            className="c-Modal__Card-container"
            delay={modalAnimationDelay}
            duration={modalAnimationDuration}
            easing={modalAnimationEasing}
            in={portalIsOpen}
            sequence={modalAnimationSequence}
          >
            {modalContentMarkup}
          </Animate>
        </div>
        <Animate
          delay={overlayAnimationDelay}
          duration={overlayAnimationDuration}
          in={portalIsOpen}
          sequence={overlayAnimationSequence}
        >
          <Overlay
            className={overlayComponentClassName}
            onClick={closePortal}
            role="presentation"
          />
        </Animate>
      </div>
    )
  }
}

Modal.propTypes = propTypes
Modal.defaultProps = defaultProps
Modal.childContextTypes = childContextTypes
Modal.displayName = 'Modal'

const ComposedModal = PortalWrapper(portalOptions)(Modal)
ComposedModal.Header = Header
ComposedModal.Body = Body
ComposedModal.Content = Content
ComposedModal.Footer = Footer

export const ModalComponent = Modal
export default ComposedModal
