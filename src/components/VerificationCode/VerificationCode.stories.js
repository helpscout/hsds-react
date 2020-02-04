import React from 'react'
import { storiesOf } from '@storybook/react'
import VerificationCode from './'

const stories = storiesOf('Components/VerificationCode', module)

stories.add('Default', () => {
  return <VerificationCode />
})

stories.add('Invalid', () => {
  return (
    <VerificationCode
      isValid={false}
      onChange={val => {
        console.log(val)
      }}
    />
  )
})

stories.add('In context', () => {
  return (
    <div>
      <input type="text" />
      <div style={{ margin: '50px 0' }}>
        <VerificationCode />
      </div>
      <button>Cancel</button>
      <button>Submit</button>
    </div>
  )
})

class ExternalValue extends React.PureComponent {
  state = {
    code: '123456',
  }

  handleChange = e => {
    this.setState({ code: e.target.value })
  }

  render() {
    const { code } = this.state

    return (
      <div>
        <input type="text" onChange={this.handleChange} value={code} />
        <div style={{ margin: '50px 0' }}>
          <VerificationCode code={code} />
        </div>
        <button>Cancel</button>
        <button>Submit</button>
      </div>
    )
  }
}

stories.add('External value', () => {
  return <ExternalValue />
})
