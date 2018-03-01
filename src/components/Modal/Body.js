import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import Scrollable from '../Scrollable'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'

export const propTypes = {
  isSeamless: PropTypes.bool,
  onScroll: PropTypes.func,
  scrollable: PropTypes.bool,
  scrollableRef: PropTypes.func,
  scrollFade: PropTypes.bool
}

const defaultProps = {
  isSeamless: false,
  onScroll: noop,
  scrollable: true,
  scrollableRef: noop,
  scrollFade: true
}

const contextTypes = {
  positionCloseNode: PropTypes.func
}

class Body extends Component {
  constructor () {
    super()
    this.scrollableNode = null
  }

  componentDidMount () {
    this.positionCloseNode()
  }

  positionCloseNode () {
    if (this.context.positionCloseNode) {
      this.context.positionCloseNode(this.scrollableNode)
    }
  }

  componentWillUnmount () {
    this.scrollableNode = null
  }

  render () {
    const {
      className,
      children,
      isSeamless,
      onScroll,
      scrollable,
      scrollFade,
      scrollableRef,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-ModalBody',
      isSeamless && 'is-seamless',
      scrollable ? 'is-scrollable' : 'is-not-scrollable',
      className
    )

    const childrenContent = scrollable ? (
      <Scrollable
        className='c-ModalBody__scrollable'
        contentClassName='c-ModalBody__scrollableContent'
        fade={scrollFade}
        rounded
        onScroll={onScroll}
        scrollableRef={node => {
          this.scrollableNode = node
          scrollableRef(node)
        }}
      >
        {children}
      </Scrollable>
    ) : children

    return (
      <div className={componentClassName} {...rest}>
        {childrenContent}
      </div>
    )
  }
}

Body.propTypes = propTypes
Body.defaultProps = defaultProps
Body.contextTypes = contextTypes
Body.displayName = 'ModalBody'

export default Body
