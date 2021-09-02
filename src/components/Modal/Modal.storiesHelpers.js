import React from 'react'
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
