import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { FluffyCardContainerUI } from './FluffyCard.css'

type Props = {
  children?: any
  className?: string
}

class Container extends React.PureComponent<Props> {
  static displayName = 'FluffyCardContainer'

  render() {
    const { children, className, ...rest } = this.props

    const componentClassName = classNames('c-FluffyCardContainer', className)

    return (
      <FluffyCardContainerUI
        {...getValidProps(rest)}
        className={componentClassName}
      >
        {children}
      </FluffyCardContainerUI>
    )
  }
}

export default Container
