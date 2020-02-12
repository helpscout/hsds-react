import React from 'react'
import PropTypes from 'prop-types'
import EventListener from '../EventListener'
import Manager from './Manager'
import Arrow from './Arrow'
import Popper from './Popper'
import Reference from './Reference'
import Keys from '../../constants/Keys'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { createUniqueIDFactory } from '../../utilities/id'
import { PopUI } from './Pop.css'
import { INTERACTION_TYPE } from './Pop.utils'

const uniqueID = createUniqueIDFactory('Pop')

class Pop extends React.Component {
  static defaultProps = {
    arrowSize: 5,
    closeOnBodyClick: true,
    closeOnContentClick: false,
    closeOnEscPress: true,
    closeOnMouseLeave: true,
    display: 'inline-block',
    isOpen: false,
    modifiers: {},
    onBeforeClose: () => Promise.resolve(),
    onBeforeOpen: () => Promise.resolve(),
    onClose: noop,
    onContentClick: noop,
    onOpen: noop,
    placement: 'auto',
    shouldClose: () => true,
    shouldOpen: () => true,
    showArrow: true,
    triggerOn: 'click',
    wrapperStyles: {},
    zIndex: 1000,
  }
  static Arrow = Arrow
  static Manager = Manager
  static Popper = Popper
  static Reference = Reference

  node = null
  _isMounted = false

  state = {
    id: uniqueID(),
    isOpen: this.props.isOpen || false,
  }

  constructor(props) {
    super(props)
    this.node = React.createRef()
  }

  componentDidMount() {
    this._isMounted = true
    if (this.state.isOpen) {
      this.open({ type: INTERACTION_TYPE.MOUNT })
    }
  }

  UNSAFE_componentWillReceiveProps = nextProps => {
    const { isOpen: wasOpen } = this.props
    const { isOpen: willOpen } = nextProps

    if (wasOpen === willOpen) return

    /* istanbul ignore else */
    if (willOpen !== this.state.isOpen) {
      if (willOpen) {
        this.open({ type: INTERACTION_TYPE.UPDATE_IS_OPEN })
      } else {
        this.close({ type: INTERACTION_TYPE.UPDATE_IS_OPEN })
      }
    }
  }

  componentWillUnmount = () => {
    this._isMounted = false
  }

  safeSetState = (state, callback) => {
    /* istanbul ignore else */
    if (this._isMounted) {
      this.setState(state, callback)
    }
  }

  handleMouseMove = event => {
    if (!this.shouldHandleHover()) return
    if (this.state.isOpen) return
    this.open({ type: INTERACTION_TYPE.MOUSE_MOVE, props: { event } })
  }

  handleMouseLeave = event => {
    if (!this.shouldHandleHover()) return
    if (!this.props.closeOnMouseLeave) return

    this.close({ type: INTERACTION_TYPE.MOUSE_LEAVE, props: { event } })
  }

  handleClick = event => {
    if (this.shouldHandleHover()) return
    if (event) event.stopPropagation()
    this.toggleOpen(event)
  }

  handleKeyUp = event => {
    if (event.keyCode === Keys.ENTER) {
      this.handleClick(event)
    }
  }

  handleBlur = event => {
    // Whether the Pop was opened by focus or enter press,
    // it should be closed on blur.
    if (this.state.isOpen) {
      this.safeSetState({ isOpen: false }, () => {
        this.props.onClose(this)
      })
    }
  }

  handleFocus = event => {
    // We do not always want to open the Pop on focus,
    // as sometimes other interaction may be required
    // to open it.
    if (this.shouldHandleFocus() && !this.state.isOpen) {
      this.toggleOpen(event)
    }
  }

  handleOnBodyClick = event => {
    if (!this.state.isOpen) return
    if (!this.shouldHandleHover() && !this.props.closeOnBodyClick) return
    const popperNode = document.getElementById(this.state.id)

    if (
      !event ||
      event.target === this.node.current ||
      this.node.current.contains(event.target) ||
      (popperNode && popperNode.contains(event.target))
    ) {
      return
    }

    this.close({ type: INTERACTION_TYPE.BODY_CLICK, props: { event } })
  }

  handleOnContentClick = event => {
    this.props.onContentClick(event)

    if (!this.props.closeOnContentClick) {
      event.stopPropagation()
      return
    }

    this.close({ type: INTERACTION_TYPE.CONTENT_CLICK, props: { event } })
  }

  handleOnPopperMouseLeave = event => {
    if (!this.shouldHandleHover()) return
    this.close({ type: INTERACTION_TYPE.POPPER_MOUSE_LEAVE, props: { event } })
  }

  shouldHandleFocus = () => this.props.triggerOn === 'hover'

  shouldHandleHover = () => this.props.triggerOn === 'hover'

  open = ({ type, props: extraProps }) => {
    if (!this.props.shouldOpen(type, extraProps)) return

    this.props.onBeforeOpen(this).then(() => {
      this.safeSetState({ isOpen: true }, () => {
        this.props.onOpen(this)
      })
    })
  }

  close = ({ type, props: extraProps }) => {
    if (!this.props.shouldClose(type, extraProps)) return

    this.props.onBeforeClose(this).then(() => {
      this.safeSetState({ isOpen: false }, () => {
        this.props.onClose(this)
      })
    })
  }

  toggleOpen = event => {
    if (this.state.isOpen) {
      this.close({ type: INTERACTION_TYPE.TOGGLE, props: { event } })
    } else {
      this.open({ type: INTERACTION_TYPE.TOGGLE, props: { event } })
    }
  }

  getWrapperStyles() {
    const { wrapperStyles } = this.props

    return { ...wrapperStyles }
  }

  setNodeRef = node => (this.node = node)

  render() {
    const {
      animationDelay,
      animationDuration,
      animationEasing,
      animationSequence,
      arrowSize,
      children,
      className,
      id: idProp,
      placement,
      display,
      modifiers,
      showArrow,
      zIndex,
    } = this.props

    if (!children) return null

    const id = idProp || this.state.id
    const componentClassName = classNames(
      'c-PopWrapper',
      display && `is-display-${display}`,
      className
    )

    const referenceMarkup = React.Children.map(children, child => {
      return child.type === Reference
        ? React.cloneElement(child, {
            'aria-describedby': id,
            display,
          })
        : null
    })

    /* istanbul ignore next */
    /**
     * Too difficult to text in Enzyme, due to createContext + Portal + cloning.
     */
    const popperMarkup = React.Children.map(children, child =>
      child.type === Popper
        ? React.cloneElement(child, {
            animationDelay,
            animationDuration,
            animationEasing,
            animationSequence,
            arrowSize,
            className,
            close: this.close,
            'data-cy': `${this.props['data-cy']}Popper`,
            id,
            isOpen: this.state.isOpen,
            onContentClick: this.handleOnContentClick,
            onMouseLeave: this.handleOnPopperMouseLeave,
            modifiers,
            placement,
            showArrow,
            zIndex,
          })
        : null
    )

    return (
      <Manager>
        <div style={this.getWrapperStyles()}>
          <EventListener
            event="click"
            handler={this.handleOnBodyClick}
            scope={document.body}
          />
          <PopUI
            className={componentClassName}
            data-cy={this.props['data-cy']}
            ref={this.node}
            onMouseMove={this.handleMouseMove}
            onMouseLeave={this.handleMouseLeave}
            onBlur={this.handleBlur}
            onClick={this.handleClick}
            onFocus={this.handleFocus}
            onKeyUp={this.handleKeyUp}
          >
            {referenceMarkup}
            {popperMarkup}
          </PopUI>
        </div>
      </Manager>
    )
  }
}

export const popProps = {
  animationDelay: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  animationDuration: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  animationEasing: PropTypes.string,
  animationSequence: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  arrowClassName: PropTypes.string,
  arrowSize: PropTypes.number,
  children: PropTypes.any,
  className: PropTypes.string,
  closeOnBodyClick: PropTypes.bool,
  closeOnEscPress: PropTypes.bool,
  closeOnContentClick: PropTypes.bool,
  closeOnMouseLeave: PropTypes.bool,
  display: PropTypes.string,
  id: PropTypes.string,
  isOpen: PropTypes.bool,
  modifiers: PropTypes.any,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  placement: PropTypes.oneOf([
    'auto-start',
    'auto',
    'auto-end',
    'top-start',
    'top',
    'top-end',
    'right-start',
    'right',
    'right-end',
    'bottom-end',
    'bottom',
    'bottom-start',
    'left-end',
    'left',
    'left-start',
  ]),
  triggerOn: PropTypes.oneOf(['hover', 'click']),
  showArrow: PropTypes.bool,
  zIndex: PropTypes.number,
  dataCy: PropTypes.string,
}

Pop.propTypes = Object.assign({}, popProps, {
  onBeforeOpen: PropTypes.func,
  onBeforeClose: PropTypes.func,
  onContentClick: PropTypes.func,
  shouldClose: PropTypes.func,
  shouldOpen: PropTypes.func,
  wrapperStyles: PropTypes.object,
})

export default Pop
