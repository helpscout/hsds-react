import React from 'react'
import PropTypes from 'prop-types'
import { setupManager } from '../../utilities/globalManager'

const managerNamespace = 'BluePortalWrapperGlobalManager'

export interface Props {
  manager: any
  id: number | string
}

class Content extends React.PureComponent<Props> {
  static defaultProps = {
    manager: setupManager(managerNamespace),
    id: 1000,
  }

  componentDidMount() {
    const { id, manager } = this.props
    manager.add(id)
  }

  componentWillUnmount() {
    const { id, manager } = this.props
    manager.remove(id)
  }

  render() {
    return this.props.children || null
  }
}

export default Content
