import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../PropProvider/propConnect'
import Centralize from '../Centralize'
import Flexy from '../Flexy'
import Icon from '../Icon'
import Text from '../Text'
import Truncate from '../Truncate'
import { classNames } from '../../utilities/classNames'
import { noop, promiseNoop } from '../../utilities/other'
import {
  AnimateUI,
  TagWrapperUI,
  TagUI,
  BodyUI,
  SpinnerUI,
} from './styles/Tag.css'
import { COMPONENT_KEY } from './Tag.utils'

type TagColor =
  | 'blue'
  | 'green'
  | 'grey'
  | 'gray'
  | 'orange'
  | 'purple'
  | 'red'
  | 'yellow'

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
    const { className, color, filled, pulsing } = this.props

    return classNames(
      Tag.className,
      color && `is-${color}`,
      filled && 'is-filled',
      pulsing && 'is-pulsing',
      className
    )
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
    const { filled, isRemovable } = this.props
    const { isRemoving } = this.state

    if (!isRemovable) return null

    return (
      <Flexy.Item className="c-Tag__iconWrapper">
        {isRemoving ? (
          <SpinnerUI className={classNames(filled && 'is-filled')} size="xs" />
        ) : (
          <Icon
            name="cross"
            size="12"
            clickable
            onClick={this.handleOnRemove}
            title="Remove"
          />
        )}
      </Flexy.Item>
    )
  }

  renderChildren() {
    const { children, value } = this.props

    return value || (children || null)
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
            <Centralize>
              <BodyUI className="c-Tag__body" gap="xs">
                <Flexy.Block className="c-Tag__contentWrapper">
                  <Text
                    allCaps={allCaps}
                    block
                    size={allCaps ? '10' : '12'}
                    lineHeightReset
                  >
                    <Truncate
                      className="c-Tag__textWrapper"
                      showTooltipOnTruncate={showTooltipOnTruncate}
                    >
                      {this.renderChildren()}
                    </Truncate>
                  </Text>
                </Flexy.Block>
                {this.renderRemoveIcon()}
              </BodyUI>
            </Centralize>
          </TagUI>
        </AnimateUI>
      </TagWrapperUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(Tag)

export default PropConnectedComponent
