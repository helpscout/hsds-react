import { propConnect } from '../PropProvider'
import Flexy from './Flexy'
import { COMPONENT_KEY } from './utils'

Flexy.Block = propConnect(COMPONENT_KEY.Block)(Flexy.Block)
Flexy.Item = propConnect(COMPONENT_KEY.Item)(Flexy.Item)

export default propConnect(COMPONENT_KEY.Flexy)(Flexy)
