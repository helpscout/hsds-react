// from https://github.com/hydrateio/react-styled-frame/blob/master/src/index.js
// and https://github.com/styled-components/styled-components/issues/659#issuecomment-456894873
import React, { useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import { getValidProps } from '@hsds/utils-react'
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
  //
  // !Update: some performance issue occured, we might keep this way of creating a new sheet around even after
  // !the styled-component update, to keep the useMemo implementation
  const shContext = useContext(StyleSheetContext)
  const ssmProps = useMemo(() => {
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
    return ssmProps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shContext])

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
  theme,
  children,
  initialContent,
  contentDidMount,
  head,
  ...rest
}) => {
  return (
    <Frame
      initialContent={initialContent}
      contentDidMount={contentDidMount}
      head={head}
      {...getValidProps(rest)}
    >
      <FrameContent theme={theme}>{children}</FrameContent>
    </Frame>
  )
}

FrameComponent.propTypes = {
  /* The initialContent props is the initial html injected into frame. It is only injected once, but allows you to insert any html into the frame (e.g. a head tag, script tags, etc). */
  initialContent: PropTypes.string,
  /* Callback that works exactly like componentDidMount. */
  contentDidMount: PropTypes.func,
}

FrameComponent.defaultProps = {
  'data-cy': 'FrameComponent',
}

export const ThemableFrame = withTheme(FrameComponent)
export { FrameContext }
