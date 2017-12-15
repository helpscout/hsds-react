import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import Animate from '../Animate'
import Centralize from '../Centralize'
import Icon from '../Icon'
import Text from '../Text'
import { tagColorTypes } from './propTypes'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'

export const propTypes = {
  animationDuration: PropTypes.number,
  allCaps: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: tagColorTypes,
  display: PropTypes.oneOf(['block', 'inlineBlock']),
  filled: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isRemovable: PropTypes.bool,
  onRemove: PropTypes.func,
  pulsing: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

const defaultProps = {
  animationDuration: 100,
  color: 'grey',
  display: 'inlineBlock',
  isRemovable: false,
  onRemove: noop,
  value: ''
}

class Tag extends Component {
  constructor () {
    super()
    this.state = {
      in: true
    }
    this.handleOnRemove = this.handleOnRemove.bind(this)
  }

  handleOnRemove () {
    const { animationDuration, id, onRemove, value } = this.props
    this.setState({ in: false })

    setTimeout(() => {
      onRemove({id, value})
    }, animationDuration)
  }

  render () {
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
      <Icon
        name='cross'
        size='12'
        clickable
        onClick={handleOnRemove}
        title='Remove'
      />
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
          <Text
            allCaps={allCaps}
            block
            size={allCaps ? '10' : '12'}
            lineHeightReset
          >
            {child}
          </Text>
          {removeIconMarkup}
        </Centralize>
      </Animate>
    )
  }
}

Tag.propTypes = propTypes
Tag.defaultProps = defaultProps
Tag.displayName = 'Tag'

export default Tag
