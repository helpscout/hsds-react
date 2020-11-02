import styled from 'styled-components'
import { d200, d200Effect } from '../../styles/mixins/depth.css'
import Card from '../Card'

export const FluffyCardContainerUI = styled('div')`
  display: flex;
`

export const FluffyCardUI = styled(Card)`
  ${d200}
  border-radius: 4px;
  flex: 1;
  max-width: 100%;
  min-width: 0;
  padding: 20px 15px;
  transform: translateY(0);
  border: 0;

  & + & {
    margin-left: 10px;
  }

  &.is-hoverable {
    ${d200}
    color: currentColor;
    text-decoration: none;

    &:hover {
      ${d200Effect}
      text-decoration: none;
    }
  }

  &.is-textAlign {
    &-left {
      text-align: left;
    }
    &-center {
      text-align: center;
    }
    &-right {
      text-align: right;
    }
  }
`

export default FluffyCardUI
