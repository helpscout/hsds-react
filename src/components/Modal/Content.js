import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import Body from './Body'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'

export const propTypes = {
  scrollableRef: PropTypes.func
}

const defaultProps = {
  scrollableRef: noop
}

class Content extends Component {
  render () {
    const {
      className,
      children,
      scrollableRef,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-ModalContent',
      className
    )

    const childrenMarkup = React.Children.map(children, child => {
      if (child && (child.type && child.type === Body)) {
        return React.cloneElement(child, {
          scrollableRef: (node) => {
            scrollableRef(node)
            child.props.scrollableRef(node)
          }
        })
      }

      return child
    })

    return (
      <div className={componentClassName} {...rest}>
        {childrenMarkup}
      </div>
    )
  }
}

Content.propTypes = propTypes
Content.defaultProps = defaultProps
Content.displayName = 'ModalContent'

export default Content
