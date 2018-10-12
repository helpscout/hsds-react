// @flow
import type { ButtonKind, ButtonSize } from './types'
import type { UIState } from '../../constants/types'
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent, isComponentNamed } from '../../utilities/component'
import { includes } from '../../utilities/arrays'
import { noop } from '../../utilities/other'
import RouteWrapper from '../RouteWrapper'
import { ButtonUI, ButtonContentUI, FocusUI } from './styles/Button.css.js'
import { COMPONENT_KEY } from './utils'
import { COMPONENT_KEY as ICON_KEY } from '../Icon/utils'

type Props = {
  buttonRef: (ref: any) => {},
  canRenderFocus: boolean,
  children?: any,
  className?: string,
  disabled: boolean,
  kind: ButtonKind,
  innerRef: (ref: any) => {},
  isActive: boolean,
  isBlock: boolean,
  isFocused: boolean,
  isFirst: boolean,
  isNotOnly: boolean,
  isLast: boolean,
  isSuffix: boolean,
  onBlur: (event: Event) => {},
  onFocus: (event: Event) => {},
  size: ButtonSize,
  state?: UIState,
  submit: boolean,
  theme?: string,
}

type State = {
  isFocused: boolean,
}

class Button extends Component<Props, State> {
  static defaultProps = {
    buttonRef: noop,
    canRenderFocus: true,
    disable: false,
    kind: 'default',
    innerRef: noop,
    isActive: false,
    isBlock: false,
    isFirst: false,
    isNotOnly: false,
    isLast: false,
    isSuffix: false,
    onBlur: noop,
    onFocus: noop,
    size: 'md',
    submit: false,
  }

  static BlueComponentVersion = 2

  constructor(props, context) {
    super(props, context)

    this.state = {
      isFocused: props.isFocused,
    }
  }

  handleOnBlur = event => {
    this.setState({
      isFocused: false,
    })
    this.props.onBlur(event)
  }

  handleOnFocus = event => {
    this.setState({
      isFocused: true,
    })
    this.props.onFocus(event)
  }

  shouldShowFocus = () => {
    const paddedButtonKinds = [
      'primary',
      'secondary',
      'secondaryAlt',
      'tertiary',
    ]
    return (
      this.state.isFocused &&
      !this.props.disabled &&
      this.props.canRenderFocus &&
      includes(paddedButtonKinds, this.props.kind)
    )
  }

  getFocusMarkup = () => {
    const { isFirst, isNotOnly, isLast } = this.props

    const focusClassName = classNames(
      'c-ButtonV2Focus',
      isFirst && 'is-first',
      isNotOnly && 'is-notOnly',
      isLast && 'is-last'
    )

    return (
      this.shouldShowFocus() && (
        <FocusUI className={focusClassName} role="presentation" />
      )
    )
  }

  getNodeRef = ref => {
    this.props.innerRef(ref)
    this.props.buttonRef(ref)
  }

  getChildrenMarkup = () => {
    const { children } = this.props

    return React.Children.map(children, (child, index) => {
      if (!isComponentNamed(child, ICON_KEY)) return child

      // $FlowFixMe
      const len = React.Children.count(children)
      const isFirst = index === 0
      const isLast = index === len - 1
      const isOnly = isFirst && isLast

      return React.cloneElement(child, {
        offsetLeft: isFirst && !isOnly,
        offsetRight: isLast && !isOnly,
      })
    })
  }

  render() {
    const {
      children,
      className,
      kind,
      innerRef,
      isActive,
      isBlock,
      isFirst,
      isNotOnly,
      isLast,
      isSuffix,
      size,
      state,
      submit,
      theme,
      // Deprecating
      buttonRef,
      ...rest
    } = this.props

    const { isFocused } = this.state

    const componentClassName = classNames(
      'c-ButtonV2',
      isActive && 'is-active',
      isBlock && 'is-block',
      isFirst && 'is-first',
      isFocused && 'is-focused',
      isNotOnly && 'is-notOnly',
      isLast && 'is-last',
      isSuffix && 'is-suffix',
      kind && `is-${kind}`,
      size && `is-${size}`,
      state && `is-${state}`,
      theme && `is-${theme}`,
      className
    )

    const type = submit ? 'submit' : 'button'
    const focusMarkup = this.getFocusMarkup()

    const childrenMarkup = this.getChildrenMarkup()

    return (
      <ButtonUI
        {...getValidProps(rest)}
        className={componentClassName}
        innerRef={this.getNodeRef}
        onBlur={this.handleOnBlur}
        onFocus={this.handleOnFocus}
        type={type}
      >
        <ButtonContentUI className="c-ButtonV2__content">
          {childrenMarkup}
        </ButtonContentUI>
        {focusMarkup}
      </ButtonUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(Button)

export default RouteWrapper(Button)
