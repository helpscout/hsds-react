import React from 'react'
import { storiesOf } from '@storybook/react'
// import Frame from 'react-frame-component'
import { Text, Tooltip } from '../../src/components/index'
import styled from 'styled-components'
import { ScopeProvider, ThemeProvider } from '../../src/components/styled'

import { Frame } from '../../src/components/FrameProvider'

const stories = storiesOf('Fancy/FrameProvider', module)

const Card = styled('div')`
  padding: 20px;
  ${props =>
    props.theme.color &&
    `
    background: ${props.theme.color};
  `};
`

stories.add('default', () => {
  class Example extends React.Component {
    state = {
      showFrame: true,
    }

    toggle = () => {
      this.setState({
        showFrame: !this.state.showFrame,
      })
    }

    render() {
      return (
        <div>
          <button onClick={this.toggle}>Toggle Frame</button>
          <br />
          {this.state.showFrame && (
            <Frame>
              <ScopeProvider scope="html">
                <ThemeProvider theme={{ color: '#eee' }}>
                  <div id="App">
                    <Card>
                      <Text>
                        <Tooltip title="Elf!" triggerOn="click">
                          Buddy!
                        </Tooltip>
                      </Text>
                    </Card>
                  </div>
                </ThemeProvider>
              </ScopeProvider>
            </Frame>
          )}
        </div>
      )
    }
  }

  return <Example />
})
