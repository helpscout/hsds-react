import styled from 'styled-components'

export const ContentUI = styled.div`
  position: relative;
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
`

export const AttachmentListUI = styled.div`
  position: relative;

  &.withOverflow ${ContentUI} {
    flex-wrap: nowrap;

    padding: 0 4px;
  }

  &.withOverflow.is-theme-preview ${ContentUI} {
    padding-top: 25px;
    padding-bottom: 10px;
  }

  .AttachmentList__DownloadAll {
    flex: 0 0 auto;
    --buttonHeight: 30px;
    margin-left: 4px;
  }
  .c-Icon {
    flex: 0 0 auto;
  }
`
