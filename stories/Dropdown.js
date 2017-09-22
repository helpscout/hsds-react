import React from 'react'
import { storiesOf } from '@storybook/react'
import { Dropdown } from '../src/index.js'

const logAction = () => {
  console.log('Action')
}

storiesOf('Dropdown', module)
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
