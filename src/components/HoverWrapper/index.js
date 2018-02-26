import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import { noop } from '../../utilities/other'

const HoverWrapper = ComposedComponent => {
  const propTypes = {
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func
  }
  const defaultProps = {
    onMouseEnter: noop,
    onMouseLeave: noop
  }
  class WrappedComponent extends Component {
    constructor () {
      super()
      this.state = {
        isHovered: false
      }
      this.handleMouseEnter = this.handleMouseEnter.bind(this)
      this.handleMouseLeave = this.handleMouseLeave.bind(this)
    }

    handleMouseEnter () {
      const { onMouseEnter } = this.props
      onMouseEnter()
      this.setState({
        isHovered: true
      })
    }

    handleMouseLeave () {
      const { onMouseLeave } = this.props
      onMouseLeave()
      this.setState({
        isHovered: false
      })
    }

    render () {
      const {
        onMouseEnter,
        onMouseLeave,
        ...rest
      } = this.props
      const { isHovered } = this.state
      const handleMouseEnter = this.handleMouseEnter
      const handleMouseLeave = this.handleMouseLeave

      return (
        <ComposedComponent
          {...rest}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          isHovered={isHovered}
        />
      )
    }
  }

  WrappedComponent.propTypes = propTypes
  WrappedComponent.defaultProps = defaultProps
  WrappedComponent.contextTypes = ComposedComponent.contextTypes
  WrappedComponent.displayName = ComposedComponent.displayName

  return WrappedComponent
}

export default HoverWrapper
