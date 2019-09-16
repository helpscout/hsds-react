import styled from 'styled-components'

export const config = {
  borderRadius: '4px',
}

interface ScrollableUIProps {
  fadeSides?: any
}

export const ScrollableUI = styled.div<ScrollableUIProps>`
  box-sizing: border-box;
  display: flex;
  max-height: 100%;
  height: ${props => (props.fadeSides ? '100%' : 'auto')};
  min-height: 0;
  position: relative;
  width: 100%;
`

interface ContentUIProps {
  fadeSides?: any
  fade?: any
  isScrollLocked?: boolean
}

export const ContentUI = styled.div<ContentUIProps>`
  box-sizing: border-box;
  max-height: 100%;
  min-height: 0;
  height: ${(props: any) => (props.fadeSides ? '100%' : 'auto')};
  overflow-x: ${(props: any) => (props.fadeSides ? 'auto' : 'hidden')};
  overflow-y: auto;
  overscroll-behavior-x: ${(props: any) =>
    props.isScrollLocked && props.fadeSides ? 'contain' : 'auto'};
  overscroll-behavior-y: ${(props: any) =>
    props.isScrollLocked && props.fade ? 'contain' : 'auto'};
  position: relative;
  width: 100%;
  will-change: scroll-position;
`

export const FaderUI = styled<any>('div')`
  color: white;
  height: ${(props: any) => (props.fadeSides ? '100%' : '28px')};
  width: ${(props: any) => (props.fadeSides ? '28px' : 'auto')};
  position: absolute;
  transform: scaleY(0);
  z-index: 1;
  pointer-events: none;

  &.is-rounded {
    border-top-left-radius: ${config.borderRadius};
    border-top-right-radius: ${config.borderRadius};
  }

  &.is-top {
    left: 0;
    right: 0;
    top: 0;
    background: linear-gradient(
      to bottom,
      currentColor,
      rgba(255, 255, 255, 0)
    );
    transform-origin: top;
  }

  &.is-bottom {
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, currentColor, rgba(255, 255, 255, 0));
    transform-origin: bottom;
  }

  &.is-left {
    top: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(to right, currentColor, rgba(255, 255, 255, 0));
    transform-origin: left;
  }

  &.is-right {
    top: 0;
    bottom: 0;
    left: calc(100% - 28px);
    background: linear-gradient(to left, currentColor, rgba(255, 255, 255, 0));
    transform-origin: right;
  }
`
