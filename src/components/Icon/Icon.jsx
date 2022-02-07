import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import VisuallyHidden from '../VisuallyHidden'
import classNames from 'classnames'
import { IconUI } from './Icon.css'
import { svgSet } from './Icon.utils'

const Icon = props => {
  const {
    center,
    className,
    clickable,
    faint,
    ignoreClick,
    isWithHiddenTitle,
    inline,
    muted,
    onClick,
    offsetLeft,
    offsetRight,
    name,
    shade,
    size,
    state,
    subtle,
    title,
    withCaret,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-Icon',
    center && 'is-center',
    clickable && 'is-clickable',
    !clickable && ignoreClick && 'is-noInteract',
    faint && 'is-faint',
    inline && 'is-inline',
    name && `is-iconName-${name}`,
    offsetLeft && 'is-offsetLeft',
    offsetRight && 'is-offsetRight',
    muted && 'is-muted',
    shade && `is-${shade}`,
    state && `is-${state}`,
    subtle && 'is-subtle',
    size && `is-${size}`,
    withCaret && 'withCaret',
    className
  )

  const IconComponent = svgSet[name]
  const CaretComponent = svgSet['caret-down']
  const iconTitle = title || name

  const caretMarkup = withCaret ? (
    <span className="c-Icon__icon is-caret" title="Caret">
      {CaretComponent && <CaretComponent />}
    </span>
  ) : null

  return (
    <IconUI
      aria-hidden
      role="img"
      {...getValidProps(rest)}
      className={componentClassName}
      onClick={onClick}
      data-icon-name={name}
      title={iconTitle}
    >
      <span className="c-Icon__icon">{IconComponent && <IconComponent />}</span>
      {caretMarkup}
      {isWithHiddenTitle ? <VisuallyHidden>{iconTitle}</VisuallyHidden> : null}
    </IconUI>
  )
}

Icon.defaultProps = {
  center: false,
  clickable: false,
  'data-cy': 'Icon',
  ignoreClick: true,
  isWithHiddenTitle: true,
  muted: false,
  name: 'emoji',
  onClick: () => undefined,
  offsetLeft: false,
  offsetRight: false,
  size: '20',
  withCaret: false,
}

Icon.propTypes = {
  /** Center aligns component. */
  center: PropTypes.bool,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Enables the component to be clickable. */
  clickable: PropTypes.bool,
  /** Ignores click events. Bubbles click event to parent component. */
  ignoreClick: PropTypes.bool,
  /** Displays the component as `inline-block`. */
  inline: PropTypes.bool,
  /** Applies muted styles. */
  muted: PropTypes.bool,
  /** Determines the SVG image. Required. */
  name: PropTypes.string,
  /** Callback function when component is clicked. */
  onClick: PropTypes.func,
  /** Changes icon color to represent a state. */
  state: PropTypes.oneOf(['error', 'success', 'warning']),
  /** Changes icon color shade. */
  shade: PropTypes.oneOf(['subtle', 'muted', 'faint', 'extraMuted']),
  /** Adjusts the size of the component. */
  size: PropTypes.oneOf([
    8,
    10,
    12,
    13,
    14,
    15,
    16,
    18,
    20,
    24,
    32,
    48,
    52,
    72,
    '8',
    '10',
    '12',
    '13',
    '14',
    '15',
    '16',
    '18',
    '20',
    '24',
    '32',
    '48',
    '52',
    '72',
  ]),
  /** Provides a name for the component. */
  title: PropTypes.string,
  /** Renders a caret icon, next to the component's SVG icon. */
  withCaret: PropTypes.bool,
  faint: PropTypes.bool,
  isWithHiddenTitle: PropTypes.bool,
  offsetLeft: PropTypes.bool,
  offsetRight: PropTypes.bool,
  subtle: PropTypes.bool,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default Icon
