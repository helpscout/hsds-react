import { propConnect } from '../PropProvider'
import FluffyCard from './FluffyCard'

FluffyCard.Container = propConnect('FluffyCardContainer')(FluffyCard.Container)

export default propConnect('FluffyCard')(FluffyCard)
