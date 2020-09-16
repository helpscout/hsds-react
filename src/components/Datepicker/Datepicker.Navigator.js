import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { NAVIGATION_LEVELS } from './Datepicker.constants'
import { getNavigatorButtonLabel } from './Datepicker.utils'
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
  navigationLevel,
  label,
  onDeepNavigationClick,
}) {
  return (
    <NavigatorUI
      className={classNames(
        'c-DatepickerNavigator',
        navigationLevel === NAVIGATION_LEVELS.YEAR_RANGES && 'is-at-top-level'
      )}
    >
      <SequentialNavButtonUI
        className="SequentialNavButton go-previous"
        aria-label={getNavigatorButtonLabel(navigationLevel, 'previous')}
        onClick={goPrevious}
      >
        <Icon name="arrow-left-single-large" />
        <VisuallyHidden>
          {getNavigatorButtonLabel(navigationLevel, 'previous')}
        </VisuallyHidden>
      </SequentialNavButtonUI>
      <DeepNavigatorButtonUI
        className="DeepNavigatorButton"
        onClick={onDeepNavigationClick}
        disabled={navigationLevel === NAVIGATION_LEVELS.YEAR_RANGES}
        aria-live="polite"
      >
        {label}
      </DeepNavigatorButtonUI>
      <SequentialNavButtonUI
        className="SequentialNavButton go-next"
        onClick={goNext}
        disabled={!canNavigateForward}
        aria-label={getNavigatorButtonLabel(navigationLevel, 'next')}
      >
        <Icon name="arrow-right-single-large" />
        <VisuallyHidden>
          {getNavigatorButtonLabel(navigationLevel, 'next')}
        </VisuallyHidden>
      </SequentialNavButtonUI>
    </NavigatorUI>
  )
}

Navigator.defaultProps = {
  allowFutureDatePick: true,
  goPrevious: noop,
  goNext: noop,
  navigationLevel: false,
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
  navigationLevel: PropTypes.oneOf([
    'MONTH_BY_MONTH',
    'YEAR_BY_YEAR',
    'YEAR_RANGES',
  ]),
  /** Callback to navigate to the next level of navigation */
  onDeepNavigationClick: PropTypes.func,
}

export default Navigator
