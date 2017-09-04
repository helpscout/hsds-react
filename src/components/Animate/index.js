import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Transition, { ENTERED, ENTERING, EXITING, EXITED } from 'react-transition-group/Transition'
import classNames from '../../utilities/classNames'

export const propTypes = {
  animateOnMount: PropTypes.bool,
  className: PropTypes.string,
  duration: PropTypes.number,
  in: PropTypes.bool,
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
  [ENTERED]: 'is-mounted',
  [EXITING]: 'is-unmounting',
  [EXITED]: 'is-unmounted'
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
    /* istanbul ignore next */
    if (nextProps.in === undefined) return

    this.setState({
      in: nextProps.in
    })
  }

  render () {
    const props = this.props
    const transitionIn = this.state.in

    const {
      children,
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
        {status => React.cloneElement(children, {
          className: childClassName(children, status),
          style: childStyle(children)
        })}
      </Transition>
    )
  }
}

Animate.propTypes = propTypes
Animate.defaultProps = defaultProps

export default Animate
