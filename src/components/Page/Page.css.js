import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import { breakpoint } from '../../styles/mixins/breakpoints.css'
import {
  pageConfig,
  headerConfig,
  pageSectionConfig,
  actionsConfig,
  pageCardConfig,
  pageBreakpointsConfig,
} from './Page.config'
import Heading from '../Heading'

/**
 * ====================
 * PAGE
 * ====================
 */

export const PageUI = styled('div')`
  margin-left: auto;
  margin-right: auto;
  max-width: ${pageConfig.maxWidth.default};
  min-width: ${pageConfig.minWidth};
  transition: ${pageConfig.transition};
  width: 100%;

  &.is-responsive {
    ${breakpoint(
      pageBreakpointsConfig.breakpoint.superWidescreen,
      `
      max-width: ${pageConfig.maxWidth.superWidescreen};
    `
    )};

    ${breakpoint(
      pageBreakpointsConfig.breakpoint.widest,
      `
      max-width: ${pageConfig.maxWidth.widest};
    `
    )};
  }
`

/**
 * ====================
 * PAGE ACTIONS
 * ====================
 */

export const ActionsUI = styled('div')`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  margin-left: -${actionsConfig.spacing}px;
  margin-right: -${actionsConfig.spacing}px;
  margin-bottom: ${actionsConfig.marginBottom}px;
  margin-top: ${actionsConfig.marginTop}px;

  &.is-left {
    flex-direction: row;
  }

  &.is-right {
    flex-direction: row-reverse;
  }

  ${({ withStickyWrapper, zIndex }) =>
    withStickyWrapper &&
    `
  margin-top: 0;
  margin-bottom: 0;
  z-index: ${zIndex};
`};
`

export const ActionsItemUI = styled('div')`
  min-width: 0;
  margin: 0 ${actionsConfig.spacing}px;
`

export const ActionsBlockUI = styled('div')`
  flex: 1;
  max-width: 100%;
  min-width: 0;
`

export const StickyActionsWrapperUI = styled('div')`

position: fixed;
bottom: 0;
left: 0;
right: 0;
background: white;
padding: 10px;
border-top: 1px solid ${getColor('border')};
box-shadow: 0 -3px 0 rgba(0, 0, 0, 0.03);

${({ zIndex }) =>
  `
  z-index: ${zIndex};
`};

/**
 * Fixes for Firefox. The IntersectionObserver stops working as expected
 * when horizontal scrolling occurs. In this scenario, we'll hide the
 * sticky actions.
 */
@media (max-width: ${parseInt(pageBreakpointsConfig.minWidth, 10) + 1}px) {
  @-moz-document url-prefix() {
    display: none;
  }
}
}
`

/**
 * ====================
 * PAGE CONTENT
 * ====================
 */

export const ContentUI = styled('div')`
  flex: 1;
  max-width: 100%;
  min-width: 0;
`

/**
 * ====================
 * PAGE CARD ACTIONS
 * ====================
 */

export const CardUI = styled('div')`
  background-color: white;
  border-radius: ${pageCardConfig.borderRadius};
  box-shadow: ${pageCardConfig.boxShadow};
  display: flex;
  flex-direction: ${pageCardConfig.flexDirection.default};
  padding: ${pageCardConfig.padding.default};
  margin-bottom: ${pageCardConfig.marginBottom};
  transition: ${pageCardConfig.transition};
  width: 100%;

  &:hover {
    box-shadow: ${pageCardConfig.boxShadowHover};
  }

  ${breakpoint(
    pageBreakpointsConfig.breakpoint.widescreen,
    `
      padding: ${pageCardConfig.padding.widescreen};
    `
  )};

  .is-responsive & {
    ${breakpoint(
      pageBreakpointsConfig.breakpoint.superWidescreen,
      `
        padding: ${pageCardConfig.padding.superWidescreen};
      `
    )};

    ${breakpoint(
      pageBreakpointsConfig.breakpoint.fullscreen,
      `
        padding: ${pageCardConfig.padding.fullscreen};
      `
    )};
  }
`

/**
 * ====================
 * PAGE HEADER
 * ====================
 */

export const HeaderUI = styled('header')`
  margin-bottom: 0;
  width: ${headerConfig.width.default};

  &.is-withBorder {
    border-bottom: 1px solid #e3e8eb;
    padding-bottom: ${headerConfig.paddingBottom};
  }

  &.is-withBottomMargin {
    margin-bottom: ${headerConfig.marginBottom};
  }

  &.is-responsive {
    ${breakpoint(
      pageBreakpointsConfig.breakpoint.superWidescreen,
      `
        border-bottom: none;
        width: ${headerConfig.width.superWidescreen};
        margin-right: ${headerConfig.marginRight.superWidescreen}
      `
    )};

    ${breakpoint(
      pageBreakpointsConfig.breakpoint.widest,
      `
        width: ${headerConfig.width.widest};
      `
    )};
  }
`

export const SubTitleUI = styled('div')`
  margin-top: 5px;
`

export const HeadingUI = styled(Heading)`
  margin: 0;
  padding: 0;
`

/**
 * ====================
 * PAGE SECTION
 * ====================
 */

export const SectionUI = styled('section')`
  display: flex;
  flex-direction: ${pageSectionConfig.flexDirection.default};
  width: 100%;
  margin-bottom: ${pageSectionConfig.marginBottom};

  &:last-child {
    margin-bottom: 0;
  }

  &.is-responsive {
    ${breakpoint(
      pageBreakpointsConfig.breakpoint.superWidescreen,
      `
        flex-direction: ${pageSectionConfig.flexDirection.superWidescreen};
        align-items: ${pageSectionConfig.flexItemsAlign.superWidescreen};
      `
    )};
  }
`
