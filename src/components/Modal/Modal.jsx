import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
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
import classNames from 'classnames'
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
  preventEscActionElements: [
    'DropList__MenuList',
    'DropList__Combobox__input',
    'FieldInput__input',
    'EditableTextarea__Textarea',
  ],
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

function noop() {}

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
    const { focusModalOnShow } = this.props

    this.positionCloseNode()

    if (focusModalOnShow) {
      this.focusModalCard()
    }
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
      const offset = `${
        scrollNode.offsetWidth - scrollNode.clientWidth + defaultOffset
      }px`

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
        {...rest}
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
        {...rest}
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
          {...rest}
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

Modal.defaultProps = {
  closeIcon: true,
  closeIconOffset: 10,
  closeIconRepositionDelay: 0,
  closePortal: noop,
  containTabKeyPress: true,
  'data-cy': 'Modal',
  description: null,
  focusModalOnShow: true,
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

Modal.propTypes = {
  /** Custom class names to be added to the child `Card` component. */
  cardClassName: PropTypes.string,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Shows/hides the component's close icon UI. */
  closeIcon: PropTypes.bool,
  /** Amount of time before the `CloseButton` gets repositioned. */
  closeIconRepositionDelay: PropTypes.number,
  closePortal: PropTypes.func,
  closeIconOffset: PropTypes.number,
  /** Prevents tab/shift+tab focus from leaving the Modal. */
  containTabKeyPress: PropTypes.bool,
  /** Renders in version 2 Modals beneath the title. */
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Used with `path` and React Router. Renders if path matches _exactly_ */
  exact: PropTypes.bool,
  /** If you don't want the focus to be moved to the Modal when it enters */
  focusModalOnShow: PropTypes.bool,
  forceClosePortal: PropTypes.func,
  /** Renders as an `Icon` in the top left corner of a version 2 Modal header. */
  icon: PropTypes.string,
  /** The size to render the provided `Icon` in a version 2 Modal header. */
  iconSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  id: PropTypes.string,
  /** Expects an `Illo` to be displayed in a version 2 Modal header. */
  illo: PropTypes.any,
  /** The size to render the provided `Illo` in a version 2 Modal header. */
  illoSize: PropTypes.number,
  /** Shows/hides the component. */
  isOpen: PropTypes.bool,
  isHsApp: PropTypes.bool,
  /** The kind of version 2 Modal style to apply. */
  kind: PropTypes.oneOf(['alert', 'default', 'branded', 'sequence']),
  /** Custom animation delay for the child `Card` component. */
  modalAnimationDelay: PropTypes.number,
  /** Custom animation duration for the child `Card` component. */
  modalAnimationDuration: PropTypes.number,
  /** Custom animation easing for the child `Card` component. */
  modalAnimationEasing: PropTypes.string,
  /** Custom animation sequence for the child `Card` component. */
  modalAnimationSequence: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  /** Amount of time (`ms`) before the Modal force focuses. */
  modalFocusTimeout: PropTypes.number,
  /** Total number of steps to be used in a version 2 Sequence Modal. */
  numSteps: PropTypes.number,
  /** Fires when the component is mounted, but not rendered. */
  onBeforeClose: PropTypes.func,
  /** Fires as soon as the component has rendered. */
  onOpen: PropTypes.func,
  /** Fires when the component is about to unmount. */
  onBeforeOpen: PropTypes.func,
  /** Fires after the component is unmounted. */
  onClose: PropTypes.func,
  /** Custom class names to be added to the child `Overlay` component. */
  overlayClassName: PropTypes.string,
  /** Custom animation delay for the child `Overlay` component. */
  overlayAnimationDelay: PropTypes.number,
  /** Custom animation duration for the child `Overlay` component. */
  overlayAnimationDuration: PropTypes.number,
  /** Custom animation easing for the child `Overlay` component. */
  overlayAnimationEasing: PropTypes.string,
  /** Custom animation sequence for the child `Overlay` component. */
  overlayAnimationSequence: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  /** Renders component based on a [React Router path](https://reacttraining.com/react-router/web/api/Route/path-string). */
  path: PropTypes.string,
  portalIsOpen: PropTypes.bool,
  /** A CSS selector to render content, instead of the `<body>`. (Portal prop)*/
  renderTo: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Renders content with the standard `Card` UI. */
  seamless: PropTypes.bool,
  /** State to use when styling a version 2 Modal (currently only `danger` state is custom styled). */
  state: PropTypes.oneOf(['', 'danger']),
  status: PropTypes.string,
  /** Current step to be used in a version 2 Sequence Modal. */
  step: PropTypes.number,
  /** Custom styles */
  style: PropTypes.any,
  timeout: PropTypes.number,
  /** The UI the user clicks to trigger the modal. */
  trigger: PropTypes.any,
  /** Version of the Modal styles to apply (version 2 is the new standard, version 1 is legacy). */
  version: PropTypes.number,
  /** Custom className to add to the PortalWrapper component. */
  wrapperClassName: PropTypes.string,
  /** Custom z-index rule directly on the modal */
  zIndex: PropTypes.number,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export const ModalComponent = Modal

export default PortalWrapper(portalOptions)(Modal)
