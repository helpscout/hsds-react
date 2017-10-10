import React from 'react'
import { storiesOf } from '@storybook/react'
import { Dropdown, Flexy } from '../src/index.js'

const logAction = (i) => () => {
  console.log(`Action ${i}`)
}

const itemsMarkup = (amount = 10) => {
  const items = []
  for (let i = 0; i < amount; i++) {
    const item = (
      <Dropdown.Item key={i} onClick={logAction(i + 1)}>
        Item {i + 1}
      </Dropdown.Item>
    )
    items.push(item)
  }
  return items
}

const onBeforeClose = onClose => {
  console.log('onBeforeClose')
  onClose()
}

storiesOf('Dropdown', module)
  .add('Default', () => (
    <div style={{padding: '50px'}}>
      <Flexy just='left' gap='md'>
        <Flexy.Item>
          <Dropdown>
            <Dropdown.Trigger>
              Dropdown
            </Dropdown.Trigger>
            <Dropdown.Menu onBeforeClose={onBeforeClose}>
              <Dropdown.Item onClick={logAction}>
                Nested
                <Dropdown.Menu>
                  <Dropdown.Item>
                    Nested
                    <Dropdown.Menu enableCycling>
                      <Dropdown.Item>
                        Arrow up/down Cycling enabled
                      </Dropdown.Item>
                      {itemsMarkup(4)}
                    </Dropdown.Menu>
                  </Dropdown.Item>
                  {itemsMarkup(4)}
                </Dropdown.Menu>
              </Dropdown.Item>
              <Dropdown.Divider />
              {itemsMarkup(10)}
            </Dropdown.Menu>
          </Dropdown>
        </Flexy.Item>
        <Flexy.Item>
          <Dropdown direction='left up'>
            <Dropdown.Trigger>
              Another
            </Dropdown.Trigger>
            <Dropdown.Menu isOpen>
              {itemsMarkup(5)}
            </Dropdown.Menu>
          </Dropdown>
        </Flexy.Item>
        <Flexy.Item>
          <a href='#'>Link</a>
        </Flexy.Item>
      </Flexy>
    </div>
  ))
  .add('Item', () => (
    <div style={{ maxWidth: 200 }}>
      <Dropdown.Item onClick={logAction}>
        Item
      </Dropdown.Item>
      <Dropdown.Item onClick={logAction}>
        Nested
        <Dropdown.Menu>
          <Dropdown.Item>
            Nested
            <Dropdown.Menu enableCycling>
              <Dropdown.Item>
                Arrow up/down Cycling enabled
              </Dropdown.Item>
              {itemsMarkup(4)}
            </Dropdown.Menu>
          </Dropdown.Item>
          {itemsMarkup(4)}
        </Dropdown.Menu>
      </Dropdown.Item>
    </div>
  ))
