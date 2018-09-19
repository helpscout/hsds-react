// @flow
import { propConnect } from '../PropProvider'
import Flexy from './Flexy'

Flexy.Block = propConnect('FlexyBlock')(Flexy.Block)
Flexy.Item = propConnect('FlexyItem')(Flexy.Item)

export default propConnect('Flexy')(Flexy)
