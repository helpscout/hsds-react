import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import Text from '../Text'
import Card from '../Card'
import Heading from '../Heading'
import Button from '../Button'
import Frame from './'
import HSDS from '../HSDS'
import Modal from '../Modal'
import { GlobalContext } from '../HSDS/Provider'

class ModalComponent extends React.PureComponent {
  static defaultProps = {
    hsdsScope: '',
  }

  render() {
    const { hsdsScope, children, ...rest } = this.props
    return (
      <Modal wrapperClassName={hsdsScope} {...rest}>
        {this.props.children}
      </Modal>
    )
  }
}
export const ModalWrapper = props => {
  const contextValue = React.useContext(GlobalContext)
  const hsdsScope = contextValue ? contextValue.getCurrentScope() : null
  return <ModalComponent {...props} hsdsScope={hsdsScope} />
}

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
          <br />
          {this.state.showFrame && (
            <Frame style={{ height: '500px' }}>
              <HSDS.Provider>
                <Card>
                  <Heading>Card title</Heading>
                  <p>
                    <Text>Card content</Text>
                  </p>
                  <FooterUI>
                    <Modal
                      trigger={
                        <ButtonUI
                          kind="primary"
                          onClick={e => e.preventDefault()}
                        >
                          Open Modal
                        </ButtonUI>
                      }
                    >
                      <Modal.Body>
                        <Heading>Title</Heading>
                        <p>Lorem ipsum</p>
                      </Modal.Body>
                    </Modal>
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
