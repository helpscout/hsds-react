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

Heading.propTypes = {
  /** Center aligns text. */
  center: PropTypes.bool,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Disables text selection. */
  disableSelect: PropTypes.bool,
  /** Lightens the heading color. */
  light: PropTypes.bool,
  /** Inherit the line-height from a parent selector. */
  lineHeightInherit: PropTypes.bool,
  /** Resets the line-height to `1`. */
  lineHeightReset: PropTypes.bool,
  /** Applies `Link` styles. */
  linkStyle: PropTypes.bool,
  /** Prevents text from wrapping. */
  noWrap: PropTypes.bool,
  /** Sets HTML element. */
  selector: PropTypes.string,
  /** Adjust heading size. */
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
  /** Enables CSS truncation for text. */
  truncate: PropTypes.bool,
  /** Adjust text weight. */
  weight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Enables CSS `word-break` for text. */
  wordWrap: PropTypes.bool,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default Heading
