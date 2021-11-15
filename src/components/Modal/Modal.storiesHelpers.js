import React, { useState } from 'react'
import Modal from './'

export function MyModal() {
  const inputRef = React.useRef(null)

  return (
    <Modal
      focusModalOnShow={false}
      onOpen={() => {
        inputRef.current.focus()
      }}
      trigger={<button>Clicky</button>}
      version={2}
    >
      <Modal.Body version={2}>
        <input type="text" ref={inputRef} />
      </Modal.Body>
    </Modal>
  )
}

export function ModalWithTriggerAndInput() {
  const inputRef = React.useRef(null)
  const [text, setText] = useState('')

  return (
    <>
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
    </>
  )
}
