import styled from '../styled'

export const config = {
  borderRadius: '4px',
}

export const ScrollableUI = styled('div')`
  box-sizing: border-box;
  display: flex;
  max-height: 100%;
  min-height: 0;
  position: relative;
  width: 100%;
`

export const ContentUI = styled('div')`
  box-sizing: border-box;
  max-height: 100%;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  width: 100%;
  will-change: scroll-position;
`

export const FaderUI = styled('div')`
  color: white;
  height: 28px;
  left: 0;
  position: absolute;
  right: 0;
  transform: scaleY(0);
  z-index: 1;

  &.is-rounded {
    border-top-left-radius: ${config.borderRadius};
    border-top-right-radius: ${config.borderRadius};
  }

  &.is-top {
    background: linear-gradient(
      to bottom,
      currentColor,
      rgba(255, 255, 255, 0)
    );
    transform-origin: top;
    top: 0;
  }
  &.is-bottom {
    background: linear-gradient(to top, currentColor, rgba(255, 255, 255, 0));
    bottom: 0;
    transform-origin: bottom;
  }
`
