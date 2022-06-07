import { getColor, getThemeBrandProp } from '@hsds/utils-color'
import styled from 'styled-components'

export const config = {
  backgroundColor: getColor('purple.500'),
  color: 'white',
  size: 44,
}

export const OptionIconUI = styled('div')`
  align-items: center;
  border-radius: 99999px;
  display: flex;
  height: ${config.size}px;
  justify-content: center;
  width: ${config.size}px;

  ${props => renderThemeStyles(props)};
`

function renderThemeStyles(props) {
  const backgroundColor = getThemeBrandProp(
    props,
    'brandColor',
    config.backgroundColor
  )
  const color = getThemeBrandProp(props, 'textColor', config.color)

  return `
    background-color: ${backgroundColor};
    color: ${color};
  `
}

export default OptionIconUI
