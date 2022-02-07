import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from 'classnames'
import { ProgressBarUI, BarUI } from './ProgressBar.css'

class ProgressBar extends React.PureComponent {
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { onChange } = this.props
    const value = this.getValueAsPercent(nextProps.value)
    onChange(value)
  }

  getValue(val) {
    const value = val != null ? val : this.props.value
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
        {...getValidProps(rest)}
        className={componentClassName}
        role="progressbar"
        aria-valuenow={Number(value)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={description}
      >
        <BarUI
          className="c-ProgressBar__bar"
          width={this.getValueAsPercent(value)}
        />
      </ProgressBarUI>
    )
  }
}

ProgressBar.defaultProps = {
  'data-cy': 'ProgressBar',
  onChange: () => undefined,
  value: 0,
  size: 'md',
}

ProgressBar.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Description of the progress bar (for accessibility). */
  description: PropTypes.string,
  /** Callback when component value updates. Returns value as percent. */
  onChange: PropTypes.func,
  /** Determines the size of the component height (lg: 10px, md: 6px, sm: 2px) */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Progress value to visualize in component. */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default ProgressBar
