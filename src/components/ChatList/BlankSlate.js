// @flow
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Hr from '../Hr'
import Illo from '../Illo'
import Text from '../Text'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './utils'
import {
  BlankSlateUI,
  IlloWrapperUI,
  ContentUI,
} from './styles/BlankSlate.css.js'

type Props = {
  className?: string,
  children?: any,
  illoName: string,
}

export const defaultMessage = "You're all caught-up"

class BlankSlate extends Component<Props> {
  static defaultProps = {
    illoName: 'chatListBlankSlate',
  }

  render() {
    const { className, children, illoName, ...rest } = this.props

    const componentClassName = classNames('c-ChatListBlankSlate', className)

    const message = children || defaultMessage

    const illoMarkup = illoName ? (
      <IlloWrapperUI className="c-ChatListBlankSlate__illo">
        <Illo name={illoName} size="80" />
      </IlloWrapperUI>
    ) : null

    return (
      <BlankSlateUI {...getValidProps(rest)} className={componentClassName}>
        <ContentUI className="c-ChatListBlankSlate__content">
          {illoMarkup}
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
