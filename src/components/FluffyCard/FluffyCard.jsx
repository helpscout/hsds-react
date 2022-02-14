import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import FluffyCardContainer from './FluffyCard.Container'
import { FluffyCardUI } from './FluffyCard.css'

function noop() {}

class FluffyCard extends React.PureComponent {
  static Container = FluffyCardContainer

  render() {
    const { children, className, innerRef, textAlign, ...rest } = this.props

    const componentClassName = classNames(
      'c-FluffyCard',
      textAlign && `is-textAlign-${textAlign}`,
      className
    )

    return (
      <FluffyCardUI {...rest} className={componentClassName} ref={innerRef}>
        {children}
      </FluffyCardUI>
    )
  }
}

FluffyCard.defaultProps = {
  'data-cy': 'FluffyCard',
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

FluffyCard.propTypes = {
  autoWordWrap: PropTypes.bool,
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
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
  /** Adjusts the alignment of text within the component. `left`/`center`/`right` */
  textAlign: PropTypes.string,
  to: PropTypes.string,
}

export default FluffyCard
