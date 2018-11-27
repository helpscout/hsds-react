import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { COMPONENT_KEY } from './utils'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { HeadingUI, SecondaryHeadingUI } from './styles/Heading.css'

export interface Props {
  children?: any
  className?: string
  secondary?: boolean
}

class Heading extends React.PureComponent<Props> {
  static defaultProps = {
    secondary: false,
  }

  render() {
    const { children, secondary, className, ...rest } = this.props

    const componentClassName = classNames(
      'c-PageHeader__titleHeading',
      secondary && 'c-PageHeader__titleHeading--secondary',
      className
    )

    return !secondary ? (
      <HeadingUI
        {...getValidProps(rest)}
        selector="h1"
        size="md"
        className={componentClassName}
      >
        {children}
      </HeadingUI>
    ) : (
      <SecondaryHeadingUI
        {...getValidProps(rest)}
        selector="h2"
        size="h4"
        className={componentClassName}
      >
        {children}
      </SecondaryHeadingUI>
    )
  }
}
namespaceComponent(COMPONENT_KEY.Heading)(Heading)

export default Heading
