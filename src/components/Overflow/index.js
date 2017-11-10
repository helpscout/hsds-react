import React, {PureComponent as Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import EventListener from '../EventListener'
import classNames from '../../utilities/classNames'
import { hasContentOverflow } from '../../utilities/node'

export const propTypes = {
  backgroundColor: PropTypes.string,
  style: PropTypes.object
}

const defaultProps = {
  backgroundColor: 'white',
  style: {}
}

class Overflow extends Component {
  constructor () {
    super()
    this.state = {
      faded: false
    }
    this.faderWidth = 32
    this.containerNode = null
    this.applyFade = this.applyFade.bind(this)
    this.onContainerScroll = this.onContainerScroll.bind(this)
  }

  componentDidMount () {
    this.applyFade()
  }

  applyFade () {
    const node = ReactDOM.findDOMNode(this)
    const containerNode = this.containerNode
    const height = containerNode.clientHeight

    this.setState({
      faded: hasContentOverflow(containerNode)
    })

    node.style.height = height ? `${height}px` : null
  }

  onContainerScroll (event) {
    const scrollNode = event.currentTarget
    const offset = this.faderWidth
    const { clientWidth, scrollWidth, scrollLeft } = scrollNode
    const scrollAmount = clientWidth + scrollLeft + offset

    if (scrollAmount >= scrollWidth) {
      this.faderNode.style.width = `${offset + (scrollWidth - scrollAmount)}px`
    } else {
      this.faderNode.style.width = `${offset}px`
    }
  }

  render () {
    const {
      backgroundColor,
      className,
      children,
      ...rest
    } = this.props

    const { faded } = this.state
    const applyFade = this.applyFade
    const onContainerScroll = this.onContainerScroll

    const componentClassName = classNames(
      'c-Overflow',
      faded && 'is-faded',
      className
    )

    const faderMarkup = (
      <div
        className='c-Overflow__fader'
        ref={node => (this.faderNode = node)}
        role='presentation'
        style={{
          color: backgroundColor,
          width: faded ? this.faderWidth : 0
        }}
      />
    )

    return (
      <div className={componentClassName} {...rest}>
        <div
          className='c-Overflow__container'
          ref={node => (this.containerNode = node)}
          onWheel={onContainerScroll}
        >
          <div className='c-Overflow__content'>
            {children}
          </div>
        </div>
        {faderMarkup}
        <EventListener event='resize' handler={applyFade} />
      </div>
    )
  }
}

Overflow.propTypes = propTypes
Overflow.defaultProps = defaultProps

export default Overflow
