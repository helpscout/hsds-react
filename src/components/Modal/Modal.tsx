import * as React from 'react'
import * as ReactDOM from 'react-dom'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import ActionFooter from './Modal.ActionFooter'
import Body from './Modal.Body'
import Content from './Modal.Content'
import Footer from './Modal.Footer'
import Header from './Modal.Header'
import HeaderV2 from './Modal.HeaderV2'
import Overlay from './Modal.Overlay'
import CloseButton from '../CloseButton'
import EventListener from '../EventListener'
import KeypressListener from '../KeypressListener'
import PortalWrapper from '../PortalWrapper'
import { isHSApp } from '../PropProvider/PropProvider.utils'
import Keys from '../../constants/Keys'
import { classNames } from '../../utilities/classNames'
import { isComponentNamed } from '../../utilities/component'
import { noop } from '../../utilities/other'
import { findFocusableNodes } from '../../utilities/focus'
import { getClosestDocument, isNodeElement } from '../../utilities/node'
import { COMPONENT_KEY, MODAL_KIND, getModalKindClassName } from './Modal.utils'
import {
  ModalUI,
  InnerWrapperUI,
  AnimatedCardContainerUI,
  CardUI,
  CloseUI,
} from './styles/Modal.css'
import { ModalProps } from './Modal.types'

const modalBaseZIndex = 1040
const portalOptions = {
  id: 'Modal',
  zIndex: modalBaseZIndex,
}

const modalV2Animation = {
  delay: 0,
  duration: 250,
  easing: 'boop',
  sequence: 'fade scale',
}

const overlayV2Animation = {
  delay: 0,
  duration: 250,
  easing: 'ease-in-out',
  sequence: 'fade',
}

class Modal extends React.PureComponent<ModalProps> {
  static defaultProps = {
    closeIcon: true,
    closePortal: noop,
    closeIconOffset: 10,
    description: null,
    seamless: false,
    isOpen: false,
    closeIconRepositionDelay: 0,
    containTabKeyPress: true,
    icon: null,
    illo: null,
    illoSize: 60,
    kind: MODAL_KIND.DEFAULT,
    modalAnimationDelay: 0,
    modalAnimationDuration: 200,
    modalAnimationEasing: 'bounce',
    modalAnimationSequence: 'fade down',
    modalFocusTimeout: 90,
    numSteps: 1,
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
    status: '',
    state: '',
    step: 1,
    version: 1,
  }

  static childContextTypes = {
    positionCloseNode: noop,
  }

  static ActionFooter = ActionFooter
  static Body = Body
  static Content = Content
  static Footer = Footer
  static Header = Header
  static HeaderV2 = HeaderV2
  static Overlay = Overlay

  documentNode: HTMLElement
  cardNode: HTMLElement
  closeNode: HTMLElement
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

    const focusableNodes = findFocusableNodes(this.cardNode)
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
      description,
      icon,
      illo,
      illoSize,
      kind,
      modalAnimationDelay,
      modalAnimationDuration,
      modalAnimationEasing,
      modalAnimationSequence,
      numSteps,
      portalIsOpen,
      seamless,
      step,
      style,
      title,
      version,
      ...rest
    } = this.props

    const v2 = version === 2

    const modalKindClassName = getModalKindClassName(kind)

    const componentClassName = classNames(
      'c-Modal__Card',
      v2 && 'is-v2',
      v2 && modalKindClassName,
      cardClassName
    )

    const childrenMarkup = this.getChildrenMarkup()
    const closeMarkup = v2 ? null : this.getCloseMarkup()

    const headerMarkup = v2 ? (
      <HeaderV2
        icon={icon}
        illo={illo}
        illoSize={illoSize}
        description={description}
        title={title}
        kind={kind}
        numSteps={numSteps}
        step={step}
      />
    ) : null

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
        {headerMarkup}
        {childrenMarkup}
      </CardUI>
    ) : (
      <div className="c-Modal__innerContent" role="dialog">
        {headerMarkup}
        {childrenMarkup}
      </div>
    )

    const exit = !v2
    const easing = v2 ? modalV2Animation.easing : modalAnimationEasing
    const delay = v2 ? modalV2Animation.delay : modalAnimationDelay
    const duration = v2 ? modalV2Animation.duration : modalAnimationDuration
    const sequence = v2 ? modalV2Animation.sequence : modalAnimationSequence

    return (
      <AnimatedCardContainerUI
        className="c-Modal__Card-container"
        delay={delay}
        duration={duration}
        easing={easing}
        in={portalIsOpen}
        exit={exit}
        sequence={sequence}
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
      overlayAnimationEasing,
      overlayAnimationSequence,
      overlayClassName,
      portalIsOpen,
      version,
    } = this.props

    const v2 = version === 2
    const overlayClassNames = classNames(v2 && 'is-dark', overlayClassName)

    const easing = v2 ? overlayV2Animation.easing : overlayAnimationEasing
    const delay = v2 ? overlayV2Animation.delay : overlayAnimationDelay
    const duration = v2 ? overlayV2Animation.duration : overlayAnimationDuration
    const sequence = v2 ? overlayV2Animation.sequence : overlayAnimationSequence

    const props = {
      className: overlayClassNames,
      isOpen: portalIsOpen,
      onClick: forceClosePortal,
      overlayAnimationDelay: delay,
      overlayAnimationDuration: duration,
      overlayAnimationEasing: easing,
      overlayAnimationSequence: sequence,
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
    const {
      className,
      isOpen,
      kind,
      state,
      style,
      title,
      version,
      zIndex,
      ...rest
    } = this.props
    const v2 = version === 2

    const modalKindClassName = getModalKindClassName(kind)

    const componentClassName = classNames(
      'c-Modal',
      v2 && 'v2',
      isOpen && 'is-open',
      state === 'danger' && 'is-danger',
      v2 && modalKindClassName,
      className
    )

    const innerWrapperClassName = classNames(
      'c-Modal__innerWrapper',
      v2 && 'v2',
      v2 && modalKindClassName
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
          className={innerWrapperClassName}
        >
          {this.getInnerContentMarkup()}
        </InnerWrapperUI>
        {this.getOverlayMarkup()}
      </ModalUI>
    )
  }
}

export const ModalComponent = Modal
// TODO: fix typescript complains
// @ts-ignore
export default PortalWrapper(portalOptions)(Modal)
