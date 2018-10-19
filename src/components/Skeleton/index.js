// @flow
import { propConnect } from '../PropProvider'
import { COMPONENT_KEY } from './utils'

import Avatar from './Avatar'
import Block from './Block'
import Control from './Control'
import Heading from './Heading'
import Image from './Image'
import Paragraph from './Paragraph'
import Text from './Text'

const Skeleton = {}

Skeleton.Avatar = propConnect(COMPONENT_KEY.Avatar)(Avatar)
Skeleton.Block = propConnect(COMPONENT_KEY.Block)(Block)
Skeleton.Control = propConnect(COMPONENT_KEY.Control)(Control)
Skeleton.Heading = propConnect(COMPONENT_KEY.Heading)(Heading)
Skeleton.Image = propConnect(COMPONENT_KEY.Image)(Image)
Skeleton.Paragraph = propConnect(COMPONENT_KEY.Paragraph)(Paragraph)
Skeleton.Text = propConnect(COMPONENT_KEY.Text)(Text)

export default Skeleton
