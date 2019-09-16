import styled from 'styled-components'
import Link from '../../Link'
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import cardStyles from '../../../styles/mixins/cardStyles.css.js'

export const config = {
  borderRadius: 4,
  border: '1px solid rgba(193, 203, 212, 0.7)',
  boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
  boxShadowHover: '0 6px 12px rgba(0, 0, 0, 0.12)',
  boxShadowFloating: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  padding: '20px 15px',
  transformHover: 'translateY(-2px)',
  transition: 'box-shadow 200ms linear, transform 200ms linear',
}

export const CardUI = styled(Link)`
  ${baseStyles}
  background-color: white;
  border: 1px solid rgba(193, 203, 212, 0.7);
  border-radius: ${config.borderRadius}px;
  box-shadow: ${config.boxShadow};
  color: currentColor;
  display: block;
  padding: 16px;
  text-decoration: none;

  & > *:first-child {
    border-top-left-radius: ${config.borderRadius}px;
    border-top-right-radius: ${config.borderRadius}px;
  }
  & > *:last-child {
    border-bottom-left-radius: ${config.borderRadius}px;
    border-bottom-right-radius: ${config.borderRadius}px;
  }

  &.c-Link {
    background-color: white;
    color: currentColor;
  }

  &.is-borderless {
    border: none;
  }

  &.is-clickable {
    cursor: pointer;
  }

  &.is-floating {
    box-shadow: ${config.boxShadowFloating};
  }

  &.is-flex {
    display: flex;
    flex-direction: column;
    min-height: 0;
    width: 100%;
  }

  &.is-fullHeight {
    height: 100%;
  }

  &.is-hoverable {
    border: none;
    ${cardStyles()}
  }

  &.is-seamless {
    padding: 0;
  }
`
