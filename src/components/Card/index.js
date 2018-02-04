import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import { default as Link, propTypes as linkPropTypes } from '../Link'
import Block from './Block'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { blockSelectorTagTypes } from '../../constants/propTypes'

export const propTypes = Object.assign({}, linkPropTypes, {
  borderless: PropTypes.bool,
  className: PropTypes.string,
  floating: PropTypes.bool,
  flex: PropTypes.bool,
  fullHeight: PropTypes.bool,
  hover: PropTypes.bool,
  href: PropTypes.string,
  nodeRef: PropTypes.func,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  seamless: PropTypes.bool,
  selector: blockSelectorTagTypes
})

const defaultProps = {
  borderless: false,
  flex: false,
  floating: false,
  fullHeight: false,
  hover: false,
  nodeRef: noop,
  onBlur: noop,
  onClick: noop,
  onFocus: noop,
  seamless: false,
  selector: 'div'
}

class Card extends Component {
  constructor () {
    super()
    this.node = null
  }

  componentWillUnmount () {
    this.node = null
  }

  render () {
    const {
      autoWordWrap,
      borderless,
      className,
      children,
      floating,
      flex,
      fullHeight,
      hover,
      href,
      nodeRef,
      onClick,
      seamless,
      selector,
      to,
      ...rest
    } = this.props

    const hasOnClick = onClick !== noop

    const componentClassName = classNames(
      'c-Card',
      (hasOnClick || href || to) && 'is-clickable',
      (hasOnClick || hover || href || to) && 'is-hoverable',
      borderless && 'is-borderless',
      floating && 'is-floating',
      flex && 'is-flex',
      fullHeight && 'is-fullHeight',
      href && 'is-link',
      seamless && 'is-seamless',
      className
    )

    const element = href || to ? (
      <Link
        autoWordWrap={autoWordWrap}
        block
        className={componentClassName}
        onClick={onClick}
        href={href}
        to={to}
        nodeRef={nodeRef}
        {...rest}
      >
        {children}
      </Link>
    ) : React.createElement(
      selector,
      {
        ...rest,
        className: componentClassName,
        href,
        onClick,
        ref: nodeRef
      },
      children
    )

    return element
  }
}

Card.propTypes = propTypes
Card.defaultProps = defaultProps
Card.Block = Block

export default Card
