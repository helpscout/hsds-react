import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { TextUI } from './Text.css'

class Text extends React.PureComponent {
  render() {
    const {
      allCaps,
      block,
      children,
      className,
      center,
      disableSelect,
      faint,
      isPlainLink,
      lineHeightInherit,
      lineHeightReset,
      linkStyle,
      muted,
      noUnderline,
      noWrap,
      selector,
      shade,
      size,
      state,
      subtle,
      truncate,
      weight,
      wordWrap,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-Text',
      allCaps && 'is-all-caps',
      block && 'is-block',
      center && 'is-center',
      disableSelect && 'is-disableSelect',
      faint && 'is-faint is-shade-faint',
      isPlainLink && 'is-plainLink',
      muted && 'is-muted is-shade-muted',
      noUnderline && 'is-noUnderline',
      noWrap && 'is-no-wrap',
      lineHeightInherit && 'is-lineHeightInherit',
      lineHeightReset && 'is-lineHeightReset',
      linkStyle && 'is-linkStyle',
      selector && `is-${selector}`,
      shade && `is-shade-${shade}`,
      size && `is-${size}`,
      state && `is-${state}`,
      subtle && 'is-subtle is-shade-subtle',
      truncate && 'is-truncate',
      weight && `is-${weight}`,
      wordWrap && 'is-wordWrap',
      className
    )

    return (
      <TextUI
        as={selector}
        {...getValidProps(rest)}
        className={componentClassName}
      >
        {children}
      </TextUI>
    )
  }
}

Text.defaultProps = {
  center: false,
  'data-cy': 'Text',
  disableSelect: false,
  isPlainLink: false,
  linkStyle: false,
  noUnderline: false,
  selector: 'span',
  size: '13',
  state: 'default',
  truncate: false,
}

Text.propTypes = {
  allCaps: PropTypes.bool,
  block: PropTypes.bool,
  children: PropTypes.any,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  isPlainLink: PropTypes.bool,
  noUnderline: PropTypes.bool,
  selector: PropTypes.string,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Center aligns text. */
  center: PropTypes.bool,
  /** Disables text selection. */
  disableSelect: PropTypes.bool,
  /** Changes text color to a very light grey. */
  faint: PropTypes.bool,
  /** Applies [Link](../Link) styles. */
  linkStyle: PropTypes.bool,
  /** Inherit the line-height from a parent selector. */
  lineHeightInherit: PropTypes.bool,
  /** Resets the line-height to `1`. */
  lineHeightReset: PropTypes.bool,
  /** Changes text color to a light grey. */
  muted: PropTypes.bool,
  /** Prevents text from wrapping. */
  noWrap: PropTypes.bool,
  /** Changes text color shade. */
  shade: PropTypes.oneOf([
    'default',
    'subtle',
    'slightlyMuted',
    'muted',
    'faint',
    'extraMuted',
    '',
    null,
  ]),
  /** Adjust text size. */
  size: PropTypes.oneOf([
    '10',
    10,
    '11',
    11,
    '12',
    12,
    '13',
    13,
    '14',
    14,
    '15',
    15,
    '20',
    20,
    '48',
    48,
  ]),
  /** Changes the text color based on state. */
  state: PropTypes.oneOf(['default', 'error', 'success', 'warning', '', null]),
  /** Changes text color to a lighter grey. */
  subtle: PropTypes.bool,
  /** Enables CSS truncation for text. */
  truncate: PropTypes.bool,
  /** Adjust text weight. */
  weight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Enables CSS `word-break` for text. */
  wordWrap: PropTypes.bool,
}

export default Text
