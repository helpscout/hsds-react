import styled from 'styled-components'

export const config = {
  backgroundColor: 'rgba(57, 73, 86, 0.15)',
  theme: {
    app: {
      backgroundColor: 'rgba(25, 76, 110, 0.7)',
    },
    dark: {
      backgroundColor: '#034077',
    },
  },
}

export const OverlayUI = styled('div')`
  align-items: center;
  background-color: ${config.backgroundColor};
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;

  &.is-fixed {
    position: fixed;
  }

  &.is-transparent {
    cursor: default;
    opacity: 0;
  }

  ${props => makeHSAppStyles(props)};

  &.is-dark {
    background-color: ${config.theme.dark.backgroundColor};
    opacity: 0.7;
  }
`

function makeHSAppStyles(props) {
  if (!props.isHsApp) return ''

  return `
    background-color: ${config.theme.app.backgroundColor};
  `
}

export default OverlayUI
