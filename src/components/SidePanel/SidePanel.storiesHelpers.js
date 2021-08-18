import React, { useState } from 'react'
import styled from 'styled-components'
import classNames from 'classnames'
import { getColor } from '../../styles/utilities/color'
import { d400, d400Effect } from '../../styles/mixins/depth.css'
import Button from '../Button/'
import ChoiceGroup from '../ChoiceGroup'
import Radio from '../Radio'
import HuzzahBird from '@helpscout/hsds-illos/huzzah-bird'
import SidePanel from './SidePanel'
import SimpleModal from '../SimpleModal'
import { HeaderAndFooter } from './SidePanel.layouts'

const AppContainerUI = styled('div')`
  width: 100%;
  height: calc(100vh - 2rem);
  background-color: #e5e5f7;
  background-size: 10px 10px;
  background-image: repeating-linear-gradient(
    45deg,
    #444cf7 0,
    #444cf7 1px,
    #e5e5f7 0,
    #e5e5f7 50%
  );
`

const FakeNavUI = styled('nav')`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 100%;
  background-color: #444cf7;

  .c-ChoiceGroup {
    margin-right: 20px;
  }
  .c-FormGroupChoice {
    margin-bottom: 0;
    color: white;
  }
`

const FakeCardUI = styled('div')`
  ${d400}
  width: 200px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
  border-radius: 4px;

  &.in-panel {
    width: 100%;
    height: 100px;
    margin: 0 0 45px 0;
    box-shadow: 0 0 0 2px white, 0 0 0 4px ${getColor('yellow.400')};

    &.checked {
      box-shadow: 0 0 0 2px white, 0 0 0 4px ${getColor('green.400')};
    }
  }

  &:hover {
    ${d400Effect}
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px white, 0 0 0 4px ${getColor('blue.400')};
  }
`

const FakeMainUI = styled('main')`
  position: relative;
  width: 100%;
  height: calc(100vh - 40px - 2rem);
  padding: 30px;
  background-color: #e5e5f7;
  background-image: radial-gradient(#444cf7 0.5px, #e5e5f7 0.5px);
  background-size: 10px 10px;
`

export default function SidePanelApp() {
  const [showPanel, setShowPanel] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [panelDirection, setPanelDirection] = useState('right')
  const [step1Checked, setStep1Checked] = useState(false)
  const [step2Checked, setStep2Checked] = useState(false)
  const [step3Checked, setStep3Checked] = useState(false)

  function handleToggle() {
    setShowPanel(!showPanel)
  }
  return (
    <AppContainerUI className="AppContainer">
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
          show={showPanel}
          onClose={handleToggle}
          side={panelDirection}
        >
          <HeaderAndFooter
            onMainActionClick={() => setShowModal(true)}
            mainActionDisabled={!step1Checked || !step2Checked || !step3Checked}
          >
            <FakeCardUI
              className={classNames('in-panel', step1Checked && 'checked')}
              onClick={() => {
                setStep1Checked(!step1Checked)
              }}
              tabIndex="0"
            >
              Step 1
            </FakeCardUI>
            <FakeCardUI
              className={classNames('in-panel', step2Checked && 'checked')}
              onClick={() => {
                setStep2Checked(!step2Checked)
              }}
              tabIndex="0"
            >
              Step 2
            </FakeCardUI>
            <FakeCardUI
              className={classNames('in-panel', step3Checked && 'checked')}
              onClick={() => {
                setStep3Checked(!step3Checked)
              }}
              tabIndex="0"
            >
              Step 3
            </FakeCardUI>
            <SimpleModal
              show={showModal}
              zIndex={1000}
              onClose={() => setShowModal(false)}
            >
              <HuzzahBird size={200} />
              <br />
              <br />
              <button>Action!</button>
              <br />
              <br />
              <button>More Action!</button>
            </SimpleModal>
          </HeaderAndFooter>
        </SidePanel>
      </FakeMainUI>
    </AppContainerUI>
  )
}
