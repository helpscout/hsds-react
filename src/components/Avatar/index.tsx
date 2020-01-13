import * as React from 'react'
import AvatarV2 from './AvatarV2'
import Avatar from './Avatar'

export const AvatarContext = React.createContext({})

export interface Props {
  version: number
}

export const AvatarConsumer = ({ version = 1, ...rest }) => {
  const { version: versionContext }: any = React.useContext(AvatarContext)

  const currentVersion = versionContext || version
  // @ts-ignore
  return currentVersion === 2 ? (
    <AvatarV2 version={2} {...rest} />
  ) : (
    <Avatar {...rest} version={1} />
  )
}

export default AvatarConsumer
