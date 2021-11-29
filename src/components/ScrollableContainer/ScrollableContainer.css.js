import React from 'react'
import styled from 'styled-components'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

export const ContainerScrollUI = styled('div')`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`

export const HeaderUI = styled(({ component, ref, ...props }) =>
  React.cloneElement(component, { ref, ...props })
)`
  width: 100%;
  transition: box-shadow 0.2s;
  z-index: 3;
`

export const BodyUI = styled(({ component, ref, ...props }) =>
  React.cloneElement(component, { ref, ...props })
)`
  width: 100%;
  flex-grow: 1;
  overflow: auto;
`

export const SimpleBarUI = styled(SimpleBar)`
  height: ${({ height }) => height};
`

export const FooterUI = styled(({ component, ref, ...props }) =>
  React.cloneElement(component, { ref, ...props })
)`
  width: 100%;
  transition: box-shadow 0.2s;
  z-index: 3;
`
