import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import ModalActionFooter from './Modal.ActionFooter'
import ModalBody from './Modal.Body'
import ModalContent from './Modal.Content'
import ModalFooter from './Modal.Footer'
import ModalHeader from './Modal.Header'
import ModalHeaderV2 from './Modal.HeaderV2'
import ModalOverlay from './Modal.Overlay'
import CloseButton from '../CloseButton'
import EventListener from '../EventListener'
import KeypressListener from '../KeypressListener'
import PortalWrapper from '../PortalWrapper'
import Keys from '../../constants/Keys'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { findFocusableNodes } from '../../utilities/focus'
import { getClosestDocument, isNodeElement } from '../../utilities/node'
import { MODAL_KIND, getModalKindClassName } from './Modal.utils'
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

class Modal extends React.PureComponent {
  static childContextTypes = {
    positionCloseNode: noop,
  }
  static ActionFooter = ModalActionFooter
  static Body = ModalBody
  static Content = ModalContent
  static Footer = ModalFooter
  static Header = ModalHeader
  static Overlay = ModalOverlay
  static HeaderV2 = ModalHeaderV2

  documentnode
  cardnode
  closenode
  scrollableNode

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
      if (focusableNodes && focusableNodes[0]) focusableNodes[0].focus()
    }
  }

  handleOnShiftTab = event => {
    const { containTabKeyPress } = this.props
    if (!containTabKeyPress || !this.cardNode || !this.documentNode) return

    const focusableNodes = findFocusableNodes(this.cardNode)
    const focusedNodeIndex = this.getFocusNodeIndexFromEvent(event)

    if (focusedNodeIndex === 0) {
      event.preventDefault()
      const i = focusableNodes.length - 1
      if (i > -1 && focusableNodes && focusableNodes[i])
        focusableNodes[i].focus()
    }
  }

  getFocusNodeIndexFromEvent = event => {
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
        (displayName === 'ModalContent' || displayName === 'ModalBody')
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
      iconSize,
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
      v2 && 'v2',
      v2 && modalKindClassName,
      cardClassName
    )
    const childrenMarkup = this.getChildrenMarkup()
    const closeMarkup = v2 ? null : this.getCloseMarkup()
    const headerMarkup = v2 ? (
      <ModalHeaderV2
        icon={icon}
        iconSize={iconSize}
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
      isHsApp,
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
      isHsApp,
      onClick: forceClosePortal,
      overlayAnimationDelay: delay,
      overlayAnimationDuration: duration,
      overlayAnimationEasing: easing,
      overlayAnimationSequence: sequence,
    }

    return <ModalOverlay {...props} />
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
    const {
      className,
      'data-cy': dataCy,
      isOpen,
      isHsApp,
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
        data-cy={dataCy}
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
          isHsApp={isHsApp}
        >
          {this.getInnerContentMarkup()}
        </InnerWrapperUI>
        {this.getOverlayMarkup()}
      </ModalUI>
    )
  }
}

Modal.propTypes = {
  cardClassName: PropTypes.string,
  className: PropTypes.string,
  closeIcon: PropTypes.bool,
  closeIconOffset: PropTypes.number,
  closeIconRepositionDelay: PropTypes.number,
  closePortal: PropTypes.func,
  containTabKeyPress: PropTypes.bool,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  exact: PropTypes.bool,
  forceClosePortal: PropTypes.func,
  id: PropTypes.string,
  isHsApp: PropTypes.bool,
  isOpen: PropTypes.bool,
  icon: PropTypes.string,
  iconSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  illo: PropTypes.any,
  illoSize: PropTypes.number,
  kind: PropTypes.string,
  modalAnimationDelay: PropTypes.number,
  modalAnimationDuration: PropTypes.number,
  modalAnimationEasing: PropTypes.string,
  modalAnimationSequence: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  modalFocusTimeout: PropTypes.number,
  numSteps: PropTypes.number,
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
  state: PropTypes.string,
  status: PropTypes.string,
  step: PropTypes.number,
  style: PropTypes.any,
  timeout: PropTypes.number,
  trigger: PropTypes.any,
  version: PropTypes.number,
  wrapperClassName: PropTypes.string,
  zIndex: PropTypes.number,
}

Modal.defaultProps = {
  closeIcon: true,
  closeIconOffset: 10,
  closeIconRepositionDelay: 0,
  closePortal: noop,
  containTabKeyPress: true,
  'data-cy': 'Modal',
  description: null,
  icon: null,
  iconSize: '24',
  illo: null,
  illoSize: 60,
  isHsApp: false,
  isOpen: false,
  kind: MODAL_KIND.DEFAULT,
  modalAnimationDelay: 0,
  modalAnimationDuration: 200,
  modalAnimationEasing: 'bounce',
  modalAnimationSequence: 'fade down',
  modalFocusTimeout: 90,
  numSteps: 1,
  onScroll: noop,
  overlayAnimationDelay: 0,
  overlayAnimationDuration: 200,
  overlayAnimationEasing: 'ease',
  overlayAnimationSequence: 'fade',
  portalIsOpen: true,
  seamless: false,
  state: '',
  status: '',
  step: 1,
  style: {},
  timeout: 80,
  version: 1,
  wrapperClassName: 'c-ModalWrapper',
  zIndex: 1,
}

export const ModalComponent = Modal

export default PortalWrapper(portalOptions)(Modal)
