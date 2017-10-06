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

storiesOf('Dropdown', module)
  .add('test', () => (
    <div style={{padding: '50px'}}>
      <Flexy just='left' gap='md'>
        <Flexy.Item>
          <Dropdown>
            <Dropdown.Trigger>
              Hello
            </Dropdown.Trigger>
            <Dropdown.Menu>
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
              There
            </Dropdown.Trigger>
            <Dropdown.Menu isOpen>
              {itemsMarkup(5)}
            </Dropdown.Menu>
          </Dropdown>
        </Flexy.Item>
        <Flexy.Item>
          <a href='#'>Hit Stop</a>
        </Flexy.Item>
      </Flexy>
    </div>
  ))
  .add('default', () => (
    <div>
      <Dropdown>
        <Dropdown.Trigger>
        Hello
      </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item onFocus={logAction}>
          Hello 1

          <Dropdown.Menu>
            <Dropdown.Item onFocus={logAction}>
              Hello 2
            </Dropdown.Item>
            <Dropdown.Item onFocus={logAction}>
              Hello 2

              <Dropdown.Menu enableCycling>
                <Dropdown.Item onFocus={logAction}>
                  Hello 2
                </Dropdown.Item>
                <Dropdown.Item onFocus={logAction}>
                  Hello 2
                </Dropdown.Item>
                <Dropdown.Item onFocus={logAction}>
                  Hello 2
                </Dropdown.Item>
                <Dropdown.Item onFocus={logAction}>
                  Hello 2
                </Dropdown.Item>
              </Dropdown.Menu>

            </Dropdown.Item>
            <Dropdown.Item onFocus={logAction}>
              Hello 2
            </Dropdown.Item>
            <Dropdown.Item onFocus={logAction}>
              Hello 2
            </Dropdown.Item>
          </Dropdown.Menu>
          </Dropdown.Item>
          <Dropdown.Item onFocus={logAction}>
            <div>
            Hello 2
          </div>
          </Dropdown.Item>
          <Dropdown.Item onFocus={logAction}>
          Hello 3
        </Dropdown.Item>
          <Dropdown.Item onFocus={logAction}>
          Hello 4
          <Dropdown.Menu enableCycling>
            <Dropdown.Item onFocus={logAction}>
              Hello 2
            </Dropdown.Item>
            <Dropdown.Item onFocus={logAction}>
              Hello 2
            </Dropdown.Item>
            <Dropdown.Item onFocus={logAction}>
              Hello 2
            </Dropdown.Item>
            <Dropdown.Item onFocus={logAction}>
              Hello 2
            </Dropdown.Item>
          </Dropdown.Menu>
          </Dropdown.Item>
          <Dropdown.Item onFocus={logAction}>
          Hello 5
        </Dropdown.Item>
          <Dropdown.Item onFocus={logAction}>
          Hello 6
        </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown>
        <Dropdown.Trigger>
          Hello
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item onFocus={logAction}>
          Hello 1
        </Dropdown.Item>
          <Dropdown.Item onFocus={logAction}>
            <div>
            Hello 2
          </div>
          </Dropdown.Item>
          <Dropdown.Item onFocus={logAction}>
          Hello 3
        </Dropdown.Item>
          <Dropdown.Item onFocus={logAction}>
          Hello 4
          <Dropdown.Menu enableCycling>
            <Dropdown.Item onFocus={logAction}>
              Hello 2
            </Dropdown.Item>
            <Dropdown.Item onFocus={logAction}>
              Hello 2
            </Dropdown.Item>
          </Dropdown.Menu>
          </Dropdown.Item>
          <Dropdown.Item onFocus={logAction}>
          Hello 5
        </Dropdown.Item>
          <Dropdown.Item onFocus={logAction}>
          Hello 6
        </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <a href='#'>Link</a>
    </div>
  ))
