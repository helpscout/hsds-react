import styled from 'styled-components'
import isString from 'lodash.isstring'
import isNumber from 'lodash.isnumber'

export const isPlainContent = entity => {
  return isString(entity) || isNumber(entity)
}

export const CustomAnimationDemoUI = styled.div`
  [data-placement^='top'] {
    transition-timing-function: cubic-bezier(0.28, 0.84, 0.42, 1);
    transform: translateY(12px) scale(0.5);
  }

  [data-placement^='bottom'] {
    transition-timing-function: cubic-bezier(0.28, 0.84, 0.42, 1);
    transform: translateY(-12px) scale(0.5);
  }

  [data-placement^='left'] {
    transition-timing-function: cubic-bezier(0.28, 0.84, 0.42, 1);
    transform: translateX(12px) scale(0.5);
  }

  [data-placement^='right'] {
    transition-timing-function: cubic-bezier(0.28, 0.84, 0.42, 1);
    transform: translateX(-12px) scale(0.5);
  }

  [data-entered='true'] {
    transform: translate(0) scale(1);
    opacity: 1;
  }
`
