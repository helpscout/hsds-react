// @flow
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Animate from '../Animate'
import Centralize from '../Centralize'
import Flexy from '../Flexy'
import Icon from '../Icon'
import Text from '../Text'
import Truncate from '../Truncate'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { noop } from '../../utilities/other'
import { TagWrapperUI, TagUI } from './styles/Tag.css.js'
import { COMPONENT_KEY } from './utils'

type Color = 'blue' | 'green' | 'grey' | 'gray' | 'orange' | 'purple' | 'red'

type Props = {
  animationDuration?: number,
  allCaps?: boolean,
  children?: string | number,
  className?: string,
  color?: Color,
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
      <TagWrapperUI className="c-TagWrapper">
        <Animate
          className="c-TagWrapper__animate"
          duration={animationDuration}
          in={transitionIn}
          inlineBlock={display === 'inlineBlock'}
          unmountOnExit
        >
          <TagUI {...getValidProps(rest)} className={componentClassName}>
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
          </TagUI>
        </Animate>
      </TagWrapperUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(Tag)

export default Tag
