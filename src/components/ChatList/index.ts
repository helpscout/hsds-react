import { propConnect } from '../PropProvider'
import ChatList from './ChatList'

ChatList.BlankSlate = propConnect('ChatListBlankSlate')(ChatList.BlankSlate)
ChatList.Item = propConnect('ChatListItem')(ChatList.Item)

export default propConnect('ChatList')(ChatList)
