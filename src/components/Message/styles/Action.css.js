import styled from 'styled-components'
import baseStyles from '../../../styles/resets/baseStyles.css'
import linkStyles from '../../../styles/mixins/linkStyles.css'

export const ActionChatBlockUI = styled.div`
  padding-bottom: 4px;
  padding-top: 4px;

  a {
    ${linkStyles()};
  }
`
