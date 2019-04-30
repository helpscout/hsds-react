import { propConnect } from '../PropProvider'
import { COMPONENT_KEY } from './Skeleton.utils'

import Avatar from './Skeleton.Avatar'
import Block from './Skeleton.Block'
import Control from './Skeleton.Control'
import Heading from './Skeleton.Heading'
import Image from './Skeleton.Image'
import Paragraph from './Skeleton.Paragraph'
import Text from './Skeleton.Text'

const Skeleton = {
  Avatar: propConnect(COMPONENT_KEY.Avatar)(Avatar),
  Block: propConnect(COMPONENT_KEY.Block)(Block),
  Control: propConnect(COMPONENT_KEY.Control)(Control),
  Heading: propConnect(COMPONENT_KEY.Heading)(Heading),
  Image: propConnect(COMPONENT_KEY.Image)(Image),
  Paragraph: propConnect(COMPONENT_KEY.Paragraph)(Paragraph),
  Text: propConnect(COMPONENT_KEY.Text)(Text),
}

export default Skeleton
