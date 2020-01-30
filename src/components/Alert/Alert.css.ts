import styled from 'styled-components'

import { STATUSES } from '../../styles/configs/constants'
import { getColor } from '../../styles/utilities/color'
import forEach from '../../styles/utilities/forEach'

export const config = {
  backgroundColor: getColor('state.warning.backgroundColor'),
  color: getColor('state.warning.color'),
  boxShadow: `inset 4px 0 0 0 ${getColor('state.warning.borderColor')}`,
}

export const AlertUI = styled('div')`
  background-color: ${config.backgroundColor};
  color: ${config.color};
  box-shadow: ${config.boxShadow};
  padding: 8px 16px;
  margin-bottom: 16px;
  text-align: left;

  > *:first-child {
    margin-top: 0;
  }
  > *:last-child {
    margin-bottom: 0;
  }

  a:not(.c-button, .c-Button) {
    color: inherit;
    text-decoration: underline;

    &:hover {
      color: inherit;
    }
  }

  &.is-noMargin {
    margin-bottom: 0;
  }

  ${makeStateStyles};
`

export const ContentUI = styled('div')`
  align-items: flex-start;
  display: flex;

  > * {
    max-width: 100%;
    min-width: 0;
    + * {
      margin-left: 12px;
    }
  }
`

export const BadgeWrapperUI = styled('div')`
  padding: 4px 0;

  + * {
    margin-left: 8px;
  }
`

export const BlockUI = styled('div')`
  line-height: 28px;
  max-width: 100%;
  min-height: 28px;
  min-width: 0;

  .c-Heading,
  .c-Text,
  .c-Link,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ol,
  ul {
    color: inherit;
  }

  ul {
    margin-bottom: 8px;

    li:last-child {
      margin-bottom: 0;
    }
  }

  > p {
    margin: 5px 0;
  }
`

export const IconWrapperUI = styled('div')`
  padding: 3px 0;
  + * {
    margin-left: 8px;
  }
`

export const CloseWrapperUI = styled('div')`
  margin-left: auto;
  margin-right: -4px;
  padding-left: 8px;
`

function makeStateStyles(): string {
  return forEach(
    STATUSES,
    state => `
    &.is-${state} {
      background-color: ${getColor('state', state, 'backgroundColor')};
      box-shadow: inset 4px 0 0 0 ${getColor('state', state, 'borderColor')};
      color: ${getColor('state', state, 'color')};

      .c-Badge,
      .c-badge {
        background-color: ${getColor('state', state, 'borderColor')};
      }
    }
  `
  )
}
