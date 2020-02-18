import styled from 'styled-components'

import { breakpoint } from '../../styles/mixins/breakpoints.css'
import { getColor } from '../../styles/utilities/color'
import { pageBreakpointsConfig } from '../Page/Page.config.css'
import { classNameStrings as titleClassNames } from './Accordion.Title'
import { setFontSize } from '../../styles/utilities/font'

export const AccordionUI = styled('div')`
  border: 1px solid ${getColor('grey.400')};
  border-radius: 4px;
  overflow: hidden;
  color: ${getColor('charcoal.500')};

  .c-Accordion__Section {
    border-bottom: 1px solid ${getColor('grey.400')};
    &:last-child {
      border-bottom-width: 0;
    }
  }

  &.is-seamless {
    border: none;
    border-radius: none;
  }

  &.is-page {
    margin-left: -50px;
    margin-right: -50px;

    ${breakpoint(
      pageBreakpointsConfig.breakpoint.widescreen,
      `
      margin-left: -100px;
      margin-right: -100px;
    `
    )};
  }

  &.is-sortable {
    .c-Accordion__Section {
      border-bottom: none;
    }
    .c-Accordion__Section__Title {
      user-select: none;
      &.is-seamless .drag-handle {
        left: -15px;
      }
      &.is-page .drag-handle {
        left: 15px;
      }
      &:hover .drag-handle {
        display: inline-block;
      }
    }

    .c-SortableItem {
      border-bottom: 1px solid ${getColor('grey.400')};
      &:last-child {
        border-bottom-width: 0;
      }
    }

    &.is-sorting {
      pointer-events: none;
      user-select: none;
      .c-Accordion__Section {
        user-select: none;
      }
    }

    .c-Accordion__Section__Title.is-sortable {
      background-color: white;
      position: relative;
      .drag-handle {
        display: none;
        pointer-events: all;
      }
      &:hover .drag-handle {
        display: inline-block;
      }
    }
  }
`

export const BodyUI = styled('div')`
  display: block;
  overflow: hidden;
  padding: 0px 20px 20px 20px;

  .is-closed & {
    display: none;
  }

  &.is-md {
    padding: 0 20px 20px 20px;
  }

  &.is-sm {
    padding: 0 20px 16px 20px;
  }

  &.is-xs {
    padding: 0 20px 14px 20px;
  }

  &.is-seamless {
    padding-left: 0;
    padding-right: 0;
  }

  &.is-page {
    padding-left: 50px;
    padding-right: 50px;

    ${breakpoint(
      pageBreakpointsConfig.breakpoint.widescreen,
      `
      padding-left: 100px;
      padding-right: 100px;
    `
    )};
  }
`

export const SectionUI = styled('div')`
  background: white;
  position: relative;
`

export const TitleUI = styled('div')`
  ${setFontSize(14)};
  color: currentColor;
  cursor: pointer;
  display: block;
  padding: 18px 20px;
  text-decoration: none;
  font-weight: 500;

  &:hover,
  &:focus {
    background-color: ${getColor('grey.200')};

    .${titleClassNames.iconCaretClassName} {
      color: ${getColor('text.slightlyMuted')};
    }
  }

  &:focus {
    outline: none;
  }

  &.is-open {
    background-color: transparent;

    &:hover,
    &:active,
    &:focus {
      background-color: transparent;
    }

    &.is-link {
      border-bottom: none;
    }

    &.is-seamless {
      border-bottom-color: transparent;
    }
  }

  &.is-link {
    outline: none;
    text-decoration: none;
    color: currentColor;

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
      pageBreakpointsConfig.breakpoint.widescreen,
      `
    padding-left: 100px;
    padding-right: 100px;
  `
    )};
  }

  &.is-sortable {
    background-color: ${getColor('grey.200')};
    cursor: pointer;
    overflow: hidden;
    user-select: none;

    &.is-seamless .drag-handle {
      left: -15px;
    }
    &.is-page .drag-handle {
      left: 15px;
    }

    .drag-handle {
      color: ${getColor('grey.800')};
      cursor: move;
      display: inline-block;
      pointer-events: none;
      position: absolute;
      left: 1px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
`
