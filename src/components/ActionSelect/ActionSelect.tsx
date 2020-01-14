import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import { getUniqueKeyFromItem } from '../Dropdown/V2/Dropdown.utils'
import SelectDropdown from '../SelectDropdown'
import ContentResizer from './ActionSelect.ContentResizer'
import { classNames } from '../../utilities/classNames'
import { findFirstFocusableNode } from '../../utilities/focus'
import { smoothScrollTo, linear } from '../../utilities/smoothScroll'
import { noop } from '../../utilities/other'
import { ActionSelectProps, ActionSelectState } from './ActionSelect.types'
import { ActionSelectUI } from './styles/ActionSelect.css'
import { COMPONENT_KEY } from './ActionSelect.utils'
import { getColor } from '../../styles/utilities/color'

export class ActionSelect extends React.PureComponent<
  ActionSelectProps,
  ActionSelectState
> {
  static className = 'c-ActionSelect'
  static defaultProps = {
    'data-cy': 'ActionSelect',
    animationDuration: 200,
    animationEasing: 'linear',
    cardBorderColor: getColor('grey.700'),
    children: null,
    enableTabNavigation: false,
    innerRef: noop,
    isAutoFocusNodeOnSelect: true,
    isFadeContentOnOpen: true,
    items: [],
    onAnimationEnd: null,
    onAnimationUpdate: null,
    onClose: noop,
    onOpen: noop,
    onResize: noop,
    onSelect: noop,
    shouldRefocusOnClose: () => true,
    shouldScrollIntoView: () => true,
  }

  state = {
    isOpen: this.props.isOpen,
    resizeCount: 0,
    selectedItem: null,
  }

  _isMounted = false
  contentNode: HTMLDivElement

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedItem !== this.props.selectedItem) {
      /* istanbul ignore next */
      this.resizeContent()
    }
  }

  safeSetState = (nextState, callback?) => {
    if (this._isMounted) {
      this.setState(nextState, callback)
    }
  }

  getClassName() {
    const { children, className } = this.props

    return classNames(
      ActionSelect.className,
      children && 'is-withContent',
      className
    )
  }

  resizeContent = () => {
    this.safeSetState({
      resizeCount: this.state.resizeCount + 1,
    })
  }

  scrollIntoView = (item, props) => {
    /* istanbul ignore next */
    if (!this.props.shouldScrollIntoView(item, props)) return

    const { y } = this.contentNode.getBoundingClientRect() as DOMRect
    const position = y
    const shouldScrollIntoView = window.scrollY < y

    /* istanbul ignore next */
    if (!shouldScrollIntoView) return

    // Ignoring since JSDOM does not have window scroll events.
    /* istanbul ignore next */
    smoothScrollTo({
      node: window,
      position,
      direction: 'y',
      duration: this.props.animationDuration,
      timingFunction: linear,
    })
  }

  handleOnSelect = (item, props) => {
    this.props.onSelect(item, props)
    this.autoFocusChildNode()

    this.resizeContent()
    this.scrollIntoView(item, props)

    this.safeSetState({
      selectedItem: props.item,
    })
  }

  handleOnOpen = () => {
    this.safeSetState(
      {
        isOpen: true,
      },
      () => {
        this.props.onOpen()
      }
    )
  }

  handleOnClose = () => {
    this.safeSetState(
      {
        isOpen: false,
      },
      () => {
        this.props.onClose()
      }
    )
  }

  autoFocusChildNode = () => {
    requestAnimationFrame(() => {
      if (!this.contentNode || !this.props.isAutoFocusNodeOnSelect) return

      const focusableNode = findFirstFocusableNode(this.contentNode)
      /* istanbul ignore next */
      if (focusableNode) {
        focusableNode.focus()
      }
    })
  }

  handleShouldRefocusOnClose = props => {
    return this.props.shouldRefocusOnClose(props)
  }

  setContentNode = node => {
    this.contentNode = node
  }

  render() {
    const {
      animationDuration,
      animationEasing,
      children,
      innerRef,
      onAnimationEnd,
      onAnimationUpdate,
      onResize,
      ...rest
    } = this.props

    const { selectedItem } = this.state

    return (
      <ActionSelectUI
        className={this.getClassName()}
        data-cy={this.props['data-cy']}
        innerRef={innerRef}
      >
        <div className="c-ActionSelectDropdownWrapper">
          <SelectDropdown
            {...rest}
            onOpen={this.handleOnOpen}
            onClose={this.handleOnClose}
            data-cy="ActionSelectDropdown"
            onSelect={this.handleOnSelect}
            shouldRefocusOnClose={this.handleShouldRefocusOnClose}
          />
        </div>
        <ContentResizer
          animationDuration={animationDuration}
          animationEasing={animationEasing}
          borderWidth={1}
          innerRef={this.setContentNode}
          isOpen={this.state.isOpen}
          onAnimationEnd={onAnimationEnd}
          onAnimationUpdate={onAnimationUpdate}
          onResize={onResize}
          resizeCount={this.state.resizeCount}
          selectedKey={getUniqueKeyFromItem(selectedItem)}
        >
          {children}
        </ContentResizer>
      </ActionSelectUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(ActionSelect)

export default PropConnectedComponent
