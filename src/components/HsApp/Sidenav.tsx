import * as React from 'react'
import { SidenavUI } from './HsApp.css'

export interface Props {}

class Sidenav extends React.PureComponent<Props> {
  render() {
    return <SidenavUI />
  }
}

export default Sidenav
