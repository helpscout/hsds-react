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

  &.is-withLayerStack {
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

export const AvatarListWrapperUI = styled.div`
  &.is-center{
    justify-content: center;
    text-align: center;
  }
  /* &.is-center ${AvatarListUI} {
    justify-content: center;
  } */
`
