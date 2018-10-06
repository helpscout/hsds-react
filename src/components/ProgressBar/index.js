// @flow
import type { UISize } from '../../constants/types'
import React, { PureComponent as Component } from 'react'
import { classNames } from '../../utilities/classNames.ts'
import { noop } from '../../utilities/other'

type Value = number | string | null

type Props = {
  className?: string,
  description?: string,
  onChange: (value: Value) => void,
  size?: UISize,
  value: Value,
}

class ProgressBar extends Component<Props> {
  static defaultProps = {
    onChange: noop,
    value: 0,
  }

  componentWillReceiveProps(nextProps: Props) {
    const { onChange } = this.props
    const value = this.getValueAsPercent(nextProps.value)
    onChange(value)
  }

  getValue(val: Value): number {
    const value = val !== null ? val : this.props.value
    const barValue = parseFloat(value)
    const normalizedBarValue =
      barValue > 100 ? 100 : barValue < 0 ? 0 : barValue

    return normalizedBarValue
  }

  getValueAsPercent(val: Value = null): string {
    return `${this.getValue(val)}%`
  }

  render() {
    const { className, description, size, value, ...rest } = this.props

    const componentClassName = classNames(
      'c-ProgressBar',
      size && `is-${size}`,
      className
    )
    const progresBarStyle = {
      width: this.getValueAsPercent(),
    }

    return (
      <div
        className={componentClassName}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuetext={description}
        {...rest}
      >
        <div className="c-ProgressBar__bar" style={progresBarStyle} />
      </div>
    )
  }
}

export default ProgressBar
