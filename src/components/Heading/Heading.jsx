import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { HeadingUI } from './Heading.css'

class Heading extends React.PureComponent {
  render() {
    const {
      center,
      children,
      className,
      disableSelect,
      light,
      lineHeightInherit,
      lineHeightReset,
      linkStyle,
      noWrap,
      selector,
      size,
      truncate,
      weight,
      wordWrap,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-Heading',
      center && 'is-center',
      disableSelect && 'is-disableSelect',
      light && 'is-light',
      lineHeightInherit && 'is-lineHeightInherit',
      lineHeightReset && 'is-lineHeightReset',
      linkStyle && 'is-linkStyle',
      size && `is-${size}`,
      truncate && 'is-truncate',
      weight && `is-${weight}`,
      noWrap && 'is-noWrap',
      wordWrap && 'is-wordWrap',
      className
    )

    const selectorTag = selector || 'div'

    return (
      <HeadingUI
        as={selectorTag}
        {...getValidProps(rest)}
        className={componentClassName}
      >
        {children}
      </HeadingUI>
    )
  }
}

Heading.propTypes = {
  center: PropTypes.bool,
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  disableSelect: PropTypes.bool,
  light: PropTypes.bool,
  lineHeightInherit: PropTypes.bool,
  lineHeightReset: PropTypes.bool,
  linkStyle: PropTypes.bool,
  noWrap: PropTypes.bool,
  selector: PropTypes.string,
  size: PropTypes.oneOf([
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'big',
    'md',
    'small',
    '',
  ]),
  truncate: PropTypes.bool,
  weight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  wordWrap: PropTypes.bool,
}

Heading.defaultProps = {
  center: false,
  'data-cy': 'Heading',
  disableSelect: false,
  lineHeightInherit: false,
  lineHeightReset: false,
  linkStyle: false,
  truncate: false,
  noWrap: false,
  wordWrap: false,
}

export default Heading
