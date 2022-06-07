import styled from 'styled-components'
import { depthLevels } from '@hsds/utils-mixins'

export const DepthUI = styled('div')`
  &.d100 {
    ${depthLevels.d100}
  }

  &.d200 {
    ${depthLevels.d200}

    &.is-active,
    &.with-hover-effect:hover {
      ${depthLevels.d200Effect}
    }
  }

  &.d300 {
    ${depthLevels.d300}

    &.is-active,
    &.with-hover-effect:hover {
      ${depthLevels.d300Effect}
    }
  }

  &.d400 {
    ${depthLevels.d400}

    &.is-active,
    &.with-hover-effect:hover {
      ${depthLevels.d400Effect}
    }
  }

  &.d500 {
    ${depthLevels.d500}

    &.is-active,
    &.with-hover-effect:hover {
      ${depthLevels.d500Effect}
    }
  }

  &.d600 {
    ${depthLevels.d600}
  }

  &.d700 {
    ${depthLevels.d700}
  }
`
