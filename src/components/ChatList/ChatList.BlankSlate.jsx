import React from 'react'
import PropTypes from 'prop-types'
import { getValidProps } from '@hsds/utils-react'
import Text from '../Text'
import classNames from 'classnames'
import {
  BlankSlateUI,
  SpeechBubbleIlloUI,
  ContentUI,
  ItemDividerUI,
} from './ChatList.css'

export const defaultMessage = "You're all caught-up"

class BlankSlate extends React.PureComponent {
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
        <ItemDividerUI className="c-ChatListItem__divider" />
      </BlankSlateUI>
    )
  }
}

BlankSlate.defaultProps = {
  'data-cy': 'ChatListBlankSlate',
}

BlankSlate.propTypes = {
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default BlankSlate
