import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Flexy from '../Flexy'
import Truncate from '../Truncate'
import { classNames } from '../../utilities/classNames'
import { noop, promiseNoop } from '../../utilities/other'
import {
  AnimateUI,
  TagWrapperUI,
  TagUI,
  BodyUI,
  SpinnerUI,
  IconUI,
  IconWrapperUI,
  TextUI,
} from './styles/Tag.css'

import { TagListContext } from '../TagList/TagList'

type TagColor =
  | 'blue'
  | 'lightBlue'
  | 'green'
  | 'grey'
  | 'gray'
  | 'orange'
  | 'purple'
  | 'red'
  | 'yellow'

type TagSize = 'sm' | 'md'

export interface Props {
  animationDuration?: number
  allCaps?: boolean
  children?: any
  className?: string
  color?: TagColor
  display?: 'block' | 'inlineBlock'
  filled?: boolean
  id?: string | number
  isRemovable: boolean
  isRemoving: boolean
  onBeforeRemove: any
  onRemove: (props: any) => void
  pulsing?: boolean
  showTooltipOnTruncate: boolean
  value?: string | number
  size?: TagSize
}

export interface State {
  in: boolean
  isRemoving: boolean
}

export class Tag extends React.PureComponent<Props, State> {
  static defaultProps = {
    animationDuration: 100,
    color: 'grey',
    display: 'inlineBlock',
    isRemovable: false,
    isRemoving: false,
    onBeforeRemove: promiseNoop,
    onRemove: noop,
    showTooltipOnTruncate: true,
    value: '',
    size: 'sm',
  }
  static className = 'c-Tag'

  state = {
    isRemoving: false,
    in: true,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isRemoving !== this.props.isRemoving) {
      this.setState({
        isRemoving: nextProps.isRemoving,
      })
    }
  }

  getClassName() {
    const { className, color, filled, pulsing, isRemovable, size } = this.props

    return classNames(
      Tag.className,
      color && `is-${color}`,
      filled && 'is-filled',
      pulsing && 'is-pulsing',
      isRemovable && 'is-removable',
      size && `is-${size}`,
      className
    )
  }

  getFontSize() {
    const { allCaps } = this.props

    let fontSize = 12
    if (allCaps) {
      fontSize = fontSize - 1
    }
    return `${fontSize}`
  }

  getWrapperClassName() {
    const { display } = this.props

    return classNames('c-TagWrapper', display && `is-display-${display}`)
  }

  handleOnRemove = () => {
    const {
      animationDuration,
      onBeforeRemove,
      id,
      onRemove,
      value,
    } = this.props

    this.setState({
      isRemoving: true,
    })

    onBeforeRemove({ id, value }).then(() => {
      this.setState({ in: false })

      setTimeout(() => {
        onRemove({ id, value })
      }, animationDuration)
    })
  }

  renderRemoveIcon() {
    const { filled, isRemovable, size } = this.props
    const { isRemoving } = this.state

    if (!isRemovable) return null

    const iconSize = size === 'sm' ? '18' : '24'
    const spinnerAndIconClassNames = classNames(
      filled && 'is-filled',
      `is-${size}`
    )

    return (
      <Flexy.Item className="c-Tag__iconWrapper">
        <IconWrapperUI className={spinnerAndIconClassNames}>
          {isRemoving && (
            <SpinnerUI className={spinnerAndIconClassNames} size="xs" />
          )}
          {!isRemoving && (
            <IconUI
              name="cross-small"
              size={iconSize}
              clickable
              onClick={this.handleOnRemove}
              title="Remove"
              className={spinnerAndIconClassNames}
            />
          )}
        </IconWrapperUI>
      </Flexy.Item>
    )
  }

  renderChildren() {
    const { children, value } = this.props

    return value || children || null
  }

  render() {
    const {
      allCaps,
      animationDuration,
      children,
      className,
      color,
      display,
      filled,
      isRemovable,
      onRemove,
      pulsing,
      showTooltipOnTruncate,
      value,
      ...rest
    } = this.props

    const { in: transitionIn } = this.state

    return (
      <TagWrapperUI className={this.getWrapperClassName()}>
        <AnimateUI
          className="c-TagWrapper__animate"
          duration={animationDuration}
          in={transitionIn}
          unmountOnExit
        >
          <TagUI {...getValidProps(rest)} className={this.getClassName()}>
            <BodyUI className="c-Tag__body" gap="none">
              <Flexy.Block className="c-Tag__contentWrapper">
                <TextUI allCaps={allCaps} block size={this.getFontSize()}>
                  <Truncate
                    className="c-Tag__textWrapper"
                    showTooltipOnTruncate={showTooltipOnTruncate}
                  >
                    {this.renderChildren()}
                  </Truncate>
                </TextUI>
              </Flexy.Block>
              {this.renderRemoveIcon()}
            </BodyUI>
          </TagUI>
        </AnimateUI>
      </TagWrapperUI>
    )
  }
}

const TagConsumer = props => {
  const contextValue = React.useContext(TagListContext)

  if (contextValue) {
    const newProps = { ...props, ...contextValue }
    newProps.className = classNames(props.className, contextValue.className)
    return <Tag {...newProps} />
  }

  return <Tag {...props} />
}

export default TagConsumer
