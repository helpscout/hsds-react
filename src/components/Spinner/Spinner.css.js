import styled from 'styled-components'

export const config = {
  defaultSize: 16,
  shades: {
    extraMuted: '0.3',
    faint: '0.4',
    muted: '0.5',
    slightlyMuted: '0.6',
    subtle: '0.7',
  },
}

export const SpinnerUI = styled('div')(props => {
  const { spinnerSize } = props

  return `
    
    display: block;
    width: ${spinnerSize}px;
    height: ${spinnerSize}px;
  `
})

export const SpinnerSVGUI = styled('svg')(props => {
  const { speed, spinnerSize } = props

  return `
    
    animation: SpinnerUIAnimation ${speed}ms linear infinite;
    display: block;
    width: ${spinnerSize}px;
    height: ${spinnerSize}px;
    x: 0px;
    y: 0px;
    will-change: transform;

    @keyframes SpinnerUIAnimation {
      100% {
        transform: rotate(360deg);
      }
    }
  `
})

export const SpinnerCircleUI = styled('circle')(props => {
  const { color, shade, isRounded, speed } = props

  const lineCap = isRounded ? 'round' : 'square'
  const opacity = config.shades[shade]

  return `
    
    animation: SpinnerCircleUIAnimation ${speed}ms ease-in-out infinite;
    display: block;
    fill: transparent;
    opacity: ${opacity};
    stroke: ${color};
    stroke-width: 3.6;
    stroke-linecap: ${lineCap};
    stroke-dasharray: 80px, 200px;
    stroke-dashoffset: 0px;
    will-change: transform, stroke-dashoffset;

    @keyframes SpinnerCircleUIAnimation {
      0% {
        stroke-dasharray: 1px, 200px;
        stroke-dashoffset: 0px;
        opacity: 0;
      }
      0.1% {
        opacity: 1;
      }
      50% {
        stroke-dasharray: 100px, 200px;
        stroke-dashoffset: -15px;
      }
      100% {
        stroke-dasharray: 100px, 200px;
        stroke-dashoffset: -125px;
      }
    }
  `
})
