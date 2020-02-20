import React, { useContext, useState } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Page, { PageContext } from './Page'
import {
  ActionsUI,
  ActionsBlockUI,
  ActionsItemUI,
  StickyActionsWrapperUI,
} from './Page.css'
import StickyActions from './Page.StickyActions'
import { classNames } from '../../utilities/classNames'
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
      data-cy="PageActionsContent"
      {...getValidProps(rest)}
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

const Actions = props => {
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
      <StickyActions
        onStickyStart={handleOnStickyStart}
        onStickyEnd={handleOnStickyStop}
        offset={stickyOffset}
      >
        <ActionContent
          {...props}
          withStickyWrapper={false}
          isResponsive={isResponsive}
        />
      </StickyActions>
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

Actions.displayName = 'Page.Actions'

Actions.defaultProps = {
  direction: 'right',
  innerRef: noop,
  onStickyStart: noop,
  onStickyEnd: noop,
  isResponsive: false,
  isSticky: false,
  stickyOffset: 10,
  zIndex: 10,
}

export default Actions
