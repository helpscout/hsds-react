// @flow
import type { PortalProps } from '../Portal/types'
import React, { PureComponent as Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Body from './Body'
import Content from './Content'
import Footer from './Footer'
import Header from './Header'
import Overlay from './Overlay'
import Animate from '../Animate'
import Card from '../Card'
import CloseButton from '../CloseButton'
import EventListener from '../EventListener'
import KeypressListener from '../KeypressListener'
import PortalWrapper from '../PortalWrapper'
import Keys from '../../constants/Keys'
import { classNames } from '../../utilities/classNames'
import { isComponentNamed } from '../../utilities/component'
import { noop } from '../../utilities/other'
import { findFocusableNodes } from '../../utilities/focus'
import { getClosestDocument, isNodeElement } from '../../utilities/node'
import { COMPONENT_KEY } from './utils'

type Props = PortalProps & {
  cardClassName?: string,
  children?: any,
  className?: string,
  closeIcon: boolean,
  closeIconRepositionDelay: number,
  closePortal: () => void,
  isOpen: boolean,
  containTabKeyPress: boolean,
  modalAnimationDelay: number,
  modalAnimationDuration: number,
  modalAnimationEasing: string,
  modalAnimationSequence: number | string,
  modalFocusTimeout: number,
  overlayAnimationDelay: number,
  overlayAnimationDuration: number,
  overlayAnimationEasing: string,
  overlayAnimationSequence: number | string,
  overlayClassName?: string,
  portalIsOpen: boolean,
  seamless: boolean,
  style: Object,
  trigger?: any,
  timeout: number,
  wrapperClassName?: string,
  zIndex: number,
}

type KeyboardEvent = SyntheticEvent<HTMLElement>

const modalBaseZIndex = 1040
const portalOptions = {
  id: 'Modal',
  zIndex: modalBaseZIndex,
}

class Modal extends Component<Props> {
  static defaultProps = {
    closeIcon: true,
    closePortal: noop,
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
    portalIsOpen: true,
    style: {},
    timeout: 80,
    wrapperClassName: 'c-ModalWrapper',
    zIndex: 1,
  }
  static childContextTypes = {
    positionCloseNode: PropTypes.func,
  }

  static Body = Body
  static Content = Content
  static Footer = Footer
  static Header = Header
  static Overlay = Overlay

  documentNode: HTMLElement
  cardNode: HTMLElement
  closeNode: ?HTMLElement
  scrollableNode: HTMLElement

  componentWillMount() {
    this.documentNode = getClosestDocument(ReactDOM.findDOMNode(this))
  }

  componentDidMount() {
    this.positionCloseNode()
    this.focusModalCard()
    /* istanbul ignore next */
    setTimeout(this.positionCloseNode, this.props.modalAnimationDuration)
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

  handleOnTab = (event: KeyboardEvent) => {
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

  handleOnShiftTab = (event: KeyboardEvent) => {
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

  positionCloseNode = (scrollableNode?: HTMLElement) => {
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

    const props = {
      className: overlayClassName,
      isOpen: portalIsOpen,
      onClick: closePortal,
      overlayAnimationDelay,
      overlayAnimationDuration,
      overlayAnimationSequence,
    }

    return <Overlay {...props} />
  }

  setCardRef = (node: HTMLElement) => {
    this.cardNode = node
  }

  setScrollableRef = (node: HTMLElement) => {
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

export const ModalComponent = Modal
export default PortalWrapper(portalOptions)(Modal)
