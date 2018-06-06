// @flow
import React, { PureComponent as Component } from 'react'
import Animate from '../Animate'
import Centralize from '../Centralize'
import Flexy from '../Flexy'
import Icon from '../Icon'
import Text from '../Text'
import Truncate from '../Truncate'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'

type tagColorTypes =
  | 'blue'
  | 'green'
  | 'grey'
  | 'gray'
  | 'orange'
  | 'purple'
  | 'red'

type Props = {
  animationDuration?: number,
  allCaps?: boolean,
  children?: string | number,
  className?: string,
  color?: tagColorTypes,
  display?: 'block' | 'inlineBlock',
  filled?: boolean,
  id?: string | number,
  isRemovable?: boolean,
  onRemove: (props: any) => void,
  pulsing?: boolean,
  showTooltipOnTruncate: boolean,
  value?: string | number,
}

type State = {
  in: boolean,
}

class Tag extends Component<Props, State> {
  static defaultProps = {
    animationDuration: 100,
    color: 'grey',
    display: 'inlineBlock',
    isRemovable: false,
    onRemove: noop,
    showTooltipOnTruncate: true,
    value: '',
  }

  state = {
    in: true,
  }

  handleOnRemove = () => {
    const { animationDuration, id, onRemove, value } = this.props
    this.setState({ in: false })

    setTimeout(() => {
      onRemove({ id, value })
    }, animationDuration)
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
      id,
      isRemovable,
      onRemove,
      pulsing,
      showTooltipOnTruncate,
      value,
      ...rest
    } = this.props

    const { in: transitionIn } = this.state
    const handleOnRemove = this.handleOnRemove

    const componentClassName = classNames(
      'c-Tag',
      color && `is-${color}`,
      display && `is-display-${display}`,
      filled && 'is-filled',
      pulsing && 'is-pulsing',
      className
    )

    const removeIconMarkup = isRemovable ? (
      <Flexy.Item className="c-Tag__iconWrapper">
        <Icon
          name="cross"
          size="12"
          clickable
          onClick={handleOnRemove}
          title="Remove"
        />
      </Flexy.Item>
    ) : null

    const child = value || (children || null)

    return (
      <Animate
        className={componentClassName}
        duration={animationDuration}
        in={transitionIn}
        inlineBlock={display === 'inlineBlock'}
        unmountOnExit
        {...rest}
      >
        <Centralize>
          <Flexy className="c-Tag__body" gap="xs">
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
                  {child}
                </Truncate>
              </Text>
            </Flexy.Block>
            {removeIconMarkup}
          </Flexy>
        </Centralize>
      </Animate>
    )
  }
}

export default Tag
