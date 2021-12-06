import React, { useState } from 'react'
import SimpleModal from './SimpleModal'
import Button from '../Button'

export const SimpleModalWithTrigger = () => {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <>
      <Button kind="primary" onClick={() => setIsOpened(true)}>
        Open modal
      </Button>
      <SimpleModal
        show={isOpened}
        focusModalOnShow
        trapFocus
        onClose={() => setIsOpened(false)}
      >
        <div>My modal</div>
        <Button kind="primary">Some button</Button>
      </SimpleModal>
    </>
  )
}
