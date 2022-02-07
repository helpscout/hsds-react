import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Scrollable from '../Scrollable'
import classNames from 'classnames'
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

Block.defaultProps = {
  'data-cy': 'Block',
  onScroll: () => undefined,
  scrollableRef: () => undefined,
}

Block.propTypes = {
  /** Applies a muted background to the component. */
  bgMuted: PropTypes.bool,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Adds flexbox styles to the component. */
  flex: PropTypes.bool,
  /** Callback function when inner Scrollable is scrolled. */
  onScroll: PropTypes.func,
  /** Integrates `Scrollable` into the component. */
  scrollable: PropTypes.bool,
  /** Retrieves the scrollable node. */
  scrollableRef: PropTypes.func,
  /** Adjusts the size of the component. */
  size: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default Block
