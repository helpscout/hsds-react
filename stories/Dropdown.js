import React from 'react'
import { storiesOf } from '@storybook/react'
import { Dropdown, Flexy, Hr, Link } from '../src/index.js'

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

const onOpen = () => {
  console.log('onOpen')
}

const stories = storiesOf('Dropdown', module)

stories.add('Default', () => (
  <div style={{padding: '50px'}}>
    <Flexy just='left' gap='md'>
      <Flexy.Item>
        <Dropdown>
          <Dropdown.Trigger>
            Dropdown
          </Dropdown.Trigger>
          <Dropdown.Menu className='menu' onBeforeClose={onBeforeClose} onOpen={onOpen}>
            <Dropdown.Header>Header</Dropdown.Header>
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
            <Dropdown.Item disabled>
              Disabled Item
            </Dropdown.Item>
            <Dropdown.Divider />
            {itemsMarkup(10)}
          </Dropdown.Menu>
        </Dropdown>
      </Flexy.Item>
      <Flexy.Item>
        <Dropdown>
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

stories.add('Item', () => (
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

stories.add('Trigger', () => (
  <div>
    <Dropdown>
      <Dropdown.Trigger>
        Default
      </Dropdown.Trigger>
      <Dropdown.Menu onBeforeClose={onBeforeClose}>
        {itemsMarkup(10)}
      </Dropdown.Menu>
    </Dropdown>

    <br /><br />

    <Dropdown>
      <Dropdown.Trigger>
        <Link>Custom Link</Link>
      </Dropdown.Trigger>
      <Dropdown.Menu onBeforeClose={onBeforeClose}>
        {itemsMarkup(10)}
      </Dropdown.Menu>
    </Dropdown>
  </div>
))

stories.add('directions', () => (
  <div style={{padding: 100}}>
    <Dropdown direction='down left'>
      <Dropdown.Trigger>
        Down (Left)
      </Dropdown.Trigger>
      <Dropdown.Menu>
        {itemsMarkup(3)}
      </Dropdown.Menu>
    </Dropdown>

    <Hr />

    <Dropdown direction='down right'>
      <Dropdown.Trigger>
        Down (Right)
      </Dropdown.Trigger>
      <Dropdown.Menu>
        {itemsMarkup(3)}
      </Dropdown.Menu>
    </Dropdown>

    <Hr />

    <Dropdown direction='up left'>
      <Dropdown.Trigger>
        Up (Left)
      </Dropdown.Trigger>
      <Dropdown.Menu>
        {itemsMarkup(3)}
      </Dropdown.Menu>
    </Dropdown>

    <Hr />

    <Dropdown direction='up right'>
      <Dropdown.Trigger>
        Up (Right)
      </Dropdown.Trigger>
      <Dropdown.Menu>
        {itemsMarkup(3)}
      </Dropdown.Menu>
    </Dropdown>

    <Hr />
  </div>
))
