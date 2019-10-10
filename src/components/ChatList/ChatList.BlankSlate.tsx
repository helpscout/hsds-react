import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Hr from '../Hr'
import Text from '../Text'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './ChatList.utils'
import {
  BlankSlateUI,
  SpeechBubbleIlloUI,
  ContentUI,
} from './styles/BlankSlate.css'

type Props = {
  className?: string
  children?: any
}

export const defaultMessage = "You're all caught-up"

class BlankSlate extends React.PureComponent<Props> {
  render() {
    const { className, children, ...rest } = this.props

    const componentClassName = classNames('c-ChatListBlankSlate', className)

    const message = children || defaultMessage

    return (
      <BlankSlateUI {...getValidProps(rest)} className={componentClassName}>
        <ContentUI className="c-ChatListBlankSlate__content">
          <SpeechBubbleIlloUI size={54} />
          <br />
          <Text faint size="13">
            {message}
          </Text>
        </ContentUI>
        <Hr className="c-ChatListItem__divider" size="none" />
      </BlankSlateUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY.BlankSlate)(BlankSlate)

export default BlankSlate
