import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import useAnimatedRender from '../../hooks/useAnimatedRender'
import { noop } from '../../utilities/other'
import {
  BodyUI,
  ClosePanelButtonUI,
  FooterUI,
  HeaderUI,
  OverlayUI,
  SidePanelUI,
} from './SidePanel.css'
import Button from '../Button/'
import Icon from '../Icon'

function SidePanel({
  children,
  className,
  mainActionButtonText = 'Start',
  onMainActionClick = noop,
  mainActionDisabled = false,
  onClose = noop,
  panelHeading = 'Review and Start',
  panelSubHeading = 'Complete the required details before going live',
  panelWidth = '400px',
  show = false,
  side = 'right',
  withHeader = true,
  withFooter = true,
  withOverlay = true,
  zIndex = 999,
}) {
  const panelRef = useRef(null)
  const overlayRef = useRef(null)
  const [shouldRender, onAnimationEnd] = useAnimatedRender(
    show,
    overlayRef,
    panelRef
  )

  function handleOverlayKeyDown(e) {
    if (shouldRender && e.key === 'Escape') {
      e.stopPropagation()
      onClose()
    }
  }

  return shouldRender ? (
    <OverlayUI
      className={classNames(
        'SidePanel-Overlay',
        show && 'element-in',
        !withOverlay && 'no-overlay',
        side,
        className
      )}
      data-cy="sidepanel-overlay"
      data-testid="sidepanel-overlay"
      onAnimationEnd={onAnimationEnd}
      onKeyDown={handleOverlayKeyDown}
      ref={overlayRef}
      zIndex={zIndex}
    >
      <SidePanelUI
        aria-modal="true"
        aria-labelledby="sidepanel-header-heading"
        className="SidePanel"
        data-cy="sidepanel"
        data-testid="sidepanel"
        id="sidepanel"
        panelWidth={panelWidth}
        ref={panelRef}
        role="dialog"
        tabIndex="0"
      >
        <ClosePanelButtonUI onClick={onClose}>
          <Icon size={24} name="cross" />
        </ClosePanelButtonUI>
        {withHeader ? (
          <HeaderUI>
            <h1 id="sidepanel-header-heading" className="SidePanel__Heading">
              {panelHeading}
            </h1>
            <p className="SidePanel__Subheading">{panelSubHeading}</p>
          </HeaderUI>
        ) : null}
        <BodyUI>{children}</BodyUI>
        {withFooter ? (
          <FooterUI>
            <Button
              disabled={mainActionDisabled}
              kind="primary"
              size="xl"
              onClick={onMainActionClick}
            >
              {mainActionButtonText}
            </Button>
          </FooterUI>
        ) : null}
      </SidePanelUI>
    </OverlayUI>
  ) : null
}

SidePanel.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  mainActionButtonText: PropTypes.string,
  onClose: PropTypes.func,
  onMainActionClick: PropTypes.func,
  panelHeading: PropTypes.string,
  panelSubHeading: PropTypes.string,
  panelWidth: PropTypes.string,
  show: PropTypes.bool,
  side: PropTypes.oneOf(['left', 'right']),
  withFooter: PropTypes.bool,
  withOverlay: PropTypes.bool,
  zIndex: PropTypes.number,
}

export default SidePanel
