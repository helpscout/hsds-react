import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { NAVIGATION_LEVELS } from './Datepicker.constants'
import { getNavigatorButtonLabel } from './Datepicker.utils'
import Icon from '../Icon'
import VisuallyHidden from '../VisuallyHidden'
import {
  SequentialNavButtonUI,
  NavigatorUI,
  DeepNavigatorButtonUI,
} from './Datepicker.css'

const noop = () => undefined

function Navigator({
  canNavigateForward = true,
  goPrevious = noop,
  goNext = noop,
  navigationLevel = 'MONTH_BY_MONTH',
  label,
  onDeepNavigationClick = noop,
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
        type="button"
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
        type="button"
      >
        {label}
      </DeepNavigatorButtonUI>
      <SequentialNavButtonUI
        className="SequentialNavButton go-next"
        onClick={goNext}
        disabled={!canNavigateForward}
        aria-label={getNavigatorButtonLabel(navigationLevel, 'next')}
        type="button"
      >
        <Icon name="arrow-right-single-large" />
        <VisuallyHidden>
          {getNavigatorButtonLabel(navigationLevel, 'next')}
        </VisuallyHidden>
      </SequentialNavButtonUI>
    </NavigatorUI>
  )
}

Navigator.propTypes = {
  /** Whether is possible to pick a date in the future */
  canNavigateForward: PropTypes.bool,
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
