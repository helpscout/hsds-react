import styled from 'styled-components'
import { generateBreakPoint } from '@hsds/utils-mixins'
import { pageBreakpointsConfig } from '../Page/Page.config'
import { getColor } from '@hsds/utils-color'

export const config = {
  operatorHeight: '56px',
  operatorAddHeight: '52px',
}

export const ConditionListUI = styled('div')`
  position: relative;

  &::before {
    background: ${getColor('border.ui')};
    bottom: 0;
    content: '';
    height: 100%;
    left: 50%;
    margin-left: -0.5px;
    position: absolute;
    top: 0;
    width: 1px;
  }

  > * {
    position: relative;
  }

  &.is-withOffset {
    margin-left: -10px;
    margin-right: -10px;
    width: calc(100% + 20px);

    ${generateBreakPoint(
      pageBreakpointsConfig.breakpoint.widescreen,
      `
      margin-left: -60px;
      margin-right: -60px;
      width: calc(100% + 120px);
    `
    )};
  }
`

export const AndWrapperUI = styled('div')`
  align-items: center;
  display: flex;
  justify-content: center;
  height: ${config.operatorHeight};
`

export const AddButtonWrapperUI = styled('div')`
  align-items: flex-end;
  display: flex;
  justify-content: center;
  height: ${config.operatorAddHeight};
`
