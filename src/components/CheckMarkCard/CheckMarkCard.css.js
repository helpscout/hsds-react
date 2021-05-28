import { d400, d400Effect } from '../../styles/mixins/depth.css'

import Avatar from '../Avatar'
import ChoiceGroup from '../ChoiceGroup'

import { getColor } from '../../styles/utilities/color'
import { rgba } from '../../utilities/color'
import styled from 'styled-components'

export const MarkUI = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  height: 28px;
  width: 28px;
  border-radius: 3px;
  opacity: 0;
  transition: opacity 0.15s cubic-bezier(0.55, 0, 1, 0.45);
  will-change: opacity;
  background-color: ${getColor('blue.500')};
  z-index: 100;
  outline: none;

  &.is-visible {
    opacity: 1;
  }

  .mark-icon {
    color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:focus {
    &:before {
      opacity: 1;
    }
  }

  // Focus UI
  &:before {
    content: '';
    border-radius: 5px;
    bottom: -2px;
    box-shadow: 0px 0px 0 2px ${getColor('blue.500')};
    left: -2px;
    pointer-events: none;
    position: absolute;
    right: -2px;
    top: -2px;
    opacity: 0;
    transition: opacity ease 0.2s;
  }
`

export const CheckMarkCardContentUI = styled.div`
  position: relative;
  border-radius: 3px;
  flex: 1 1 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  transition: background-color 0.15s linear;
`

export const CheckMarkCardUI = styled('label')`
  display:flex;
  box-sizing: border-box;
  position: relative;

  border-radius: 4px;
  will-change: transform, box-shadow;
  transition: transform 0.16s ease-in-out, box-shadow 0.16s ease-in-out;
  cursor: pointer;
  padding:3px;
  margin-bottom: 0;
  
  /* if no maxWidth are set, let's make sure the card is 170px */
  height: ${({ height }) => (height ? height : 'auto')};
  min-height: ${({ height }) => (!height ? '160px' : '0')};
  width: ${({ maxWidth }) => (maxWidth ? '100%' : '170px')};
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '170px')};

  ${d400}

  // Focus UI
  &:before{
    content: '';
    border-radius: 5px;
    bottom: 0px;
    box-shadow: 0px 0px 0 2px ${getColor('blue.500')};
    left: 0px;
    pointer-events: none;
    position: absolute;
    right: 0px;
    top: 0px;
    opacity: 0;
    transition: opacity ease 0.2s;
  }


  &:not(.is-disabled):hover {
    ${d400Effect}  
    transform: translateY(-2px);
  }

  &.is-focused,
  &:focus-within,
  &:focus-visible {
    &:before{
      opacity:1;
    }
  }

  &.is-disabled {
    ${d400}
    color: ${rgba(getColor('charcoal.500'), 0.85)};
    opacity: 0.8;
    cursor: not-allowed;
    transition: none;
  }

  &.with-status {
    cursor: default;
    
    &:hover {
      ${d400}
      transform: translateY(0);
    }
  }

  &.is-checked ${CheckMarkCardContentUI}{
      background:${getColor('blue.100')};
  }

  &.is-lavender{
    &:before{
      opacity: 0;
    }
        
    ${MarkUI} {
      background-color: ${getColor('lavender.600')};
    }

    ${CheckMarkCardContentUI}{
      background:${getColor('purple.100')};
    }
  }
`

export const AvatarUI = styled(Avatar)`
  margin-bottom: 14px;
`

export const RoleNameUI = styled('div')`
  font-size: 13px;
  color: ${getColor('charcoal.200')};
`

export const UserNameUI = styled('div')`
  font-size: 14px;
  margin: 0 0 4px;
  text-align: center;
  overflow: hidden;
  padding: 0 10px;
  font-weight: 500;
  color: ${getColor('charcoal.600')};
  text-overflow: ellipsis;
  width: 100%;
  white-space: nowrap;
`

export const CheckmarkCardGridUI = styled(ChoiceGroup)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: ${({ choiceHeight }) => `${choiceHeight}`};
  grid-gap: 10px;
  gap: 10px;

  .c-FormGroupChoice {
    margin: 0;
  }
`
