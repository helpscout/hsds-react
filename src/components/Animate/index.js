import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Transition, { ENTERED, ENTERING, EXITING, EXITED } from 'react-transition-group/Transition'
import classNames from '../../utilities/classNames'

const propTypes = {
  className: PropTypes.string, duration: PropTypes.number, wait: PropTypes.number
}

const defaultProps = {
  duration: 200,
  wait: 0
}

const animationStyles = {
  [ENTERING]: 'is-mounting',
  [ENTERED]: 'has-mounted',
  [EXITING]: 'is-unmounting',
  [EXITED]: 'has-unmounted'
}

class Animate extends Component {
  constructor () {
    super()
    this.state = {
      in: false
    }
  }

  componentDidMount () {
    this.setState({
      in: true
    })
  }

  componentWillUnmount () {
    this.setState({
      in: false
    })
  }

  render () {
    const props = this.props
    const transitionIn = this.state.in

    const {
      className,
      duration,
      wait,
      ...rest
    } = props

    const childStyle = (child) => {
      return Object.assign({}, child.props.style, {
        transitionDuration: `${duration}ms`
      })
    }

    const childClassName = (child, transitionStatus) => {
      return classNames(
        'animate',
        className,
        transitionStatus && animationStyles[transitionStatus],
        child.props.className
      )
    }

    return (
      <Transition
        {...rest}
        in={transitionIn}
        className='animate'
        timeout={wait}
      >
        {status => React.cloneElement(props.children, {
          className: childClassName(props.children, status),
          style: childStyle(props.children)
        })}
      </Transition>
    )
  }
}

Animate.propTypes = propTypes
Animate.defaultProps = defaultProps

export default Animate
