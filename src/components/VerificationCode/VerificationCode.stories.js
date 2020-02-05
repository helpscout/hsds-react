import React from 'react'
import VerificationCode from './'

export default {
  component: VerificationCode,
  title: 'Components/VerificationCode',
}

export const Default = () => {
  return <VerificationCode />
}

export const Invalid = () => {
  return (
    <VerificationCode
      isValid={false}
      onChange={val => {
        console.log(val)
      }}
    />
  )
}

export const InContext = () => {
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
}

InContext.story = {
  name: 'In context',
}

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

export const _ExternalValue = () => {
  return <ExternalValue />
}

_ExternalValue.story = {
  name: 'External value',
}
