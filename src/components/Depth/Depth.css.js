import styled from 'styled-components'
import levels from '../../styles/mixins/depth.css'

export const DepthUI = styled('div')`
  &.d100 {
    ${levels.d100}
  }

  &.d200 {
    ${levels.d200}

    &.is-active,
    &.with-hover-effect:hover {
      ${levels.d200Effect}
    }
  }

  &.d300 {
    ${levels.d300}

    &.is-active,
    &.with-hover-effect:hover {
      ${levels.d300Effect}
    }
  }

  &.d400 {
    ${levels.d400}

    &.is-active,
    &.with-hover-effect:hover {
      ${levels.d400Effect}
    }
  }

  &.d500 {
    ${levels.d500}

    &.is-active,
    &.with-hover-effect:hover {
      ${levels.d500Effect}
    }
  }

  &.d600 {
    ${levels.d600}
  }

  &.d700 {
    ${levels.d700}
  }
`
