import React from 'react'
import PropTypes from 'prop-types'
import DropList from '../DropList'
import { SelectTag } from '../DropList/DropList.togglers'
import ContentResizer from './ActionSelect.ContentResizer'
import { classNames } from '../../utilities/classNames'
import { findFirstFocusableNode } from '../../utilities/focus'
import { smoothScrollTo, linear } from '../../utilities/smoothScroll'
import { noop } from '../../utilities/other'
import { ActionSelectUI } from './ActionSelect.css'

export class ActionSelect extends React.PureComponent {
  static className = 'c-ActionSelect'

  state = {
    isOpen: this.props.isOpen,
    resizeCount: 0,
    selectedItem: this.props.selectedItem || null,
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

  handleOnSelect = selectedItem => {
    this.props.onSelect(selectedItem.value, selectedItem)
    this.autoFocusChildNode()
    this.resizeContent()
    this.scrollIntoView(selectedItem.value)
    this.safeSetState({
      selectedItem,
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
    } = this.props
    const { isOpen, resizeCount, selectedItem } = this.state

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
            toggler={<SelectTag text={getSelectTagText(selectedItem, items)} />}
            selection={selectedItem}
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
          selectedKey={getUniqueKeyFromItem(selectedItem)}
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
  if (selectedItem != null) return selectedItem.label

  if (Array.isArray(items) && items[0]) {
    if (items[0].label) return items[0].label
    if (items[0].value) return items[0].value
  }

  return 'None'
}

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
  shouldRefocusOnClose: PropTypes.func,
  shouldScrollIntoView: PropTypes.func,
}

export default ActionSelect
