// from https://github.com/hydrateio/react-styled-frame/blob/master/src/index.js
// and https://github.com/styled-components/styled-components/issues/659#issuecomment-456894873
import React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Frame, { FrameContextConsumer } from 'react-frame-component'
import { StyleSheetManager, withTheme, ThemeProvider } from 'styled-components'

export class FrameComponent extends React.Component {
  render() {
    const { theme, style = {}, children, ...rest } = this.props

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
          <FrameContextConsumer>
            {frameContext => {
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
            }}
          </FrameContextConsumer>
        </Frame>
      </div>
    )
  }
}

FrameComponent.defaultProps = {
  'data-cy': 'FrameComponent',
}

export const ThemableFrame = withTheme(FrameComponent)
