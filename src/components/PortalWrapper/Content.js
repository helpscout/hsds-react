import { PureComponent as Component } from 'react'
import PropTypes from 'prop-types'
import { setupManager } from '../../utilities/globalManager'

const managerNamespace = 'BluePortalWrapperGlobalManager'

export const propTypes = {
  manager: PropTypes.object,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}
const defaultProps = {
  manager: setupManager(managerNamespace),
  id: 1000
}

class Content extends Component {
  componentDidMount () {
    const { id, manager } = this.props
    manager.add(id)
  }

  componentWillUnmount () {
    const { id, manager } = this.props
    manager.remove(id)
  }

  render () {
    const {
      children
    } = this.props

    return children || null
  }
}

Content.propTypes = propTypes
Content.defaultProps = defaultProps

export default Content
