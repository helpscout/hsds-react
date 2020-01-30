import styled from 'styled-components'
import { BEM } from '../../utilities/classNames'
import Animate from '../Animate'
import Card from '../Card'
import Toolbar from '../Toolbar'

const modalBodyBEM = BEM('.c-ModalBody')

export const modalConfig = {
  closeOffset: '10px',
  offset: '8px',
  wrapperMaxHeight: '98%',
  theme: {
    app: {
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
  padding: ${modalConfig.offset};
  position: fixed;
  right: 0;
  top: 0;
  font-family: var(--HSDSGlobalFontFamily);
  font-size: var(--HSDSGlobalFontSize);
`

export const InnerWrapperUI = styled('div')`
  display: flex;
  justify-content: center;
  max-height: ${modalConfig.wrapperMaxHeight};
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
  border: none;
  box-shadow: rgba(42, 59, 71, 0.1) 0px 1px 1px,
    rgba(42, 59, 71, 0.25) 0px 10px 30px;
  display: flex;
  flex-direction: column;
  min-height: 0;
  outline: none;
  overflow: hidden;
`

export const CloseUI = styled('div')`
  position: absolute;
  right: ${modalConfig.closeOffset};
  top: ${modalConfig.closeOffset};
  transform: translateZ(0);
  z-index: 3;
`

function makeHSAppInnerWrapperStyles(props) {
  if (!props.isHsApp) return ''

  return `
    margin-bottom: ${modalConfig.theme.app.marginBottom};
    margin-top: ${modalConfig.theme.app.marginTop};
    max-height: calc(
      ${modalConfig.wrapperMaxHeight} -
      ${modalConfig.theme.app.marginTop} -
      ${modalConfig.theme.app.marginBottom}
    );
    max-width: ${modalConfig.theme.app.maxWidth};
  `
}

export const HeaderUI = styled(Toolbar)`
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`

export const BodyUI = styled('div')`
  display: flex;
  flex: 1 1 auto;
  height: 100%;
  max-width: 100%;
  min-height: 0;

  &.is-not-scrollable {
    padding: 20px;
  }

  ${modalBodyBEM.element('scrollableContent')} {
    padding: 20px;
  }

  &.is-seamless {
    ${modalBodyBEM.element('scrollableContent')} {
      padding: 0;
    }
  }
`

export const ContentUI = styled('div')`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  min-height: 0;
`

export const FooterUI = styled(Toolbar)`
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`
