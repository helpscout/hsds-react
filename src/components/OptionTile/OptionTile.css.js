import FluffyCard from '../FluffyCard'
import styled from 'styled-components'

export const config = {
  headerOffset: 10,
  headerTransition: 'transform 220ms ease-out',
  headerHoverTransform: 'translateY(-3px)',
  iconSize: 44,
  titleOffset: 3,
}

export const OptionTileUI = styled(FluffyCard)`
  margin-top: calc(${config.iconSize}px / 2);
  position: relative;

  & > *:first-child {
    border-top-left-radius: initial;
    border-top-right-radius: initial;
  }
  & > *:last-child {
    border-bottom-left-radius: initial;
    border-bottom-right-radius: initial;
  }

  &:hover {
    .c-OptionTile__header {
      transform: ${config.headerHoverTransform};
    }
  }
`

export const HeaderUI = styled('div')`
  left: 0;
  position: absolute;
  right: 0;
  top: calc((${config.iconSize}px / 2) * -1);
  transform: translateY(0);
  transition: ${config.headerTransition};
`

export const CenteredContentUI = styled('div')`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ContentUI = styled('div')`
  padding-top: ${config.headerOffset}px;
`

export const TitleUI = styled('div')`
  margin-bottom: ${config.titleOffset}px;
`

export default OptionTileUI
