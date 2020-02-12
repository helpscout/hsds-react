import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Body from './Modal.Body'
import Content from './Modal.Content'
import Footer from './Modal.Footer'
import Header from './Modal.Header'
import Overlay from './Modal.Overlay'
import CloseButton from '../CloseButton'
import EventListener from '../EventListener'
import KeypressListener from '../KeypressListener'
import PortalWrapper from '../PortalWrapper'
import Keys from '../../constants/Keys'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { findFocusableNodes } from '../../utilities/focus'
import { getClosestDocument, isNodeElement } from '../../utilities/node'

import {
  ModalUI,
  InnerWrapperUI,
  AnimatedCardContainerUI,
  CardUI,
  CloseUI,
} from './Modal.css'

const modalBaseZIndex = 1040
const portalOptions = {
  id: 'Modal',
  zIndex: modalBaseZIndex,
}

class Modal extends React.PureComponent {
  static propTypes = {
    cardClassName: PropTypes.string,
    className: PropTypes.string,
    closeIcon: PropTypes.bool,
    closeIconOffset: PropTypes.number,
    closeIconRepositionDelay: PropTypes.number,
    closePortal: PropTypes.func,
    containTabKeyPress: PropTypes.bool,
    exact: PropTypes.bool,
    forceClosePortal: PropTypes.func,
    id: PropTypes.string,
    isHsApp: PropTypes.bool,
    isOpen: PropTypes.bool,
    modalAnimationDelay: PropTypes.number,
    modalAnimationDuration: PropTypes.number,
    modalAnimationEasing: PropTypes.string,
    modalAnimationSequence: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    modalFocusTimeout: PropTypes.number,
    onBeforeClose: PropTypes.func,
    onBeforeOpen: PropTypes.func,
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
    overlayAnimationDelay: PropTypes.number,
    overlayAnimationDuration: PropTypes.number,
    overlayAnimationEasing: PropTypes.string,
    overlayAnimationSequence: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    overlayClassName: PropTypes.string,
    path: PropTypes.string,
    portalIsOpen: PropTypes.bool,
    renderTo: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    seamless: PropTypes.bool,
    style: PropTypes.any,
    timeout: PropTypes.number,
    trigger: PropTypes.any,
    wrapperClassName: PropTypes.string,
    zIndex: PropTypes.number,
  }

  static defaultProps = {
    closeIcon: true,
    closePortal: noop,
    closeIconOffset: 10,
    seamless: false,
    isHsApp: false,
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
    portalIsOpen: true,
    style: {},
    timeout: 80,
    wrapperClassName: 'c-ModalWrapper',
    zIndex: 1,
  }

  static childContextTypes = {
    positionCloseNode: noop,
  }

  static Body = Body
  static Content = Content
  static Footer = Footer
  static Header = Header
  static Overlay = Overlay

  documentnode
  cardnode
  closenode
  scrollablenode

  UNSAFE_componentWillMount() {
    this.documentNode = getClosestDocument(ReactDOM.findDOMNode(this))
  }

  componentDidMount() {
    this.positionCloseNode()
    this.focusModalCard()
  }

  getChildContext() {
    return {
      positionCloseNode: this.positionCloseNode,
    }
  }

  handleOnResize = () => {
    this.positionCloseNode()
  }

  handleOnTab = event => {
    const { containTabKeyPress } = this.props
    if (!containTabKeyPress || !this.cardNode || !this.documentNode) return

    const focusableNodes = findFocusableNodes(this.cardNode)
    const focusedNodeIndex = this.getFocusNodeIndexFromEvent(event)

    if (focusedNodeIndex === focusableNodes.length - 1) {
      event.preventDefault()
    }
  }

  handleOnShiftTab = event => {
    const { containTabKeyPress } = this.props
    if (!containTabKeyPress || !this.cardNode || !this.documentNode) return

    const focusedNodeIndex = this.getFocusNodeIndexFromEvent(event)

    if (focusedNodeIndex === 0) {
      event.preventDefault()
    }
  }

  getFocusNodeIndexFromEvent = event => {
    /* istanbul ignore if */
    if (!event || !this.cardNode || !this.documentNode) return 0

    const focusedNode = event.target
    const focusableNodes = findFocusableNodes(this.cardNode)
    const focusedNodeIndex = Array.prototype.indexOf.call(
      focusableNodes,
      focusedNode
    )

    return focusedNodeIndex
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
    setTimeout(() => {
      const scrollNode = scrollableNode || this.scrollableNode
      if (!this.closeNode || !isNodeElement(scrollNode)) return

      const defaultOffset = this.props.closeIconOffset + 1
      const offset = `${scrollNode.offsetWidth -
        scrollNode.clientWidth +
        defaultOffset}px`

      this.closeNode.style.right = offset
    }, this.props.closeIconRepositionDelay)
  }

  getCloseMarkup = () => {
    const { closeIcon, forceClosePortal, isHsApp } = this.props
    const shouldRenderClose = closeIcon && !isHsApp

    return (
      shouldRenderClose && (
        <CloseUI className="c-Modal__close" ref={this.setCloseNode}>
          <CloseButton onClick={forceClosePortal} />
        </CloseUI>
      )
    )
  }

  getChildrenMarkup = () => {
    const { children } = this.props

    return React.Children.map(children, child => {
      if (!child) return child

      const {
        type: { displayName },
      } = child

      if (
        child &&
        (displayName === 'Modal.Content' || displayName === 'Modal.Body')
      ) {
        return React.cloneElement(child, {
          scrollableRef: this.setScrollableNode,
        })
      }

      return child
    })
  }

  getInnerContentMarkup = () => {
    const {
      cardClassName,
      className,
      modalAnimationDelay,
      modalAnimationDuration,
      modalAnimationEasing,
      modalAnimationSequence,
      portalIsOpen,
      seamless,
      style,
      ...rest
    } = this.props

    const componentClassName = classNames('c-Modal__Card', cardClassName)

    const childrenMarkup = this.getChildrenMarkup()
    const closeMarkup = this.getCloseMarkup()

    const contentMarkup = !seamless ? (
      <CardUI
        {...getValidProps(rest)}
        className={componentClassName}
        seamless
        role="dialog"
        nodeRef={this.setCardNode}
        tabIndex="-1"
      >
        {closeMarkup}
        {childrenMarkup}
      </CardUI>
    ) : (
      <div className="c-Modal__innerContent" role="dialog">
        {childrenMarkup}
      </div>
    )

    return (
      <AnimatedCardContainerUI
        className="c-Modal__Card-container"
        delay={modalAnimationDelay}
        duration={modalAnimationDuration}
        easing={modalAnimationEasing}
        in={portalIsOpen}
        sequence={modalAnimationSequence}
      >
        {contentMarkup}
      </AnimatedCardContainerUI>
    )
  }

  getOverlayMarkup = () => {
    const {
      forceClosePortal,
      isHsApp,
      overlayAnimationDelay,
      overlayAnimationDuration,
      overlayAnimationSequence,
      overlayClassName,
      portalIsOpen,
    } = this.props

    const props = {
      className: overlayClassName,
      isOpen: portalIsOpen,
      isHsApp,
      onClick: forceClosePortal,
      overlayAnimationDelay,
      overlayAnimationDuration,
      overlayAnimationSequence,
    }

    return <Overlay {...props} />
  }

  setCardNode = node => {
    this.cardNode = node
  }

  setCloseNode = node => {
    this.closeNode = node
  }

  setScrollableNode = node => {
    this.scrollableNode = node
  }

  render() {
    const { className, isOpen, style, zIndex, isHsApp, ...rest } = this.props

    const componentClassName = classNames(
      'c-Modal',
      isOpen && 'is-open',
      className
    )

    const styles = { ...style, zIndex }

    return (
      <ModalUI
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
        <InnerWrapperUI
          {...getValidProps(rest)}
          className="c-Modal__innerWrapper"
          isHsApp={isHsApp}
        >
          {this.getInnerContentMarkup()}
        </InnerWrapperUI>
        {this.getOverlayMarkup()}
      </ModalUI>
    )
  }
}

export const ModalComponent = Modal

export default PortalWrapper(portalOptions)(Modal)
