import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import Icon from '../Icon'
import VisuallyHidden from '../VisuallyHidden'
import {
  SequentialNavButtonUI,
  NavigatorUI,
  DeepNavigatorButtonUI,
} from './Datepicker.css'

function Navigator({
  canNavigateForward,
  goPrevious,
  goNext,
  isAtNavigationTopLevel,
  label,
  onDeepNavigationClick,
}) {
  return (
    <NavigatorUI
      className={classNames(
        'c-DatepickerNavigator',
        isAtNavigationTopLevel && 'is-at-top-level'
      )}
    >
      <SequentialNavButtonUI
        className="SequentialNavButton go-previous"
        onClick={goPrevious}
      >
        <Icon name="arrow-left-single-large" />
        <VisuallyHidden>Previous month</VisuallyHidden>
      </SequentialNavButtonUI>
      <DeepNavigatorButtonUI
        onClick={onDeepNavigationClick}
        disabled={isAtNavigationTopLevel}
      >
        {label}
      </DeepNavigatorButtonUI>
      <SequentialNavButtonUI
        className="SequentialNavButton go-next"
        onClick={goNext}
        disabled={!canNavigateForward}
      >
        <Icon name="arrow-right-single-large" />
        <VisuallyHidden>Next month</VisuallyHidden>
      </SequentialNavButtonUI>
    </NavigatorUI>
  )
}

Navigator.defaultProps = {
  allowFutureDatePick: true,
  goPrevious: noop,
  goNext: noop,
  isAtNavigationTopLevel: false,
  onDeepNavigationClick: noop,
}

Navigator.propTypes = {
  /** Whether is possible to pick a date in the future */
  allowFutureDatePick: PropTypes.bool,
  /** Callback to navigate to the previous period */
  goPrevious: PropTypes.func,
  /** Callback to navigate to the next period */
  goNext: PropTypes.func,
  /** Whether we are currently at the highest possible level of navigation */
  isAtNavigationTopLevel: PropTypes.bool,
  /** Callback to navigate to the next level of navigation */
  onDeepNavigationClick: PropTypes.func,
}

export default Navigator
