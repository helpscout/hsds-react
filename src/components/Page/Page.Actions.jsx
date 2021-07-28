import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Page, { PageContext } from './Page'
import {
  ActionsUI,
  ActionsBlockUI,
  ActionsItemUI,
  StickyActionsWrapperUI,
} from './Page.css'
import PageStickyActions from './Page.StickyActions'
import classNames from 'classnames'
import { noop } from '../../utilities/other'

const ActionContent = props => {
  const {
    innerRef,
    isResponsive,
    primary,
    serious,
    secondary,
    direction,
    zIndex,
    withStickyWrapper,
    className,
    ...rest
  } = props

  const componentClassNames = classNames(
    'c-PageActions',
    direction && `is-${direction}`,
    primary && 'withPrimary',
    secondary && 'withSecondary',
    serious && 'withSerious',
    className
  )

  const content = (
    <ActionsUI
      {...getValidProps(rest)}
      data-cy="PageActionsContent"
      className={componentClassNames}
      ref={withStickyWrapper ? innerRef : null}
      withStickyWrapper={withStickyWrapper}
      role="toolbar"
    >
      <ActionsItemUI
        className="c-PageActions__primary"
        data-cy="PageActionsPrimaryItemWrapper"
      >
        {primary}
      </ActionsItemUI>
      <ActionsItemUI
        className="c-PageActions__secondary"
        data-cy="PageActionsSecondaryItemWrapper"
      >
        {secondary}
      </ActionsItemUI>
      <ActionsBlockUI className="c-PageActions__block" />
      <ActionsItemUI
        className="c-PageActions__serious"
        data-cy="PageActionsSeriousItemWrapper"
      >
        {serious}
      </ActionsItemUI>
    </ActionsUI>
  )

  if (!withStickyWrapper) return content

  return (
    <StickyActionsWrapperUI
      className="c-PageActions__stickyWrapper"
      data-cy="PageActionsStickyWrapper"
      zIndex={zIndex}
    >
      <Page isResponsive={isResponsive}>{content}</Page>
    </StickyActionsWrapperUI>
  )
}

const PageActions = props => {
  const { stickyOffset, isSticky, onStickyStart, onStickyEnd } = props
  const [isStickyActive, setStickyActive] = useState(isSticky)

  const { isResponsive } = useContext(PageContext)

  const handleOnStickyStart = node => {
    setStickyActive(true)
    onStickyStart(node)
  }

  const handleOnStickyStop = node => {
    setStickyActive(false)
    onStickyEnd(node)
  }

  const showStickyAction = isSticky && isStickyActive
  return (
    <div data-cy="PageActionsWrapper">
      <PageStickyActions
        onStickyStart={handleOnStickyStart}
        onStickyEnd={handleOnStickyStop}
        offset={stickyOffset}
      >
        <ActionContent
          {...props}
          withStickyWrapper={false}
          isResponsive={isResponsive}
        />
      </PageStickyActions>
      {showStickyAction && (
        <ActionContent
          {...props}
          withStickyWrapper={true}
          isResponsive={isResponsive}
        />
      )}
    </div>
  )
}

PageActions.defaultProps = {
  'data-cy': 'PageActions',
  direction: 'right',
  innerRef: noop,
  onStickyStart: noop,
  onStickyEnd: noop,
  isResponsive: false,
  isSticky: false,
  stickyOffset: 10,
  zIndex: 10,
}

PageActions.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** The alignment of the actions. */
  direction: PropTypes.string,
  /** Stickies the Actions at the bottom of the browser. */
  isSticky: PropTypes.bool,
  /** Callback the moment the component sticks. */
  onStickyStart: PropTypes.func,
  /** Callback the moment the component stops sticking. */
  onStickyEnd: PropTypes.func,
  /** A render slot for the primary action. */
  primary: PropTypes.any,
  /** A render slot for the secondary action. */
  secondary: PropTypes.any,
  /** A render slot for the serious (probably destructive) action. */
  serious: PropTypes.any,
  /** The CSS `z-index` for when the component is sticky. */
  zIndex: PropTypes.number,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default PageActions
