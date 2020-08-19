// from https://github.com/hydrateio/react-styled-frame/blob/master/src/index.js
// and https://github.com/styled-components/styled-components/issues/659#issuecomment-456894873
import React, { useContext } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Frame, { FrameContext } from 'react-frame-component'

import {
  StyleSheetManager,
  withTheme,
  ThemeProvider,
  StyleSheetContext,
} from 'styled-components'

const FrameContent = ({ children, theme }) => {
  const frameContext = useContext(FrameContext)

  // TODO: The following code is to fix an issue with styled-component.
  // The underlying issue is that when using StyleSheetManager with a new target, the current global stylesheet is recreated with a new options,
  // but the cached "names" are keep around within the new stylesheet, causing an issue that block
  // the previous rendered components to be recreated in the new StyleSheet
  //
  // This issue was fixed in styled-component:
  // https://github.com/styled-components/styled-components/pull/3159
  // https://github.com/styled-components/styled-components/blob/master/CHANGELOG.md#unreleased
  // it's just not released yet. Once it's is released and we upgraded styled-components everywhere, we can go back to use target="frameContext.document.head"
  const shContext = useContext(StyleSheetContext)
  const ssmProps = {}
  if (shContext) {
    const sheet = shContext.reconstructWithOptions({
      target: frameContext.document.head,
    })
    sheet.names = new Map()
    sheet.tag = null
    ssmProps.sheet = sheet
  } else {
    ssmProps.target = frameContext.document.head
  }

  return (
    <StyleSheetManager {...ssmProps}>
      {theme ? (
        <ThemeProvider theme={theme}>
          <React.Fragment>{children}</React.Fragment>
        </ThemeProvider>
      ) : (
        <React.Fragment>{children}</React.Fragment>
      )}
    </StyleSheetManager>
  )
}

export const FrameComponent = ({
  style = {},
  theme,
  children,
  initialContent,
  contentDidMount,
  ...rest
}) => {
  return (
    <div className="HSDS-FrameProvider">
      <Frame
        style={{
          display: 'block',
          overflow: 'scroll',
          border: 0,
          ...style,
        }}
        initialContent={initialContent}
        contentDidMount={contentDidMount}
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
