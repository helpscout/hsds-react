// @flow
import styled from '../../styled'
import { isHSApp } from '../../../styles/utilities/theme'
import Animate from '../../Animate'
import Card from '../../Card'

export const config = {
  closeOffset: '10px',
  offset: '8px',
  wrapperMaxHeight: '98%',
  theme: {
    app: {
      cardBoxShadow: `
        0 2px 3px rgba(42, 59, 71, 0.2),
        0 10px 40px rgba(42, 59, 71, 0.3)
      `,
      marginTop: '50px',
      marginBottom: '30px',
      maxWidth: '560px',
    },
  },
}

export const ModalUI = styled('div')`
  align-items: center;
  bottom: 0;
  display: flex;
  justify-content: center;
  min-height: 0;
  left: 0;
  padding: ${config.offset};
  position: fixed;
  right: 0;
  top: 0;
`

export const InnerWrapperUI = styled('div')`
  display: flex;
  justify-content: center;
  max-height: ${config.wrapperMaxHeight};
  max-width: 100%;
  min-height: 0;
  position: relative;
  width: auto;
  z-index: 1;

  ${props => makeHSAppInnerWrapperStyles(props)};
`

export const AnimatedCardContainerUI = styled(Animate)`
  display: flex;
  max-width: 100%;
  min-height: 0;
`

export const CardUI = styled(Card)`
  display: flex;
  flex-direction: column;
  min-height: 0;
  outline: none;

  ${props => makeHSAppCardStyles(props)};
`

export const CloseUI = styled('div')`
  position: absolute;
  right: ${config.closeOffset};
  top: ${config.closeOffset};
  transform: translateZ(0);
  z-index: 3;
`

function makeHSAppInnerWrapperStyles(props: Object): string {
  if (!isHSApp(props)) return ''

  return `
    margin-bottom: ${config.theme.app.marginBottom};
    margin-top: ${config.theme.app.marginTop};
    max-height: calc(
      ${config.wrapperMaxHeight} -
      ${config.theme.app.marginTop} -
      ${config.theme.app.marginBottom}
    );
    max-width: ${config.theme.app.maxWidth};
  `
}

function makeHSAppCardStyles(props: Object): string {
  if (!isHSApp(props)) return ''

  return `
    border: none;
    box-shadow: ${config.theme.app.cardBoxShadow};
    overflow: hidden;
  `
}

export default ModalUI
