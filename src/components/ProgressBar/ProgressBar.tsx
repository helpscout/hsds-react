import * as React from 'react'
import { UISize } from '../../constants/types'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'

type Value = number | string

type Props = {
  className?: string
  description?: string
  onChange: (value: Value) => void
  size?: UISize
  value: Value
}

class ProgressBar extends React.PureComponent<Props> {
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
    const value = val != null ? val : this.props.value
    const barValue = parseFloat(`${value}`)
    const normalizedBarValue =
      barValue > 100 ? 100 : barValue < 0 ? 0 : barValue

    return normalizedBarValue
  }

  getValueAsPercent(val: Value): string {
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
    const progresBarStyle = {
      width: this.getValueAsPercent(value),
    }

    return (
      <div
        className={componentClassName}
        role="progressbar"
        aria-valuenow={Number(value)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={description}
        {...rest}
      >
        <div className="c-ProgressBar__bar" style={progresBarStyle} />
      </div>
    )
  }
}

export default ProgressBar
