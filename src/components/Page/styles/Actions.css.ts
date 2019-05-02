import baseStyles from '../../../styles/resets/baseStyles.css.js'
import styled from '../../styled'

export const config = {
  marginBottom: 100,
  marginTop: 30,
  spacing: 10,
}

export const ActionsUI = styled('div')`
  ${baseStyles};
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

  ${({ withStickyWrapper }) =>
    withStickyWrapper &&
    `
    margin-top: 0;
    margin-bottom: 0;
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

export const StickyActionsWrapperUI = styled('div')`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`

export default ActionsUI
