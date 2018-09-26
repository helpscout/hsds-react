import React, { PureComponent as Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
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
import { classNames } from '../../utilities/classNames'
import { isComponentNamed } from '../../utilities/component'
import { noop } from '../../utilities/other'
import { findFocusableNodes } from '../../utilities/focus'
import { getClosestDocument, isNodeElement } from '../../utilities/node'
import { propTypes as portalTypes } from '../Portal'
import { COMPONENT_KEY } from './utils'

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
  documentNode = null
  cardNode = null
  closeNode = null
  scrollableNode = null

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

  getChildContext() {
    return {
      positionCloseNode: this.positionCloseNode,
    }
  }

  /* istanbul ignore next */
  handleOnResize = () => {
    this.positionCloseNode()
  }

  handleOnTab = event => {
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

  handleOnShiftTab = event => {
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

  focusModalCard = () => {
    const { modalFocusTimeout } = this.props
    setTimeout(() => {
      /* istanbul ignore else */
      if (this.cardNode) {
        this.cardNode.focus()
      }
    }, modalFocusTimeout)
  }

  positionCloseNode = scrollableNode => {
    const scrollNode = scrollableNode || this.scrollableNode
    if (!this.closeNode || !isNodeElement(scrollNode)) return

    const defaultOffset = 9
    const offset = `${scrollNode.offsetWidth -
      scrollNode.clientWidth +
      defaultOffset}px`

    this.closeNode.style.right = offset
  }

  getCloseMarkup = () => {
    const { closeIcon, closePortal } = this.props

    return (
      closeIcon && (
        <div
          className="c-Modal__close"
          ref={node => {
            this.closeNode = node
          }}
        >
          <CloseButton onClick={closePortal} />
        </div>
      )
    )
  }

  getChildrenMarkup = () => {
    const { children } = this.props

    return React.Children.map(children, child => {
      if (
        child &&
        (isComponentNamed(child, COMPONENT_KEY.Content) ||
          isComponentNamed(child, COMPONENT_KEY.Body))
      ) {
        return React.cloneElement(child, {
          scrollableRef: this.setScrollableRef,
        })
      }

      return child
    })
  }

  getContentMarkup = () => {
    const {
      cardClassName,
      modalAnimationDelay,
      modalAnimationDuration,
      modalAnimationEasing,
      modalAnimationSequence,
      portalIsOpen,
      seamless,
    } = this.props

    const cardComponentClassName = classNames('c-Modal__Card', cardClassName)

    const childrenMarkup = this.getChildrenMarkup()
    const closeMarkup = this.getCloseMarkup()

    const contentMarkup = !seamless ? (
      <Card
        className={cardComponentClassName}
        seamless
        role="dialog"
        nodeRef={this.setCardRef}
        tabIndex="-1"
      >
        {closeMarkup}
        {childrenMarkup}
      </Card>
    ) : (
      <div className="c-Modal__innerContent" role="dialog">
        {childrenMarkup}
      </div>
    )

    return (
      <Animate
        className="c-Modal__Card-container"
        delay={modalAnimationDelay}
        duration={modalAnimationDuration}
        easing={modalAnimationEasing}
        in={portalIsOpen}
        sequence={modalAnimationSequence}
      >
        {contentMarkup}
      </Animate>
    )
  }

  getOverlayMarkup = () => {
    const {
      closePortal,
      overlayAnimationDelay,
      overlayAnimationDuration,
      overlayAnimationSequence,
      overlayClassName,
      portalIsOpen,
    } = this.props

    const overlayComponentClassName = classNames(
      'c-Modal__Overlay',
      overlayClassName
    )

    return (
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
    )
  }

  setCardRef = node => {
    this.cardNode = node
  }

  setScrollableRef = node => {
    this.scrollableNode = node
  }

  render() {
    const { className, isOpen, style, zIndex, ...rest } = this.props

    const componentClassName = classNames(
      'c-Modal',
      isOpen && 'is-open',
      className
    )

    const styles = { ...style, zIndex }

    return (
      <div
        {...getValidProps(rest)}
        className={componentClassName}
        role="document"
        style={styles}
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
        <EventListener event="resize" handler={this.handleOnResize} />
        <div className="c-Modal__innerWrapper">{this.getContentMarkup()}</div>
        {this.getOverlayMarkup()}
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
