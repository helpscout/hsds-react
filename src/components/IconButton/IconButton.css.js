import styled from 'styled-components'
import { ButtonUI } from '../Button/Button.css'
import { getColor } from '@hsds/utils-color'

export const IconContainerUI = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  .c-Avatar {
    width: 100%;
    height: 100%;
  }
`

export const StatusUI = styled.span`
  --statusSize: 14px;
  content: '';
  position: absolute;
  width: var(--statusSize);
  border-top-left-radius: calc(var(--statusSize) * 2);
  border-top-right-radius: calc(var(--statusSize) * 2);
  aspect-ratio: 2;
  right: -1px;
  top: -1px;
  background: var(--buttonBackgroundColor);
  border: 1px solid var(--buttonBorderColor);
  border-bottom: 0;
  transform: rotate(40deg);

  &:before {
    content: '';
    position: absolute;
    width: calc(var(--statusSize) - 2px);
    height: calc(var(--statusSize) - 2px);
    right: 0;
    top: 0;
    background: var(--buttonBackgroundColor);
    border-radius: 100%;
  }

  &:after {
    --iconSize: calc(calc(var(--statusSize) - 2px) / 2);
    content: '';
    position: absolute;
    width: var(--iconSize);
    height: var(--iconSize);
    right: calc(var(--iconSize) / 2);
    top: calc(var(--iconSize) / 2);
    background: ${getColor('pink.900')};
    border-radius: 100%;
  }
`

export const IconButtonUI = styled(ButtonUI)`
  border-radius: 100px;
  --focusRingRadius: 100px;

  &.is-size-xl,
  &.is-size-lg {
    min-width: var(--buttonHeight);
    --buttonPadding: 3px;
  }

  &.is-size-sm {
    min-width: var(--buttonHeight);
    --buttonPadding: 2px;
  }

  &.has-icon-only {
    min-width: 0;
    width: var(--buttonHeight);
    padding: var(--buttonPadding);
  }

  ${IconContainerUI} {
    height: calc(var(--buttonHeight) - calc(var(--buttonPadding) * 2) - 2px);
    aspect-ratio: 1;
  }

  &.is-style-outlined:not(.has-children):not(.is-seamless) {
    box-shadow: inset 0 0 0 3px white;
  }

  &.with-status {
    position: relative;

    &:hover,
    &.is-active,
    &:active {
      ${StatusUI} {
        border-color: var(--buttonBorderColorHover);
      }
      &.is-style-filled {
        ${StatusUI} {
          &:before {
            background: var(--buttonBackgroundColorHover);
          }
        }
      }
    }

    &.is-disabled,
    &[disabled] {
      &.is-style-filled ${StatusUI} {
        border-color: ${getColor('grey.500')} !important;
        &:before {
          background: ${getColor('grey.500')} !important;
        }
      }
    }

    &.is-seamless ${StatusUI} {
      border-color: transparent;
      background: transparent;
      right: 1px;
      top: 1px;
      &:before {
        display: none;
      }
    }

    &.is-size-sm ${StatusUI} {
      --statusSize: 10px;
    }
  }
`

export const ChildrenUI = styled.span`
  margin-left: 8px;
  margin-right: 16px;

  &.has-icon {
    margin-left: 4px;
  }
`
