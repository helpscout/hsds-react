import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import VisuallyHidden from '../VisuallyHidden'
import classNames from 'classnames'
import { isString } from '../../utilities/is'
import { legacySizes } from './Spinner.utils'
import { SpinnerUI, SpinnerSVGUI, SpinnerCircleUI } from './Spinner.css'

export class Spinner extends React.PureComponent {
  static className = 'c-Spinner'

  getClassName() {
    const { className } = this.props

    return classNames(Spinner.className, className)
  }

  getSize() {
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
        {...getValidProps(rest)}
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

Spinner.defaultProps = {
  color: 'currentColor',
  'data-cy': 'Spinner',
  isRounded: true,
  shade: 'default',
  size: 16,
  speed: 1400,
}

Spinner.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Color of the spinner. */
  color: PropTypes.string,
  /** Rounds the stroke ends of the spinner SVG. */
  isRounded: PropTypes.bool,
  /** Determines the opacity of the spinner. */
  shade: PropTypes.string,
  /** Determines the size of the spinner. */
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Speed of the spinning animation (in `ms`). */
  speed: PropTypes.number,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default Spinner
