import * as React from 'react'
import { UISize } from '../../constants/types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Scrollable from '../Scrollable'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { BlockUI } from './styles/Block.css'

type Props = {
  bgMuted: boolean
  children?: any
  className?: string
  flex?: boolean
  scrollable: boolean
  scrollableRef: () => void
  onScroll: () => void
  size?: UISize
}

class Block extends React.PureComponent<Props> {
  static defaultProps = {
    onScroll: noop,
    scrollableRef: noop,
  }

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

export default Block
