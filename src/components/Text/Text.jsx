import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { TextUI } from './Text.css'

class Text extends React.PureComponent {
  static defaultProps = {
    center: false,
    disableSelect: false,
    isPlainLink: false,
    linkStyle: false,
    noUnderline: false,
    selector: 'span',
    size: '13',
    state: 'default',
    truncate: false,
  }

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

Text.propTypes = {
  allCaps: PropTypes.bool,
  block: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.string,
  center: PropTypes.bool,
  disableSelect: PropTypes.bool,
  faint: PropTypes.bool,
  isPlainLink: PropTypes.bool,
  lineHeightReset: PropTypes.bool,
  lineHeightInherit: PropTypes.bool,
  linkStyle: PropTypes.bool,
  muted: PropTypes.bool,
  noUnderline: PropTypes.bool,
  noWrap: PropTypes.bool,
  selector: PropTypes.string,
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
  state: PropTypes.oneOf(['default', 'error', 'success', 'warning', '', null]),
  subtle: PropTypes.bool,
  truncate: PropTypes.bool,
  weight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  wordWrap: PropTypes.bool,
}

export default Text
