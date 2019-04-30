import { propConnect } from '../PropProvider/index'
import Timeline from './Timeline'

// Sub-components
Timeline.Item = propConnect('TimelineItem')(Timeline.Item)

export default propConnect('Timeline')(Timeline)
