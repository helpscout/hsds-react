import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { noop } from '../../utilities/other'
import Button from '../Button/'
import {
  AppContainerUI,
  FakeCardUI,
  FakeMainUI,
  FakeNavUI,
  FooterUI,
  BodyUI,
  ClosePanelButtonUI,
  HeaderUI,
  SidePanelUI,
  OverlayUI,
} from './SidePanel.css'
import ChoiceGroup from '../ChoiceGroup'
import Icon from '../Icon'
import Radio from '../Radio'

function FakeApp() {
  const [isPanelOpen, setPanelOpen] = useState(false)
  const [panelDirection, setPanelDirection] = useState('right')

  function handleToggle() {
    setPanelOpen(!isPanelOpen)
  }
  return (
    <AppContainerUI>
      <FakeNavUI>
        <ChoiceGroup
          multiSelect={false}
          align="horizontal"
          value={panelDirection}
          onChange={value => {
            setPanelDirection(value)
          }}
        >
          <Radio label="Right" value="right" name="right" />
          <Radio label="Left" value="left" name="left" />
        </ChoiceGroup>
        <Button kind="secondary" size="xs" onClick={() => handleToggle()}>
          Toggle Panel
        </Button>
      </FakeNavUI>
      <FakeMainUI>
        <div>
          <FakeCardUI>Card 1</FakeCardUI>
          <FakeCardUI>Card 2</FakeCardUI>
        </div>
        <SidePanel
          show={isPanelOpen}
          onClose={handleToggle}
          side={panelDirection}
        ></SidePanel>
      </FakeMainUI>
    </AppContainerUI>
  )
}

function SidePanel({
  mainActionButtonText = 'Start',
  onMainActionClick = noop,
  mainActionDisabled = false,
  onClose = noop,
  panelHeading = 'Review and Start',
  panelSubHeading = 'Complete the required details before going live',
  panelWidth = '400px',
  show = false,
  side = 'right',
  zindex = 999,
}) {
  const [shouldRender, setRender] = useState(show)

  useEffect(() => {
    if (show) setRender(true)
  }, [show])

  const onAnimationEnd = () => {
    if (!show) setRender(false)
  }

  return shouldRender ? (
    <OverlayUI
      className={classNames('SidePanel-Overlay', show && 'sidepanel-in', side)}
      onAnimationEnd={onAnimationEnd}
      zindex={zindex}
    >
      <SidePanelUI
        className="SidePanel"
        aria-labelledby="sidepanel-header-heading"
        panelWidth={panelWidth}
      >
        <HeaderUI>
          <h1 id="sidepanel-header-heading" className="SidePanel__Heading">
            {panelHeading}
          </h1>
          <p className="SidePanel__Subheading">{panelSubHeading}</p>
          <ClosePanelButtonUI onClick={onClose}>
            <Icon size={24} name="cross" />
          </ClosePanelButtonUI>
        </HeaderUI>
        <BodyUI>Body</BodyUI>
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
      </SidePanelUI>
    </OverlayUI>
  ) : null
}

SidePanel.propTypes = {
  mainActionButtonText: PropTypes.string,
  onClose: PropTypes.func,
  onMainActionClick: PropTypes.func,
  panelHeading: PropTypes.string,
  panelSubHeading: PropTypes.string,
  panelWidth: PropTypes.string,
  show: PropTypes.bool,
  side: PropTypes.oneOf(['left', 'right']),
  zindex: PropTypes.number,
}

export default FakeApp
