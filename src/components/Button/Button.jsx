import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'

import { ButtonUI, LoadingWrapperUI, SpinnerUI } from './Button.css'
import { useButton, SIZE_LG, THEME_BLUE, SIZES, THEMES } from './Button.utils'

export const WrappedButton = forwardRef(function Button(props, ref) {
  const { loading, children, ...buttonProps } = useButton(props)

  return (
    <ButtonUI {...buttonProps} ref={ref}>
      {loading && <SpinnerUI className="c-Button--spinner" />}
      {loading ? <LoadingWrapperUI>{children}</LoadingWrapperUI> : children}
    </ButtonUI>
  )
})

WrappedButton.defaultProps = {
  'data-cy': 'Button',
  disabled: false,
  isFirst: false,
  isLast: false,
  linked: false,
  isNotOnly: false,
  rounded: false,
  loading: false,
  size: SIZE_LG,
  submit: false,
  theme: THEME_BLUE,
}

WrappedButton.propTypes = {
  /** Change the html element used for the button component. */
  as: PropTypes.string,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Disable the button so it can't be clicked. */
  disabled: PropTypes.bool,
  /** Hyperlink for the button. This transforms the button to a `<a>` selector. */
  href: PropTypes.string,
  /** rel html attribute */
  rel: PropTypes.string,
  /** target html attribute */
  target: PropTypes.string,
  /** Renders a button with the link styles */
  linked: PropTypes.bool,
  /** Renders a loading `Spinner`. */
  loading: PropTypes.bool,
  /** Sets the size of the button. */
  size: PropTypes.oneOf(SIZES),
  /** Sets the `type` of the button to `"submit"`. */
  submit: PropTypes.bool,
  /** Applies a theme based style to the button. */
  theme: PropTypes.oneOf(THEMES),
  /** React Router path to navigate on click. */
  to: PropTypes.string,

  isFirst: PropTypes.bool,
  isNotOnly: PropTypes.bool,
  isLast: PropTypes.bool,

  /** Sets the button radius to 100%. */
  rounded: PropTypes.bool,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default WrappedButton
