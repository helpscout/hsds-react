import * as React from 'react'
import Text from '../Text'
import { Props as TextProps } from '../Text/Text'

import { COMPONENT_KEY } from './Samp.utils'

export interface Props extends TextProps {}

class Samp extends React.PureComponent<Props> {
  render() {
    return <Text {...this.props} selector="samp" />
  }
}

export default Samp
