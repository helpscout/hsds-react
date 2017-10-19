import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import { Transition } from 'react-transition-group'
// import anime from 'animejs'
// import classNames from '../../utilities/classNames'

export const propTypes = {
  className: PropTypes.string,
  duration: PropTypes.number,
}

const defaultProps = {
  duration: 200
}

class Animate extends Component {
  constructor() {
    super()
    this.handleOnEnter = this.handleOnEnter.bind(this)
  }

  handleOnEnter() {
    const { onEnter } = this.props
    console.log('enter')
    onEnter()
  }

  render() {
    const {
      children,
      duration,
      in: transitionIn,
      style: defaultStyle,
      ...rest
    } = this.props

    const handleOnEnter = this.handleOnEnter

    return (
      <Transition
        {...rest}
        className='Animate'
        in={true}
        onEnter={handleOnEnter}
        onEntering={handleOnEnter}
        timeout={duration}
      >
        {children}
      </Transition>
    )
  }
}

Animate.propTypes = propTypes
Animate.defaultProps = defaultProps

export default Animate
