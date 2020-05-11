import React from 'react'
import PropTypes from 'prop-types'
import Container from './FluffyCard.Container'
import { classNames } from '../../utilities/classNames'

import { noop } from '../../utilities/other'
import { FluffyCardUI } from './FluffyCard.css'

class FluffyCard extends React.PureComponent {
  static propTypes = {
    autoWordWrap: PropTypes.bool,
    className: PropTypes.string,
    flex: PropTypes.bool,
    fullHeight: PropTypes.bool,
    hover: PropTypes.bool,
    href: PropTypes.string,
    innerRef: PropTypes.func,
    nodeRef: PropTypes.func,
    onBlur: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    seamless: PropTypes.bool,
    selector: PropTypes.string,
    textAlign: PropTypes.string,
    to: PropTypes.string,
  }
  static defaultProps = {
    flex: false,
    floating: false,
    fullHeight: false,
    hover: false,
    innerRef: noop,
    nodeRef: noop,
    onBlur: noop,
    onClick: noop,
    onFocus: noop,
    seamless: false,
    selector: 'div',
    textAlign: 'center',
  }
  static Container = Container

  render() {
    const { children, className, innerRef, textAlign, ...rest } = this.props

    const componentClassName = classNames(
      'c-FluffyCard',
      textAlign && `is-textAlign-${textAlign}`,
      className
    )

    return (
      <FluffyCardUI
        {...rest}
        borderless
        className={componentClassName}
        ref={innerRef}
      >
        {children}
      </FluffyCardUI>
    )
  }
}

export default FluffyCard
