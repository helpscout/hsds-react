import styled from 'styled-components'
import forEach from '../../styles/utilities/forEach'
import { getColor, rgba } from '../../styles/utilities/color'

const statusStyles = {
  error: 'red',
  info: 'blue',
  success: 'green',
  warning: 'yellow',
}

const statusBarStyleBold = color => {
  return `
    background-color: ${getColor(`${color}.500`)};
    border-bottom: 1px solid ${getColor(`${color}.600`)};
    color: white;
    font-weight: bold;
    .c-StatusBarButton{
        background-color: ${getColor(`${color}.700`)};
        text-shadow: 0 1px 1px ${rgba('black', 0.1)};
    }
    `
}
const statusBarStyleLight = color => {
  return `
    background-color: ${getColor(`${color}.200`)};
    border-bottom: 1px solid ${getColor(`${color}.300`)};
    color: ${getColor(`${color}.500`)};

    .c-StatusBarButton{
        background-color: ${getColor(`${color}.500`)};
        &:focus {
        box-shadow: 0 0 0 2px ${rgba('white', 0.8)};
        }
    }
    `
}
const makeStatusStyles = () => {
  return forEach(statusStyles, (name, value) => {
    return `
      &.is-${name} {
          &.is-bold {
              ${statusBarStyleBold(value)};
          }
          &.is-light {
              ${statusBarStyleLight(value)};
          }

          
      }
    `
  })
}

export const StatusBarUI = styled('div')`
  cursor: pointer;
  padding: 6px 20px;
  min-height: 32px;
  text-align: center;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${statusBarStyleLight('blue')};

  .c-StatusBar__content {
    font-size: 13px;
    line-height: 1;
  }

  &.is-bold {
    .c-StatusBar__content {
      text-shadow: 0 1px 1px ${rgba('black', 0.1)};
    }
  }

  ${makeStatusStyles()};
`

export const StatusBarButtonUI = styled.button`
  appearance: none;
  box-sizing: border-box;
  border-radius: 9999px;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 13px;
  font-weight: normal;
  padding: 3px 8px;
  line-height: 1;
  outline: none;

  &:focus {
    box-shadow: 0 0 0 2px ${rgba('white', 0.4)};
    outline: none;
  }

  .c-StatusBarButton__icon {
    margin-left: 3px;
    vertical-align: middle;
  }
`
