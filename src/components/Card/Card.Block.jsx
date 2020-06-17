import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Scrollable from '../Scrollable'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { BlockUI } from './Card.css'

class Block extends React.PureComponent {
  render() {
    const {
      bgMuted,
      className,
      children,
      onScroll,
      scrollable,
      scrollableRef,
      flex,
      size,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-Card__block',
      bgMuted && 'is-bg-muted',
      flex && 'is-flex',
      scrollable && 'is-scrollable',
      size && `is-${size}`,
      className
    )

    const scrollableClassName = classNames(
      'c-Card__block',
      bgMuted && 'is-bg-muted',
      flex && 'is-flex',
      scrollable && 'is-scrollableWrapper',
      className
    )

    const contentMarkup = (
      <BlockUI {...getValidProps(rest)} className={componentClassName}>
        {children}
      </BlockUI>
    )

    const componentMarkup = scrollable ? (
      <Scrollable
        className={scrollableClassName}
        onScroll={onScroll}
        scrollableRef={scrollableRef}
      >
        {contentMarkup}
      </Scrollable>
    ) : (
      contentMarkup
    )

    return componentMarkup
  }
}

Block.propTypes = {
  bgMuted: PropTypes.bool,
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  flex: PropTypes.bool,
  scrollable: PropTypes.bool,
  scrollableRef: PropTypes.func,
  onScroll: PropTypes.func,
  size: PropTypes.string,
}

Block.defaultProps = {
  'data-cy': 'Block',
  onScroll: noop,
  scrollableRef: noop,
}

export default Block
