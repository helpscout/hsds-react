import React, { useState, useEffect } from 'react'
import Modal from './'
import { useHotkeys } from 'react-hotkeys-hook'
import { allowGlobalHotkeys } from '../SimpleModal/SimpleModal.utils'

export function MyModal() {
  useHotkeys(
    'k',
    e => {
      e.preventDefault()
      e.stopPropagation()
      alert('global hotkey triggered')
    },
    {
      filter: e => allowGlobalHotkeys(e.target),
    }
  )
  const inputRef = React.useRef(null)

  return (
    <Modal
      focusModalOnShow={true}
      trigger={<button>Clicky</button>}
      version={2}
    >
      <Modal.Body version={2}>
        <input type="text" ref={inputRef} />
      </Modal.Body>
    </Modal>
  )
}

function BodyWithKeyboardShortcut({ children }) {
  useEffect(() => {
    document.body.addEventListener('keydown', e => {
      const { key } = e
      if (key === 'j') {
        alert('J pressed')
      }
    })
  }, [])
  return <div>{children}</div>
}

export function ModalWithTriggerAndInput() {
  const inputRef = React.useRef(null)
  const [text, setText] = useState('')

  return (
    <BodyWithKeyboardShortcut>
      <input onChange={e => setText(e.target.value)} value={text} />
      <Modal
        focusModalOnShow={false}
        trigger={<button>Clicky</button>}
        version={2}
      >
        <Modal.Body version={2}>
          <input type="text" ref={inputRef} />
        </Modal.Body>
      </Modal>
    </BodyWithKeyboardShortcut>
  )
}
