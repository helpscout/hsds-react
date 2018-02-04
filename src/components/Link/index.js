import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { wordHasSpaces } from '../../utilities/strings'
import RouteWrapper from '../RouteWrapper'

export const propTypes = {
  autoWordWrap: PropTypes.bool,
  block: PropTypes.bool,
  className: PropTypes.string,
  external: PropTypes.bool,
  href: PropTypes.string,
  nodeRef: PropTypes.func,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  noUnderline: PropTypes.bool,
  to: PropTypes.string,
  wordWrap: PropTypes.bool
}

const defaultProps = {
  autoWordWrap: true,
  external: false,
  href: '#',
  nodeRef: noop,
  onBlur: noop,
  onClick: noop,
  onFocus: noop
}

class Link extends Component {
  render () {
    const {
    autoWordWrap,
    block,
    children,
    className,
    external,
    href,
    nodeRef,
    noUnderline,
    wordWrap,
    ...rest
  } = this.props

    const forceWordWrap = wordWrap || (autoWordWrap && !wordHasSpaces(children))

    const componentClassName = classNames(
    'c-Link',
    block && 'is-block',
    forceWordWrap && 'is-word-wrap',
    noUnderline && 'is-no-underline',
    className
  )

    const target = external ? '_blank' : undefined
    const rel = external ? 'noopener noreferrer' : undefined

    return (
      <a
        className={componentClassName}
        target={target}
        rel={rel}
        ref={nodeRef}
        href={href}
        {...rest}
      >
        {children}
      </a>
    )
  }
}

Link.propTypes = propTypes
Link.defaultProps = defaultProps

export default RouteWrapper(Link)
