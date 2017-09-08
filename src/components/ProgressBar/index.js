import React, { PureComponent as Component } from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { standardSizeTypes } from '../../constants/propTypes'

export const propTypes = {
  description: PropTypes.string,
  onChange: PropTypes.func,
  size: standardSizeTypes,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

const defaultProps = {
  onChange: noop,
  value: 0
}

class ProgressBar extends Component {
  componentWillReceiveProps (nextProps) {
    const { onChange } = this.props
    const value = this.getValueAsPercent(nextProps.value)
    onChange(value)
  }

  getValue (val) {
    const value = val !== null ? val : this.props.value
    const barValue = parseFloat(value)
    const normalizedBarValue =
      barValue > 100 ? 100
      : barValue < 0 ? 0
      : barValue

    return normalizedBarValue
  }

  getValueAsPercent (val = null) {
    return `${this.getValue(val)}%`
  }

  render () {
    const {
      className,
      description,
      size,
      value,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-ProgressBar',
      size && `is-${size}`,
      className
    )
    const progresBarStyle = {
      width: this.getValueAsPercent()
    }

    return (
      <div
        className={componentClassName}
        role='progressbar'
        aria-valuenow={value}
        aria-valuemin='0'
        aria-valuemax='100'
        aria-valuetext={description}
        {...rest}
      >
        <div className='c-ProgressBar__bar' style={progresBarStyle} />
      </div>
    )
  }
}

ProgressBar.propTypes = propTypes
ProgressBar.defaultProps = defaultProps

export default ProgressBar
