// from https://github.com/hydrateio/react-styled-frame/blob/master/src/index.js
// and https://github.com/styled-components/styled-components/issues/659#issuecomment-456894873
import * as React from 'react'
import Frame, { FrameContextConsumer } from 'react-frame-component'
import { StyleSheetManager, withTheme, ThemeProvider } from 'styled-components'

export default withTheme(props => {
  const { theme, style = {}, children, ...rest } = props

  return (
    <div className="HSDS-FrameProvider">
      <Frame
        style={{
          display: 'block',
          overflow: 'scroll',
          border: 0,
          ...style,
        }}
        {...rest}
      >
        <FrameContextConsumer>
          {frameContext => (
            <StyleSheetManager target={frameContext.document.head}>
              {theme ? (
                <ThemeProvider theme={theme}>{children}</ThemeProvider>
              ) : (
                children
              )}
            </StyleSheetManager>
          )}
        </FrameContextConsumer>
      </Frame>
    </div>
  )
})
