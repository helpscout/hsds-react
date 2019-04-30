import { propConnect } from '../PropProvider'
import Grid from './Grid'
import { COMPONENT_KEY } from './Grid.utils'

Grid.Container = propConnect(COMPONENT_KEY.Container)(Grid.Container)
Grid.Row = propConnect(COMPONENT_KEY.Row)(Grid.Row)
Grid.Col = propConnect(COMPONENT_KEY.Col)(Grid.Col)

export default propConnect(COMPONENT_KEY.Grid)(Grid)
