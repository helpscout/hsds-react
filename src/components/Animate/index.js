import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Transition, { ENTERED, ENTERING, EXITING, EXITED } from 'react-transition-group/Transition'
import classNames from '../../utilities/classNames'

const propTypes = {
  animateOnMount: PropTypes.bool,
  className: PropTypes.string,
  duration: PropTypes.number,
  sequence: PropTypes.string,
  wait: PropTypes.number
}

const defaultProps = {
  animateOnMount: true,
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
    if (this.props.animateOnMount || this.props.in === true) {
      this.setState({
        in: true
      })
    }
  }

  componentWillUnmount () {
    if (this.props.animateOnMount) {
      this.setState({
        in: false
      })
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.in !== undefined) {
      this.setState({
        in: nextProps.in
      })
    }
  }

  render () {
    const props = this.props
    const transitionIn = this.state.in

    const {
      className,
      duration,
      sequence,
      wait,
      ...rest
    } = props

    const childStyle = (child) => {
      return Object.assign({}, child.props.style, {
        transitionDuration: `${duration}ms`
      })
    }

    const sequenceClassNames = sequence ? sequence
      .split(' ')
      .map(s => `is-${s}`)
      .join(' ') : null

    const childClassName = (child, transitionStatus) => {
      return classNames(
        'animate',
        className,
        sequenceClassNames,
        transitionStatus && animationStyles[transitionStatus],
        child.props.className
      )
    }

    const timeout = {
      enter: wait,
      exit: wait
    }

    return (
      <Transition
        {...rest}
        className='animate'
        in={transitionIn}
        timeout={timeout}
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
