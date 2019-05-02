import * as React from 'react'

export class WithAktiv extends React.Component {
  componentDidMount() {
    document.body.classList.add('with-aktiv')
  }

  componentWillUnmount() {
    document.body.classList.remove('with-aktiv')
  }

  render() {
    return this.props.children
  }
}

const withAktiv = storyFn => <WithAktiv>{storyFn()}</WithAktiv>

export default withAktiv
