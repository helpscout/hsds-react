import * as React from 'react'
import EventListener from '../EventListener'
import Manager from './Manager'
import Arrow from './Arrow'
import Popper from './Popper'
import Reference from './Reference'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { createUniqueIDFactory } from '../../utilities/id'
import { PopProps, PopInteraction } from './Pop.types'
import { PopUI } from './Pop.css'
import { INTERACTION_TYPE } from './Pop.utils'

export interface Props extends PopProps {
  onBeforeOpen: (instance: Pop) => Promise<any>
  onBeforeClose: (instance: Pop) => Promise<any>
  onContentClick: (event: React.MouseEvent) => void
  shouldClose: (...args: any) => boolean
  shouldOpen: (...args: any) => boolean
}

export interface State {
  id: string
  isOpen: boolean
}

const uniqueID = createUniqueIDFactory('Pop')

class Pop extends React.Component<Props, State> {
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

  componentDidMount() {
    this._isMounted = true
    if (this.state.isOpen) {
      this.open({ type: INTERACTION_TYPE.MOUNT })
    }
  }

  componentWillReceiveProps = (nextProps: Props) => {
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
    this.node = null
  }

  safeSetState = (state, callback) => {
    /* istanbul ignore else */
    if (this._isMounted) {
      this.setState(state, callback)
    }
  }

  handleMouseMove = (event: React.MouseEvent) => {
    if (!this.shouldHandleHover()) return
    if (this.state.isOpen) return
    this.open({ type: INTERACTION_TYPE.MOUSE_MOVE, props: { event } })
  }

  handleMouseLeave = (event: React.MouseEvent) => {
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
    if (event.keyCode === 13) {
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
    const popperNode = document.getElementById(this.state.id) as HTMLElement

    if (
      !event ||
      event.target === this.node ||
      // @ts-ignore
      this.node.contains(event.target) ||
      (popperNode && popperNode.contains(event.target))
    ) {
      return
    }

    this.close({ type: INTERACTION_TYPE.BODY_CLICK, props: { event } })
  }

  handleOnContentClick = (event: React.MouseEvent) => {
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

  open = ({ type, props: extraProps }: PopInteraction) => {
    if (!this.props.shouldOpen(type, extraProps)) return

    this.props.onBeforeOpen(this).then(() => {
      this.safeSetState({ isOpen: true }, () => {
        this.props.onOpen(this)
      })
    })
  }

  close = ({ type, props: extraProps }: PopInteraction) => {
    if (!this.props.shouldClose(type, extraProps)) return

    this.props.onBeforeClose(this).then(() => {
      this.safeSetState({ isOpen: false }, () => {
        this.props.onClose(this)
      })
    })
  }

  toggleOpen = (event: Event) => {
    if (this.state.isOpen) {
      this.close({ type: INTERACTION_TYPE.TOGGLE, props: { event } })
    } else {
      this.open({ type: INTERACTION_TYPE.TOGGLE, props: { event } })
    }
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

    const referenceMarkup = React.Children.map(children, child =>
      child.type === Reference
        ? React.cloneElement(child, {
            'aria-describedby': id,
            display,
          })
        : null
    )

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
        <div>
          <EventListener
            event="click"
            handler={this.handleOnBodyClick}
            scope={document.body}
          />
          <PopUI
            className={componentClassName}
            data-cy={this.props['data-cy']}
            innerRef={this.setNodeRef}
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

export default Pop
