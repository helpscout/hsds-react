import * as React from 'react'
import { DropdownProps } from '../Dropdown/V2/Dropdown.types'
import propConnect from '../PropProvider/propConnect'
import Dropdown from '../Dropdown/DropdownV2'
import { isItemsEmpty } from '../Dropdown/V2/Dropdown.utils'
import { initialState } from '../Dropdown/V2/Dropdown.store'
import Keys from '../../constants/Keys'
import Text from '../Text'
import { noop } from '../../utilities/other'
import { classNames } from '../../utilities/classNames'
import {
  namespaceComponent,
  renderRenderPropComponent,
} from '../../utilities/component'
import { HeaderUI, InputUI, MenuUI, EmptyItemUI } from './ComboBox.css'
import { COMPONENT_KEY } from './ComboBox.utils'

export const shouldDropDirectionUpdate = (positionProps: any = {}) => {
  // Allow for the position to change, if ComboBox is set to dropUp
  if (positionProps.dropUp) {
    return true
    // Otherwise, disable it
  } else {
    return false
  }
}

export interface ComboBoxProps extends DropdownProps {
  closeOnInputTab: boolean
  customFilter?: (filterProps: Object, defaultFilter: any) => void
  onInputChange: (value: string) => void
  inputProps: any
  itemFilterKey: string
  noResultsLabel: string
  renderMenuStart?: () => void
  renderMenuEnd?: () => void
  renderFooter?: () => void
  showInput: boolean
  shouldDropDirectionUpdate: (Position: any) => boolean
}

export interface ComboBoxState {
  inputValue: string
  isOpen: boolean
}

const defaultInputProps = {
  autoFocus: true,
  className: 'c-ComboBoxInput',
  onOpen: noop,
  onClose: noop,
  onChange: noop,
  onKeyDown: noop,
  placeholder: 'Search',
  size: 'xssm',
}

export class ComboBox extends React.Component<ComboBoxProps, ComboBoxState> {
  static defaultProps = {
    ...initialState,
    closeOnInputTab: true,
    onInputChange: noop,
    inputProps: {},
    itemFilterKey: 'value',
    innerWrapperRef: noop,
    maxHeight: 330,
    minWidth: 222,
    maxWidth: 222,
    noResultsLabel: 'No results',
    showInput: true,
    shouldDropDirectionUpdate,
  }

  state = {
    isOpen: this.props.isOpen,
    inputValue: '',
  }

  _isMounted: boolean
  menuWrapperNode: HTMLElement

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  safeSetState = (nextState, callback?) => {
    if (this._isMounted) {
      this.setState(nextState, callback)
    }
  }

  onInputChange = inputValue => {
    if (inputValue === this.state.inputValue) return

    this.safeSetState({
      inputValue,
    })

    this.props.onInputChange(inputValue)

    /* istanbul ignore next */
    if (this.props.inputProps.onChange) {
      this.props.inputProps.onChange(inputValue)
    }

    this.scrollMenuToTop()
  }

  onSelect = (selectedItem, props) => {
    this.resetInputValue()
    this.props.onSelect(selectedItem, props)
  }

  handleOnKeyDown = event => {
    /* istanbul ignore else */
    if (event.keyCode === Keys.ENTER) {
      event.stopPropagation()
    }
    /* istanbul ignore else */
    if (event.keyCode === Keys.TAB) {
      this.handleTabPress(event)
    }
    /* istanbul ignore else */
    if (this.props.inputProps.onKeyDown) {
      this.props.inputProps.onKeyDown(event)
    }
  }

  handleTabPress(event) {
    if (this.props.closeOnInputTab) {
      event.stopPropagation()

      this.handleOnClose()
    }
  }

  filterGroupSearchResultFromItems = (groups, inputValue) => {
    return groups.map(group => {
      return {
        ...group,
        items: group.items.filter(item =>
          this.filterSearchResult(item, inputValue)
        ),
      }
    })
  }

  filterSearchResult = (item, inputValue) => {
    const { itemFilterKey } = this.props
    if (!inputValue) return true
    if (!item[itemFilterKey]) return false

    return item[itemFilterKey].toLowerCase().includes(inputValue.toLowerCase())
  }

  resetInputValue = () => {
    this.safeSetState({
      inputValue: '',
    })
    this.scrollMenuToTop()
  }

  scrollMenuToTop = () => {
    requestAnimationFrame(() => {
      /* istanbul ignore else */
      if (!this.menuWrapperNode) return
      this.menuWrapperNode.scrollTop = 0
    })
  }

  defaultFilter = filterProps => {
    const { hasGroups, items, inputValue } = filterProps
    let nextItems

    // 1. Group filtering
    if (hasGroups) {
      nextItems = this.filterGroupSearchResultFromItems(items, inputValue)
    }
    // 2. Standard flat item filtering
    else {
      nextItems = items.filter(item =>
        this.filterSearchResult(item, inputValue)
      )
    }

    return nextItems
  }

  renderItems = dropdownProps => {
    const { items, renderItems, renderItemsAsGroups, hasGroups } = dropdownProps

    const { customFilter } = this.props
    const { inputValue } = this.state

    const filterProps = {
      items,
      hasGroups,
      inputValue,
    }

    let nextItems

    // 1. User defined custom filtering
    if (customFilter) {
      nextItems = customFilter(filterProps, this.defaultFilter)
    }
    // 2. Default filtering
    else {
      nextItems = this.defaultFilter(filterProps)
    }

    // Render empty state, if empty
    if (isItemsEmpty(nextItems)) {
      return this.renderEmpty()
    }

    // We need to render the items slightly differently for groups.
    // To do this, we'll rely on the function provided to use from Dropdown.
    if (hasGroups) {
      return renderItemsAsGroups({ items: nextItems, withIndex: !!inputValue })
    } else {
      return renderItems({ items: nextItems, withIndex: true })
    }
  }

  onMenuMount = () => {
    this.props.onMenuMount()
    this.resetInputValue()
  }

  onMenuUnmount = () => {
    this.props.onMenuUnmount()
    this.resetInputValue()
  }

  getDropdownProps = () => {
    const {
      className,
      onInputChange,
      noResultsLabel,
      showInput,
      ...rest
    } = this.props
    const { inputValue, isOpen } = this.state

    const componentClassName = classNames('c-ComboBox', className)

    return {
      ...rest,
      isOpen,
      onMenuMount: this.onMenuMount,
      onMenuUnmount: this.onMenuUnmount,
      onOpen: this.handleOnOpen,
      onClick: this.handleOnClose,
      onSelect: this.onSelect,
      enableTabNavigation: !showInput,
      className: componentClassName,
      inputValue,
      index: '0',
    }
  }

  getMenuClassName() {
    const { showInput } = this.props

    return classNames('c-ComboBoxMenu', showInput && 'is-withInput')
  }

  handleOnOpen = () => {
    this.setState({
      isOpen: true,
    })
    this.props.onOpen()
  }

  handleOnClose = () => {
    this.setState({
      isOpen: false,
    })
    this.props.onClose()
  }

  renderEmpty = () => {
    const { renderEmpty, noResultsLabel } = this.props
    const { inputValue } = this.state

    if (renderEmpty) {
      return renderRenderPropComponent(renderEmpty)
    }

    const message = inputValue
      ? `${noResultsLabel} for "${inputValue}"`
      : noResultsLabel

    return (
      <EmptyItemUI className="c-ComboBoxEmpty">
        <Text shade="muted">{message}</Text>
      </EmptyItemUI>
    )
  }

  renderMenuStart = () => {
    const { renderMenuStart } = this.props

    return renderMenuStart ? renderRenderPropComponent(renderMenuStart) : null
  }

  renderMenuEnd = () => {
    const { renderMenuEnd } = this.props

    return renderMenuEnd ? renderRenderPropComponent(renderMenuEnd) : null
  }

  renderFooter = () => {
    const { renderFooter } = this.props
    if (!renderFooter) return

    return (
      <Dropdown.Block className="c-ComboBoxFooter">
        {renderRenderPropComponent(renderFooter)}
      </Dropdown.Block>
    )
  }

  setMenuWrapperNode = node => (this.menuWrapperNode = node)

  render() {
    const { inputProps, showInput } = this.props

    return (
      <Dropdown {...this.getDropdownProps()}>
        {dropdownProps => (
          <Dropdown.Card>
            {showInput && (
              <HeaderUI className="c-ComboBoxHeader">
                <InputUI
                  {...{ ...defaultInputProps, ...inputProps }}
                  onChange={this.onInputChange}
                  onKeyDown={this.handleOnKeyDown}
                  value={this.state.inputValue}
                />
              </HeaderUI>
            )}

            <MenuUI
              className={this.getMenuClassName()}
              innerWrapperRef={this.setMenuWrapperNode}
            >
              {this.renderMenuStart()}
              {this.renderItems(dropdownProps)}
              {this.renderMenuEnd()}
            </MenuUI>
            {this.renderFooter()}
          </Dropdown.Card>
        )}
      </Dropdown>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(ComboBox)
const PropConnectedComponent = propConnect(COMPONENT_KEY)(ComboBox)

export default PropConnectedComponent
