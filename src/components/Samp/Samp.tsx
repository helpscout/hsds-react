import * as React from 'react'
import Text from '../Text'
import { Props as TextProps } from '../Text/Text'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './utils'

export interface Props extends TextProps {}

class Samp extends React.PureComponent<Props> {
  render() {
    return <Text {...this.props} selector="samp" />
  }
}

namespaceComponent(COMPONENT_KEY)(Samp)

export default Samp
