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
import CloseButton from '../CloseButton'
import EventListener from '../EventListener'
import KeypressListener from '../KeypressListener'
import PortalWrapper from '../PortalWrapper'
import { isHSApp } from '../PropProvider/utils'
import Keys from '../../constants/Keys'
import { classNames } from '../../utilities/classNames'
import { isComponentNamed } from '../../utilities/component'
import { noop } from '../../utilities/other'
import { findFocusableNodes } from '../../utilities/focus'
import { getClosestDocument, isNodeElement } from '../../utilities/node'
import { COMPONENT_KEY } from './utils'
import {
  ModalUI,
  InnerWrapperUI,
  AnimatedCardContainerUI,
  CardUI,
  CloseUI,
} from './styles/Modal.css.js'

type Props = PortalProps & {
  cardClassName?: string,
  children?: any,
  className?: string,
  closeIcon: boolean,
  closeIconRepositionDelay: number,
  closeIconOffset: number,
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
    closeIconOffset: 10,
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
  }

  getChildContext() {
    return {
      positionCloseNode: this.positionCloseNode,
    }
  }

  handleOnResize = () => {
    this.positionCloseNode()
  }

  handleOnTab = (event: KeyboardEvent) => {
    const { containTabKeyPress } = this.props
    if (!containTabKeyPress || !this.cardNode || !this.documentNode) return

    const focusableNodes = findFocusableNodes(this.cardNode, this.documentNode)
    const focusedNodeIndex = this.getFocusNodeIndexFromEvent(event)

    if (focusedNodeIndex === focusableNodes.length - 1) {
      event.preventDefault()
    }
  }

  handleOnShiftTab = (event: KeyboardEvent) => {
    const { containTabKeyPress } = this.props
    if (!containTabKeyPress || !this.cardNode || !this.documentNode) return

    const focusedNodeIndex = this.getFocusNodeIndexFromEvent(event)

    if (focusedNodeIndex === 0) {
      event.preventDefault()
    }
  }

  getFocusNodeIndexFromEvent = (event: KeyboardEvent): number => {
    /* istanbul ignore if */
    if (!event || !this.cardNode || !this.documentNode) return 0

    const focusedNode = event.target
    const focusableNodes = findFocusableNodes(this.cardNode, this.documentNode)
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

  positionCloseNode = (scrollableNode?: HTMLElement) => {
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
    const { closeIcon, forceClosePortal } = this.props
    const shouldRenderClose = closeIcon && !isHSApp(this.props)

    return (
      shouldRenderClose && (
        <CloseUI className="c-Modal__close" innerRef={this.setCloseNode}>
          <CloseButton onClick={forceClosePortal} />
        </CloseUI>
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
      overlayAnimationDelay,
      overlayAnimationDuration,
      overlayAnimationSequence,
      overlayClassName,
      portalIsOpen,
    } = this.props

    const props = {
      className: overlayClassName,
      isOpen: portalIsOpen,
      onClick: forceClosePortal,
      overlayAnimationDelay,
      overlayAnimationDuration,
      overlayAnimationSequence,
    }

    return <Overlay {...props} />
  }

  setCardNode = (node: HTMLElement) => {
    this.cardNode = node
  }

  setCloseNode = (node: HTMLElement) => {
    this.closeNode = node
  }

  setScrollableNode = (node: HTMLElement) => {
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
