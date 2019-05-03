// @flow
import { propConnect } from '../PropProvider/index'
import ControlGroup from './ControlGroup'

ControlGroup.Block = propConnect('ControlGroupBlock')(ControlGroup.Block)
ControlGroup.Item = propConnect('ControlGroupItem')(ControlGroup.Item)

export default propConnect('ControlGroup')(ControlGroup)
