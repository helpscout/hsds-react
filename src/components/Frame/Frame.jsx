// from https://github.com/hydrateio/react-styled-frame/blob/master/src/index.js
// and https://github.com/styled-components/styled-components/issues/659#issuecomment-456894873
import React, { useContext } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Frame, { FrameContext } from 'react-frame-component'
import { StyleSheetManager, withTheme, ThemeProvider } from 'styled-components'

const FrameContent = ({ children, theme }) => {
  const frameContext = useContext(FrameContext)

  return (
    <StyleSheetManager target={frameContext.document.head}>
      {theme ? (
        <ThemeProvider theme={theme}>
          <>{children}</>
        </ThemeProvider>
      ) : (
        <>{children}</>
      )}
    </StyleSheetManager>
  )
}

export const FrameComponent = ({ style = {}, theme, children, ...rest }) => {
  return (
    <div className="HSDS-FrameProvider">
      <Frame
        style={{
          display: 'block',
          overflow: 'scroll',
          border: 0,
          ...style,
        }}
        {...getValidProps(rest)}
      >
        <FrameContent theme={theme}>{children}</FrameContent>
      </Frame>
    </div>
  )
}

FrameComponent.defaultProps = {
  'data-cy': 'FrameComponent',
}

export const ThemableFrame = withTheme(FrameComponent)
