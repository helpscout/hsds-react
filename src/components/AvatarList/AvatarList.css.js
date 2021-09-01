import styled from 'styled-components'

export const config = {
  borderWidth: 2,
}

export const ItemUI = styled('div')`
  position: relative;
  padding: 4px 0 3px 4px;

  ${({ zIndex }) => (zIndex ? `z-index: ${zIndex}` : '')};

  &:first-child {
    padding-left: 0;
  }
`

export const AvatarListUI = styled('div')`
  display: inline-flex;
  position: relative;

  &.horizontally-stacked {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: auto;
    max-width: 230px;
    min-height: 64px;
    width: 100%;
    min-width: 0;
    padding-left: ${config.borderWidth * 3}px;

    ${ItemUI} {
      margin-left: -4px;
      padding-left: 0;

      &:first-child {
        margin-left: 0;
      }
    }
  }

  &.vertically-stacked {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 64px;
    margin: auto;
    padding-top: ${config.borderWidth * 3}px;

    ${ItemUI} {
      margin-top: -9px;
      padding-top: 0;

      &:first-child {
        margin-top: 0;
      }

      .c-Avatar__cropBorder {
        top: -1px;
        bottom: -1px;
        left: -1px;
        right: -1px;
        border-width: 1px;
      }
    }
  }

  &.is-grid {
    min-width: 32px;
    max-width: 260px;

    align-items: center;
    flex-wrap: wrap;

    ${ItemUI} {
      margin: 3px;
      padding: 0;
    }
  }
`

export const AvatarListWrapperUI = styled('div')`
  &.is-center {
    justify-content: center;
    text-align: center;
  }
`
