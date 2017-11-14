import React from 'react'
import { storiesOf } from '@storybook/react'
import { AvatarList, Avatar, ChatInbox } from '../../src/index.js'
import AvatarSpec from '../Avatar/specs/Avatar'

const avatars = AvatarSpec.generate(8)

const stories = storiesOf('ChatInbox', module)

stories.add('default', () => (
  <div style={{width: 300}}>
    <ChatInbox>
      <ChatInbox.Header
        avatars={<AvatarList avatars={avatars} max={3} />}
        count={3}
      >
        Chats
      </ChatInbox.Header>
      <ChatInbox.Content>
        Content
      </ChatInbox.Content>
    </ChatInbox>
  </div>
))
