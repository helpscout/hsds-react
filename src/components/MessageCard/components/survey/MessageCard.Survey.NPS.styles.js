import styled from 'styled-components'
import Button from '../../../Button'
import { getColor, getThemeBrandProp } from '../../../../styles/utilities/color'

export const ScoresUI = styled.div`
  display: flex;
  background-color: white;
`

export const ScoreUI = styled(Button)`
  && {
    --buttonWidth: 34px;
    --buttonMinWidth: 34px;
    --buttonPadding: 0;
    --focusRingRadius: 8px;

    --buttonMainColor: ${getColor('charcoal.400')};
    --buttonBackgroundColor: white;
    --buttonBackgroundColorHover: white;
    --buttonBorderColor: ${getColor('grey.600')};
    --buttonBorderColorHover: ${getColor('grey.600')};
    --buttonColor: ${getColor('charcoal.400')};
    --buttonColorHover: ${getColor('charcoal.400')};

    position: relative;

    transition: all 200ms, border-width 0ms;

    &:hover:not(:focus) {
      border-width: 0;
      --focusRingRadius: 4px;
      --focusRingOffset: -1px;

      &:before {
        opacity: 1;
        box-shadow: 0 0 0 1px ${getColor('charcoal.400')};
      }
    }
  }

  height: 30px;

  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 500;
  font-size: 13px !important;
  line-height: 22px;
  background-color: transparent;

  cursor: pointer;

  & + & {
    margin-left: 5px;
  }

  transition: all 200ms;

  &.is-selected,
  &:active {
    background-color: ${props => getThemeBrandProp(props, 'backgroundColorUI')};
    border-color: ${props => getThemeBrandProp(props, 'backgroundColorUI')};
    color: ${props => getThemeBrandProp(props, 'textColor')};
  }

  @media (max-width: 484px) {
    & + & {
      margin-left: 3px;
    }

    && {
      --buttonWidth: 24px;
      --buttonMinWidth: 24px;
      height: 26px !important;
      border-radius: 3px;
      font-size: 12px !important;
    }
  }
`

export const ScoreLabelsUI = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  padding-top: 10px;
`

export const ScoreLabelUI = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 22px;

  color: ${getColor('charcoal.400')};

  max-width: 45%; // to keep some space between
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const SurveyNPSUI = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 422px;
  @media (max-width: 484px) {
    width: auto;
  }
`
