import baseStyles from '../../../styles/resets/baseStyles.css'
import Card from '../../Card'
import styled from '../../styled'

export const config = {
  borderRadius: 4,
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1)',
  boxShadowHover: '0px 8px 15px 0 rgba(0, 0, 0, 0.2)',
  horizontalOffset: 10,
  padding: '20px 15px',
  transformHover: 'translateY(-3px)',
  transition: 'box-shadow 200ms linear, transform 200ms linear',
}

export const FluffyCardUI = styled(Card)`
  ${baseStyles}
  box-shadow: ${config.boxShadow};
  border-radius: ${config.borderRadius}px;
  flex: 1;
  max-width: 100%;
  min-width: 0;
  padding: ${config.padding};

  & + & {
    margin-left: ${config.horizontalOffset}px;
  }

  &.is-hoverable {
    box-shadow: ${config.boxShadow};
    color: currentColor;
    text-decoration: none;
    transform: translateY(0);
    transition: ${config.transition};

    &:hover {
      box-shadow: ${config.boxShadowHover};
      text-decoration: none;
      transform: ${config.transformHover};
    }
  }

  &.is-textAlign {
    &-left {
      text-align: left;
    }
    &-center {
      text-align: center;
    }
    &-right {
      text-align: right;
    }
  }
`

export default FluffyCardUI
