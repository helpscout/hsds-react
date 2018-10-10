// @flow
import { propConnect } from '../PropProvider'
import Input from './Input'
import { COMPONENT_KEY } from './utils'

Input.AddOn = propConnect(COMPONENT_KEY.AddOn)(Input.AddOn)
Input.Prefix = propConnect(COMPONENT_KEY.Prefix)(Input.Prefix)
Input.Static = propConnect(COMPONENT_KEY.Static)(Input.Static)
Input.Suffix = propConnect(COMPONENT_KEY.Suffix)(Input.Suffix)

export default propConnect(COMPONENT_KEY.Input)(Input)
