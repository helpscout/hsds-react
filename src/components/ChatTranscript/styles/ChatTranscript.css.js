import styled from 'styled-components'
import { getColor } from '../../../styles/utilities/color'
import linkStyles from '../../../styles/mixins/linkStyles.css'
import Text from '../../Text'
import AttachmentList from '../../AttachmentList'

export const ItemContentWrapperUI = styled.div`
  position: relative;
`
export const ItemUI = styled.div`
  position: relative;
  margin-bottom: 20px;

  &.is-note {
    padding-top: 2px;

    &:before {
      background-color: ${getColor('yellow.500')};
      border-radius: 9999px;
      content: '';
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 3px;
    }

    ${ItemContentWrapperUI} {
      margin-left: 13px;
    }
  }
`
export const ItemHeaderUI = styled.div`
  margin-bottom: 5px;
`
export const ItemContentUI = styled.div`
  font-size: 14px;

  a {
    ${linkStyles()};
  }
`
export const ItemCreatedAtUI = styled(Text)`
  color: ${getColor('grey.800')};
`
export const ItemPrivateNoteUI = styled(Text)`
  color: ${getColor('grey.800')};
`
export const ItemAttachmentListUI = styled(AttachmentList)`
  margin-top: 10px;
`

export const LineItemUI = styled.div`
  color: ${getColor('grey.800')};
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 25px;
  margin-top: 25px;
  text-align: left;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`
