import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Hr from '../Hr'
import Text from '../Text'
import { classNames } from '../../utilities/classNames'

import { BlankSlateUI, SpeechBubbleIlloUI, ContentUI } from './ChatList.css'

export const defaultMessage = "You're all caught-up"

class BlankSlate extends React.PureComponent {
  static displayName = 'ChatListBlankSlate'

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

BlankSlate.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
}

export default BlankSlate
