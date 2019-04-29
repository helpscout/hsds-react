import { propConnect } from '../PropProvider/index'
import FluffyCard from './FluffyCard'

FluffyCard.Container = propConnect('FluffyCardContainer')(FluffyCard.Container)

export default propConnect('FluffyCard')(FluffyCard)
