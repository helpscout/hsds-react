// @flow
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import FluffyCard from '../../FluffyCard'
import styled from '../../styled'

export const config = {
  headerOffset: 10,
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
`

export const HeaderUI = styled('div')`
  left: 0;
  position: absolute;
  right: 0;
  top: calc((${config.iconSize}px / 2) * -1);
`

export const ContentUI = styled('div')`
  padding-top: ${config.headerOffset}px;
`

export const TitleUI = styled('div')`
  margin-bottom: ${config.titleOffset}px;
`

export default OptionTileUI
