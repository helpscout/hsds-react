import styled from 'styled-components'
import { BEM } from '@hsds/utils-bem'
import { getColor } from '@hsds/utils-color'
import { d700 } from '@hsds/utils-mixins'
import Animate from '../Animate'
import Card from '../Card'
import Toolbar from '../Toolbar'

const modalBodyBEM = BEM('.c-ModalBody')

export const modalConfig = {
  closeOffset: '10px',
  offset: '8px',
  wrapperMaxHeight: '98%',
  wrapperMaxWidth: '75%',
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

  &.v2.is-danger {
    .c-Icon {
      color: ${getColor('red.500')};
    }
  }

  &.v2.is-branded,
  &.v2.is-sequence {
    .c-ModalBody {
      text-align: center;
      ${modalBodyBEM.element('scrollableContent')} {
        padding-top: 0px;
      }
    }
  }

  &.v2.is-alert {
    .c-ModalBody {
      text-align: center;
    }
  }
`

export const InnerWrapperUI = styled('div')`
  display: flex;
  justify-content: center;
  max-height: ${modalConfig.wrapperMaxHeight};
  max-width: ${modalConfig.wrapperMaxWidth};
  min-height: 0;
  position: relative;
  width: auto;
  z-index: 1;

  ${props => makeHSAppInnerWrapperStyles(props)};

  &.v2 {
    position: absolute;
    top: 50px;
    max-width: 680px;
    min-height: 400px;
    max-height: 90%;

    * {
      box-sizing: border-box;
    }

    &.is-default {
      width: 680px;
    }

    &.is-alert {
      min-height: 180px;
      width: 440px;
      max-width: 440px;
      top: auto;
    }
  }
`

export const AnimatedCardContainerUI = styled(Animate)`
  display: flex;
  max-width: 100%;
  min-height: 0;
`

export const CardUI = styled(Card)`
  ${d700}
  border: none;
  display: flex;
  flex-direction: column;
  min-height: 0;
  outline: none;
  overflow: hidden;

  &.v2.is-default {
    width: 680px;
  }

  &.v2.is-alert {
    min-width: 440px;
    padding-bottom: 40px;
    top: auto;
  }
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

  &.v2 {
    padding: 0px;

    ${modalBodyBEM.element('scrollableContent')} {
      padding: 40px 90px 50px;

      p:first-child {
        margin-top: 0px;
      }
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
