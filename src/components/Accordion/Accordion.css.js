import styled from 'styled-components'

import { breakpoint } from '../../styles/mixins/breakpoints.css'
import { getColor } from '../../styles/utilities/color'
import PageConfig from '../Page/styles/Page.config.css'
import { classNameStrings as titleClassNames } from './Accordion.Title'
import { setFontSize } from '../../styles/utilities/font'

export const AccordionUI = styled('div')`
  border: 1px solid ${getColor('border')};
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
  display: block;
  overflow: hidden;
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
  border-bottom: 1px solid ${getColor('border')};

  &.is-seamless,
  &:last-child {
    border-bottom: none;
  }
`

export const TitleUI = styled('div')`
  ${setFontSize(14)};
  color: currentColor;
  cursor: pointer;
  display: block;
  padding: 18px 20px;
  text-decoration: none;

  &:hover,
  &:focus,
  &.is-open {
    background-color: ${getColor('grey.200')};
    color: currentColor;
    text-decoration: none;
  }

  &:focus {
    outline: none;
  }

  &.is-open {
    border-bottom: 1px solid ${getColor('border')};

    &.is-link {
      border-bottom: none;
    }

    &.is-seamless {
      border-bottom-color: transparent;
    }
  }

  &.is-link {
    outline: none;

    &:hover {
      .${titleClassNames.iconCaretClassName} {
        color: ${getColor('text.slightlyMuted')};
      }
    }
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
