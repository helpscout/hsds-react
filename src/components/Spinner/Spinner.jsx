import React from 'react'
import PropTypes from 'prop-types'
import VisuallyHidden from '../VisuallyHidden'
import { classNames } from '../../utilities/classNames'
import { isString } from '../../utilities/is'
import { legacySizes } from './Spinner.utils'
import { SpinnerUI, SpinnerSVGUI, SpinnerCircleUI } from './Spinner.css'
import { SpinnerProps } from './Spinner.types'

export class Spinner extends React.PureComponent<SpinnerProps> {
  static className = 'c-Spinner'
  static defaultProps = {
    color: 'currentColor',
    isRounded: true,
    shade: 'default',
    size: 16,
    speed: 1400,
  }

  getClassName() {
    const { className } = this.props

    return classNames(Spinner.className, className)
  }

  getSize(): number {
    const { size } = this.props
    const defaultSize = 16

    if (isString(size)) {
      return legacySizes[size] || defaultSize
    }

    return size
  }

  render() {
    const { color, shade, isRounded, speed, ...rest } = this.props
    const spinnerSize = this.getSize()

    return (
      <SpinnerUI
        {...rest}
        aria-busy={true}
        className={this.getClassName()}
        spinnerSize={spinnerSize}
      >
        <SpinnerSVGUI
          className="c-SpinnerSVG"
          speed={speed}
          spinnerSize={spinnerSize}
          viewBox="22 22 44 44"
        >
          <SpinnerCircleUI
            {...{
              className: 'c-SpinnerCircle',
              color,
              cx: 44,
              cy: 44,
              r: 20.2,
              shade,
              isRounded,
              speed,
              spinnerSize,
            }}
          />
        </SpinnerSVGUI>
        <VisuallyHidden>Loading</VisuallyHidden>
      </SpinnerUI>
    )
  }
}

export default Spinner
