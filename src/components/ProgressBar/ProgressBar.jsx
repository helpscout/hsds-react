import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { ProgressBarUI, BarUI } from './ProgressBar.css'

class ProgressBar extends React.PureComponent {
  static defaultProps = {
    onChange: noop,
    value: 0,
  }

  componentWillReceiveProps(nextProps) {
    const { onChange } = this.props
    const value = this.getValueAsPercent(nextProps.value)
    onChange(value)
  }

  getValue(val) {
    const value =
      val != null
        ? val
        : /* istanbul ignore next */
          this.props.value
    const barValue = parseFloat(`${value}`)
    const normalizedBarValue =
      barValue > 100 ? 100 : barValue < 0 ? 0 : barValue

    return normalizedBarValue
  }

  getValueAsPercent(val) {
    return `${this.getValue(val)}%`
  }

  render() {
    const {
      className,
      description,
      size,
      value,
      onChange,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-ProgressBar',
      size && `is-${size}`,
      className
    )

    return (
      <ProgressBarUI
        className={componentClassName}
        role="progressbar"
        aria-valuenow={Number(value)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={description}
        {...rest}
      >
        <BarUI
          className="c-ProgressBar__bar"
          width={this.getValueAsPercent(value)}
        />
      </ProgressBarUI>
    )
  }
}

ProgressBar.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['xs', 'xssm', 'sm', 'md', 'lg', '', null]),
  value: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
}

export default ProgressBar
