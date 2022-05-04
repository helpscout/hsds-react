import React, { useReducer, useState } from 'react'
import SimpleModal from './SimpleModal'
import { Portal } from '../../hooks/usePortal'
import Button from '../Button'

function reducer(state, type) {
  switch (type) {
    case 'OPEN_1':
      return { ...state, isOpen1: true }
    case 'CLOSE_1':
      return { ...state, isOpen1: state.isOpen2 ? true : false }
    case 'OPEN_2':
      return { ...state, isOpen2: true }
    case 'CLOSE_2':
      return { ...state, isOpen2: false }

    default:
      return state
  }
}

export const SimpleModalWithTrigger = () => {
  const [state, dispatch] = useReducer(reducer, {
    isOpen1: false,
    isOpen2: false,
  })
  const [buttonVisible, setButtonVisible] = useState(true)

  return (
    <>
      <Button
        kind="primary"
        onClick={() => {
          setButtonVisible(true)
          dispatch('OPEN_1')
        }}
      >
        Open modal
      </Button>
      <Portal selector="#root">
        <SimpleModal
          show={state.isOpen1}
          className="first-modal"
          focusModalOnShow
          trapFocus
          onClose={e => {
            dispatch('CLOSE_1')
          }}
          closeOnClickOutside="modal"
        >
          <Button kind="primary" onClick={() => dispatch('OPEN_2')}>
            Open second modal
          </Button>
          {buttonVisible ? (
            <Button
              style={{ marginTop: '20px' }}
              size="xs"
              theme="green"
              onClick={() => {
                setButtonVisible(false)
              }}
            >
              remove this button
            </Button>
          ) : null}
        </SimpleModal>
      </Portal>
      <Portal selector="#root">
        <SimpleModal
          id="second-modal"
          className="second-modal"
          show={state.isOpen2}
          height="150px"
          width="150px"
          focusModalOnShow
          trapFocus
          onClose={e => {
            dispatch('CLOSE_2')
            document.querySelector('#simple-modal').focus()
          }}
          closeOnClickOutside="modal"
        >
          <div>My second modal</div>
        </SimpleModal>
      </Portal>
    </>
  )
}
