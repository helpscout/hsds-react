import React from 'react'
import PropTypes from 'prop-types'
import { setupManager } from '../../utilities/globalManager'

const managerNamespace = 'HSDSPortalWrapperGlobalManager'

class Content extends React.PureComponent {
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

Content.propTypes = {
  manager: PropTypes.any,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default Content
