import styled from '../../styled'
import baseStyles from '../../../styles/resets/baseStyles.css'
import { breakpoint } from '../../../styles/mixins/breakpoints.css'
import { getColor } from '../../../styles/utilities/color'
import PageConfig from '../../Page/styles/Page.config.css'
import { classNameStrings as titleClassNames } from '../Accordion.Title'
import { setFontSize } from '../../../styles/utilities/font'

export const AccordionUI = styled('div')`
  ${baseStyles};
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

  .is-sorting {
    position: relative;
  }
`

export const BodyUI = styled('div')`
  ${baseStyles};

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
  background: white;
  border-bottom: 1px solid ${getColor('border')};
  position: relative;

  .is-page &.is-seamless,
  .is-page .c-SortableItem &.is-seamless:last-child,
  .is-sortable &:not(.is-seamless) {
    border-bottom-width: 1px;
  }

  &.is-seamless,
  &:last-child,
  .is-page &.is-seamless:last-child,
  .is-page .c-SortableItem:last-child &.is-seamless:last-child,
  .is-sortable .c-SortableItem:last-child &:not(.is-seamless) {
    border-bottom-width: 0;
  }
`

export const makeTitleUI = (selector: 'div') => {
  return styled(selector)`
    ${baseStyles};
    ${setFontSize(14)};
    color: currentColor;
    cursor: pointer;
    display: block;
    padding: 18px 20px;
    position: relative;
    text-decoration: none;

    &:hover,
    &:focus,
    &.is-open {
      color: currentColor;
      text-decoration: none;
    }

    &:focus {
      outline: none;
    }

    .c-Accordion.is-sorting & {
      pointer-events: none;
    }

    .is-sorting-item & {
      background-color: ${getColor('grey.200')};
      cursor: move;
      overflow: hidden;
      pointer-events: all;

      &.drag-handle {
        display: inline-block;
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

    .drag-handle {
      color: ${getColor('grey.800')};
      cursor: move;
      display: none;
      pointer-events: none;
      position: absolute;
      left: 2px;
      top: 50%;
      transform: translateY(-50%);

      .is-seamless & {
        left: -15px;
      }

      &.is-page {
        left: 15px;
      }
    }

    &:hover .drag-handle {
      display: inline-block;
      pointer-events: all;
    }
  `
}
