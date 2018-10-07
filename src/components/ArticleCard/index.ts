import { propConnect } from '../PropProvider/index'
import ArticleCard from './ArticleCard'
import { COMPONENT_KEY } from './utils'

export default propConnect(COMPONENT_KEY)(ArticleCard)
