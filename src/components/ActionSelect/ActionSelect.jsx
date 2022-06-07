import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import isNil from 'lodash.isnil'
import DropList from '../DropList'
import { SelectTag } from '../DropList/DropList.togglers'
import ContentResizer from './ActionSelect.ContentResizer'
import { findFirstFocusableNode } from '@hsds/utils-focus'
import { smoothScrollTo, linear } from '@hsds/utils-scroll'
import { ActionSelectUI } from './ActionSelect.css'

export class ActionSelect extends React.PureComponent {
  static className = 'c-ActionSelect'

  constructor(props) {
    super(props)

    this.state = {
      isOpen: props.isOpen,
      resizeCount: 0,
      selection: props.selectedItem || null,
    }
  }

  _isMounted = false
  contentNode

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.selectedItem !== this.props.selectedItem) {
      this.resizeContent()
    }
  }

  safeSetState = (nextState, callback) => {
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

  scrollIntoView = itemValue => {
    if (!this.props.shouldScrollIntoView(itemValue)) return

    const { y } = this.contentNode.getBoundingClientRect()
    const position = y
    const shouldScrollIntoView = window.scrollY < y

    if (!shouldScrollIntoView) return

    smoothScrollTo({
      node: window,
      position,
      direction: 'y',
      duration: this.props.animationDuration,
      timingFunction: linear,
    })
  }

  handleOnSelect = selection => {
    this.props.onSelect(selection.value, selection)
    this.autoFocusChildNode()
    this.resizeContent()
    this.scrollIntoView(selection.value)
    this.safeSetState({
      selection,
    })
  }

  handleOnOpenClose = isOpen => {
    this.safeSetState(
      {
        isOpen,
      },
      () => {
        isOpen ? this.props.onOpen() : this.props.onClose()
      }
    )
  }

  autoFocusChildNode = () => {
    requestAnimationFrame(() => {
      if (!this.contentNode || !this.props.isAutoFocusNodeOnSelect) return

      const focusableNode = findFirstFocusableNode(this.contentNode)

      if (focusableNode) {
        focusableNode.focus()
      }
    })
  }

  setContentNode = node => {
    this.contentNode = node
  }

  render() {
    const {
      animationDuration,
      animationEasing,
      children,
      'data-cy': dataCy,
      innerRef,
      items,
      onAnimationEnd,
      onAnimationUpdate,
      onResize,
      shouldRefocusOnClose,
      disabled,
      id,
      ariaLabel,
      error,
      withTooltip,
      tooltipProps,
    } = this.props
    const { isOpen, resizeCount, selection } = this.state

    return (
      <ActionSelectUI
        className={this.getClassName()}
        data-cy={dataCy}
        ref={innerRef}
      >
        <div className="c-ActionSelectDropdownWrapper">
          <DropList
            data-cy="ActionSelectDropdown"
            focusTogglerOnMenuClose={shouldRefocusOnClose()}
            items={items}
            onOpenedStateChange={this.handleOnOpenClose}
            onSelect={this.handleOnSelect}
            toggler={
              <SelectTag
                text={getSelectTagText(selection, items)}
                disabled={disabled}
                id={id}
                aria-label={ariaLabel || 'action toggle menu'}
                error={error}
                withTooltip={withTooltip}
                tooltipProps={{
                  appendTo: reference => {
                    return reference.closest('.c-ActionSelect').parentElement
                  },
                  maxWidth: 190,
                  title: 'Beacon',
                  placement: 'right',
                  ...tooltipProps,
                }}
              />
            }
            selection={selection}
          />
        </div>
        <ContentResizer
          animationDuration={animationDuration}
          animationEasing={animationEasing}
          borderWidth={1}
          mainRef={this.setContentNode}
          isOpen={isOpen}
          onAnimationEnd={onAnimationEnd}
          onAnimationUpdate={onAnimationUpdate}
          onResize={onResize}
          resizeCount={resizeCount}
          selectedKey={getUniqueKeyFromItem(selection)}
        >
          {children}
        </ContentResizer>
      </ActionSelectUI>
    )
  }
}

function getUniqueKeyFromItem(item) {
  return item && (item.id || item.value || item.label)
}

function getSelectTagText(selectedItem, items) {
  if (!isNil(selectedItem)) return selectedItem.label

  if (Array.isArray(items) && items[0]) {
    if (items[0].label) return items[0].label
    if (items[0].value) return items[0].value
  }

  return 'None'
}

function noop() {}

ActionSelect.defaultProps = {
  'data-cy': 'ActionSelect',
  animationDuration: 200,
  animationEasing: 'linear',
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

ActionSelect.propTypes = {
  'data-cy': PropTypes.string,
  animationDuration: PropTypes.number,
  animationEasing: PropTypes.string,
  enableTabNavigation: PropTypes.bool,
  innerRef: PropTypes.func,
  isAutoFocusNodeOnSelect: PropTypes.bool,
  isFadeContentOnOpen: PropTypes.bool,
  items: PropTypes.any,
  onAnimationEnd: PropTypes.func,
  onAnimationUpdate: PropTypes.func,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  onResize: PropTypes.func,
  onSelect: PropTypes.func,
  selectedItem: PropTypes.object,
  shouldRefocusOnClose: PropTypes.func,
  shouldScrollIntoView: PropTypes.func,
  /** Indicates that ActionSelect is disabled */
  disabled: PropTypes.bool,
  /** Id of the trigger element */
  id: PropTypes.string,
  /** Aria Label of the Toggler */
  ariaLabel: PropTypes.string,
  /** Error message */
  error: PropTypes.string,
  /** Enable a tooltip on the DropList/SelectTag item */
  withTooltip: PropTypes.bool,
  /** Customize the tooltip on the DropList/SelectTag item */
  tooltipProps: PropTypes.any,
}

export default ActionSelect
