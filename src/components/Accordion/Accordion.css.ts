import baseStyles from '../../styles/resets/baseStyles.css'
import { breakpoint } from '../../styles/mixins/breakpoints.css'
import styled from '../styled'

import PageConfig from '../Page/styles/Page.config.css'

export const AccordionUI = styled('div')`
  ${baseStyles};
  border: 1px solid rgba(193, 203, 212, 0.7);
  border-radius: 4px;
  overflow: hidden;

  &.is-seamless {
    border: none;
    border-radius: none;
  }

  &.is-page {
    margin-left: -50px;
    margin-right: -50px;

    ${breakpoint(
      PageConfig.breakpoint.widescreen,
      `
      margin-left: -100px;
      margin-right: -100px;
    `
    )};
  }
`

export const BodyUI = styled('div')`
  ${baseStyles};

  display: block;
  padding: 24px 20px;

  .is-closed & {
    display: none;
  }

  &.is-md {
    padding: 20px 20px;
  }

  &.is-sm {
    padding: 16px 20px;
  }

  &.is-xs {
    padding: 14px 20px;
  }

  &.is-seamless {
    padding-left: 0;
    padding-right: 0;
  }

  &.is-page {
    padding-left: 50px;
    padding-right: 50px;

    ${breakpoint(
      PageConfig.breakpoint.widescreen,
      `
      padding-left: 100px;
      padding-right: 100px;
    `
    )};
  }
`

export const SectionUI = styled('div')`
  ${baseStyles};

  border-bottom: 1px solid rgba(193, 203, 212, 0.7);

  &.is-seamless,
  &:last-child {
    border-bottom: none;
  }
`

export const makeTitleUI = (selector: 'div') => {
  return styled(selector)`
    ${baseStyles};
    color: currentColor;
    cursor: pointer;
    display: block;
    padding: 18px 20px;
    text-decoration: none;

    &:hover,
    &:focus,
    &.is-open {
      background-color: #f9fafa;
      color: currentColor;
      text-decoration: none;
    }

    &.is-open {
      border-bottom: 1px solid rgba(193, 203, 212, 0.7);

      &.is-link {
        border-bottom: none;
      }

      &.is-seamless {
        border-bottom-color: transparent;
      }
    }

    &.is-link {
      outline: none;
    }

    &.is-md {
      padding: 14px 20px;
    }

    &.is-sm {
      padding: 8px 20px;
    }

    &.is-xs {
      padding: 6px 20px;
    }

    &.is-seamless {
      padding-left: 0;
      padding-right: 0;
    }

    &.is-page {
      padding-left: 50px;
      padding-right: 50px;

      ${breakpoint(
        PageConfig.breakpoint.widescreen,
        `
      padding-left: 100px;
      padding-right: 100px;
    `
      )};
    }
  `
}
