import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import VisuallyHidden from '../VisuallyHidden'
import classNames from 'classnames'
import { IlloUI, IconUI, CenteredContentUI } from './Illo.css'
import { svgSet } from './Illo.utils'

const Illo = props => {
  const {
    className,
    color,
    colorSecondary,
    colorUi,
    colorUiDark,
    colorUiLight,
    colorUiTransparent,
    colorUiWhite,
    name,
    size,
    style,
    title,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-Illo',
    color && 'has-color',
    colorSecondary && 'has-colorSecondary',
    size && `is-${size}`,
    className
  )

  const IlloComponent = svgSet[name]
  const iconTitle = title || name
  const componentStyle = { ...style, color }

  return (
    <IlloUI
      {...getValidProps(rest)}
      className={componentClassName}
      data-illo-name={name}
      style={componentStyle}
    >
      <CenteredContentUI>
        <IconUI className="c-Illo__icon" title={iconTitle}>
          {IlloComponent && <IlloComponent />}
        </IconUI>
      </CenteredContentUI>
      <VisuallyHidden>{iconTitle}</VisuallyHidden>
    </IlloUI>
  )
}

Illo.defaultProps = {
  color: '',
  colorSecondary: '',
  colorUi: '',
  colorUiDark: '',
  colorUiLight: '',
  colorUiTransparent: 'transparent',
  colorUiWhite: 'white',
  'data-cy': 'Illo',
  size: '60',
}

Illo.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Custom color for SVG image on primary paths. */
  color: PropTypes.string,
  /** Custom color for SVG image on secondary paths. */
  colorSecondary: PropTypes.string,
  /** Custom color for SVG image on UI themed paths. */
  colorUi: PropTypes.string,
  /** Custom color for SVG image on UI dark themed paths. */
  colorUiDark: PropTypes.string,
  /** Custom color for SVG image on UI light themed paths. */
  colorUiLight: PropTypes.string,
  /** Custom color for SVG image on UI transparent themed paths. Default `transparent`. */
  colorUiTransparent: PropTypes.string,
  /** Custom color for SVG image on UI white themed paths. Default `white`. */
  colorUiWhite: PropTypes.string,
  /** Determines the SVG image. Required. */
  name: PropTypes.string,
  /** Callback function when component is clicked. */
  onClick: PropTypes.func,
  /** Adjusts the size of the component. */
  size: PropTypes.oneOf(['40', '60', '72', '80', '90', 40, 60, 72, 80, 90]),
  /** Provides a name for the component. */
  title: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default Illo
