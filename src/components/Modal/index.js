import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import Body from './Body'
import Footer from './Footer'
import Header from './Header'
import Animate from '../Animate'
import Card from '../Card'
import CloseButton from '../CloseButton'
import EventListener from '../EventListener'
import Overlay from '../Overlay'
import PortalWrapper from '../PortalWrapper'
import Scrollable from '../Scrollable'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { propTypes as portalTypes } from '../Portal'
import { hasContentOverflowY } from '../../utilities/node'
import getScrollbarWidth from '../../vendors/getScrollbarWidth'

export const propTypes = Object.assign({}, portalTypes, {
  closeIcon: PropTypes.bool,
  seamless: PropTypes.bool,
  scrollFade: PropTypes.bool,
  scrollableRef: PropTypes.func,
  modalAnimationDelay: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object
  ]),
  overlayAnimationDelay: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object
  ]),
  onScroll: PropTypes.func,
  trigger: PropTypes.element,
  wrapperClassName: PropTypes.string
})

const defaultProps = {
  closeIcon: true,
  seamless: false,
  scrollFade: true,
  isOpen: false,
  modalAnimationDelay: {
    in: 200,
    out: 100
  },
  overlayAnimationDelay: {
    in: 100,
    out: 200
  },
  onScroll: noop,
  scrollableRef: noop,
  wrapperClassName: 'c-ModalWrapper'
}

const modalBaseZIndex = 1040
const portalOptions = {
  id: 'Modal',
  timeout: 40,
  zIndex: modalBaseZIndex
}

const scrollbarWidth = getScrollbarWidth()

class Modal extends Component {
  constructor () {
    super()
    this.handleOnResize = this.handleOnResize.bind(this)
    this.closeNode = null
    this.scrollableNode = null
    this._hasHeader = false
  }

  componentDidMount () {
    this.positionCloseNode()
  }

  /* istanbul ignore next */
  handleOnResize () {
    this.positionCloseNode()
  }

  positionCloseNode () {
    if (
      !this.closeNode ||
      !this.scrollableNode ||
      this._hasHeader
    ) return

    const defaultOffset = 8
    const borderOffset = 2
    const offset = hasContentOverflowY(this.scrollableNode)
      ? /* istanbul ignore next */ `${scrollbarWidth + borderOffset}px`
      : `${defaultOffset}px`

    this.closeNode.style.right = offset
  }

  render () {
    const {
      children,
      className,
      closeIcon,
      closePortal,
      exact,
      isOpen,
      modalAnimationDelay,
      openPortal,
      onClose,
      onScroll,
      overlayAnimationDelay,
      path,
      portalIsOpen,
      portalIsMounted,
      seamless,
      scrollFade,
      scrollableRef,
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

    const closeMarkup = closeIcon ? (
      <div
        className='c-Modal__close'
        ref={node => { this.closeNode = node }}
      >
        <CloseButton onClick={closePortal} />
      </div>
    ) : null

    const modalStyle = style ? Object.assign({}, style, {
      zIndex
    }) : { zIndex }

    let headerMarkup
    let bodyMarkup
    let footerMarkup

    let parsedChildren = React.Children.map(children, child => {
      if (child.type === Header) {
        this._hasHeader = true
        headerMarkup = child
        return null
      }
      if (child.type === Body) {
        bodyMarkup = child
        return null
      }
      if (child.type === Footer) {
        footerMarkup = child
        return null
      }
      return child
    })

    parsedChildren = bodyMarkup
      ? bodyMarkup.props.children
      : parsedChildren

    const modalContentMarkup = !seamless ? (
      <Card className='c-Modal__Card' seamless role='dialog'>
        {headerMarkup}
        {closeMarkup}
        <Body>
          <Scrollable
            className='c-Modal__scrollable'
            fade
            rounded
            onScroll={onScroll}
            scrollableRef={(node) => {
              this.scrollableNode = node
              scrollableRef(node)
            }}
          >
            {parsedChildren}
          </Scrollable>
        </Body>
        {footerMarkup}
      </Card>
    ) : (
      <div className='c-Modal__innerContent'>
        {headerMarkup}
        <Body>
          {parsedChildren}
        </Body>
        {footerMarkup}
      </div>
    )

    return (
      <div className={componentClassName} role='document' style={modalStyle} {...rest}>
        <EventListener event='resize' handler={handleOnResize} />
        <div className='c-Modal__content'>
          <Animate className='c-Modal__Card-container' sequence='fade down' in={portalIsOpen} wait={modalAnimationDelay}>
            {modalContentMarkup}
          </Animate>
        </div>
        <Animate sequence='fade' in={portalIsOpen} wait={overlayAnimationDelay}>
          <Overlay onClick={closePortal} role='presentation' />
        </Animate>
      </div>
    )
  }
}

Modal.propTypes = propTypes
Modal.defaultProps = defaultProps
Modal.displayName = 'Modal'

const ComposedModal = PortalWrapper(portalOptions)(Modal)
ComposedModal.Header = Header
ComposedModal.Body = Body
ComposedModal.Footer = Footer

export const ModalComponent = Modal
export default ComposedModal
