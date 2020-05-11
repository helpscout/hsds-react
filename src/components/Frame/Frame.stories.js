import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import Text from '../Text'
import Card from '../Card'
import Heading from '../Heading'
import Button from '../Button'
import Frame from './'
import HSDS from '../HSDS'

const stories = storiesOf('Frame', module)

const ButtonUI = styled(Button)`
  margin-left: auto;
`
const FooterUI = styled.div`
  display: flex;
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
              <HSDS.Provider>
                <Card>
                  <Heading>Card title</Heading>
                  <p>
                    <Text>Card content</Text>
                  </p>
                  <FooterUI>
                    <Button>Cancel</Button>
                    <ButtonUI kind="primary">Submit</ButtonUI>
                  </FooterUI>
                </Card>
              </HSDS.Provider>
            </Frame>
          )}
        </div>
      )
    }
  }

  return <Example />
})
