import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'

export const KeyboardBadgeUI = styled.div`
  font-size: 11px;
  font-family: var(--HSDSGlobalFontFamilyMono);
  background-color: ${getColor('charcoal.400')};
  border-radius: 3px;
  box-sizing: border-box;
  border: none;
  color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  min-width: 19px;
  line-height: 1;
  height: 19px;
  padding: 0 6px;

  & + & {
    margin-left: 8px;
  }
`
