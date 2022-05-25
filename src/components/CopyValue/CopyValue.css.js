import styled from 'styled-components'
import IconButton from '../IconButton'
import Text from '../Text'
import { getColor } from '@hsds/utils-color'

export const ConfirmationIconWrapperUI = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 2;
  opacity: 0;
  transition: opacity linear 150ms;
  color: white;
  background: var(--buttonMainColor);
  border-radius: 100px;
`

export const IconButtonUI = styled(IconButton)`
  margin-left: 5px;

  &&& {
    --buttonHeight: 32px;
    --buttonPadding: 0px;

    --buttonBackgroundColor: transparent;
    --buttonBorderColor: transparent;
    --buttonBackgroundColorHover: var(--buttonMainColor);
    --buttonBorderColorHover: var(--buttonMainColor);

    --buttonColor: var(--iconTextColor);

    width: var(--buttonHeight);
    min-width: 0;

    &:focus,
    &.is-focused {
      --buttonBackgroundColor: var(--buttonMainColor);
      --buttonBorderColor: var(--buttonMainColor);
      --buttonColor: white;
    }

    &:focus:not(:focus-visible) {
      --buttonBackgroundColor: transparent;
      --buttonBorderColor: transparent;
      --buttonColor: var(--iconTextColor);
    }

    &:focus-visible,
    &.is-copyConfirmed {
      --buttonColor: white;
      --buttonBackgroundColor: var(--buttonMainColor);
      --buttonBorderColor: var(--buttonMainColor);
    }

    .has-icon {
      margin: 0;
    }

    &.is-copyConfirmed ${ConfirmationIconWrapperUI} {
      opacity: 1;
    }
  }
`

export const CopyValueUI = styled.div`
  display: flex;
  align-items: center;

  --iconActiveColor: ${getColor('charcoal.500')};
  --iconInactiveColor: transparent;
  --iconTextColor: var(--iconInactiveColor);

  &:focus-within,
  &:hover {
    --iconTextColor: var(--iconActiveColor);
  }
`

export const ValueUI = styled(Text)`
  font-family: var(--HSDSGlobalFontFamilySystem);
  color: ${getColor('charcoal.400')};
`

export const PrefixUI = styled.span`
  color: ${getColor('grey.800')};
  margin-right: 5px;
`
