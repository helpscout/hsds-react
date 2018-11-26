import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { COMPONENT_KEY } from './utils'
import { namespaceComponent } from '../../utilities/component'
import { HeadingUI, SecondaryHeadingUI } from './styles/Heading.css'

export interface Props {
  children?: any
  className?: string
  secondary?: boolean
}

class Heading extends React.PureComponent<Props> {
  static defaultProps = {
    secondary: false
  }

  render() {
    const { children, secondary, ...rest } = this.props

    return !secondary ? (
      <HeadingUI {...getValidProps(rest)}
        selector="h1"
        size="md"
        className="c-PageHeader__titleHeading">
        {children}
      </HeadingUI>
    ) : (
        <SecondaryHeadingUI {...getValidProps(rest)}
          selector="h2"
          size="h4"
          className="c-PageHeader__titleHeading">
          {children}
        </SecondaryHeadingUI>
      );
  }
}
namespaceComponent(COMPONENT_KEY.Heading)(Heading)

export default Heading