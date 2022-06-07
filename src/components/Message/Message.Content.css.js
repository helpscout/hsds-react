import styled from 'styled-components'
import ChatBlock from './Message.ChatBlock'

import { BEM } from '@hsds/utils-bem'

const messageContentBem = BEM('.c-MessageContent')

export const ContentUI = styled(ChatBlock)`
  ${messageContentBem.element('content')} {
    max-width: 500px;
    text-align: left;

    &.is-rtl {
      direction: rtl;
      text-align: right;
    }
  }
`
