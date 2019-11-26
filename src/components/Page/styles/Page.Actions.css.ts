import { getColor } from '../../../styles/utilities/color'
import styled from 'styled-components'
import { config as pageConfig } from './Page.css'

export const config = {
  marginBottom: 100,
  marginTop: 30,
  spacing: 10,
}
interface ActionsUIProps {
  withStickyWrapper?: any
  zIndex?: any
}

export const ActionsUI = styled('div')<ActionsUIProps>`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  margin-left: -${config.spacing}px;
  margin-right: -${config.spacing}px;
  margin-bottom: ${config.marginBottom}px;
  margin-top: ${config.marginTop}px;

  &.is-left {
    flex-direction: row;
  }

  &.is-right {
    flex-direction: row-reverse;
  }

  ${({ withStickyWrapper, zIndex }) =>
    withStickyWrapper &&
    `
    margin-top: 0;
    margin-bottom: 0;
    z-index: ${zIndex};
  `};
`

export const ActionsItemUI = styled('div')`
  min-width: 0;
  margin: 0 ${config.spacing}px;
`

export const ActionsBlockUI = styled('div')`
  flex: 1;
  max-width: 100%;
  min-width: 0;
`

export const StickyActionsWrapperUI = styled('div')<{ zIndex: any }>`
  
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  padding: 10px;
  border-top: 1px solid ${getColor('border')};
  box-shadow: 0 -3px 0 rgba(0, 0, 0, 0.03);

  ${({ zIndex }) =>
    `
    z-index: ${zIndex};
  `};

  /**
   * Fixes for Firefox. The IntersectionObserver stops working as expected
   * when horizontal scrolling occurs. In this scenario, we'll hide the
   * sticky actions.
   */
  @media (max-width: ${parseInt(pageConfig.minWidth, 10) + 1}px) {
    @-moz-document url-prefix() {
      display: none;
    }
  }
}
`

export default ActionsUI
