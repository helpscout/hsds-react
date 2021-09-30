import React from 'react'
import AvatarRow from './AvatarRow'
import { generateAvatarList } from '../../utilities/specs/avatar.specs'
import { Resizable } from 're-resizable'

export const AvatarRowPlayground = () => {
  const [avatars, setAvatars] = React.useState(generateAvatarList(3, true))

  const handleClick = () => {
    setAvatars([...avatars, ...generateAvatarList(1, true)])
  }

  return (
    <>
      <Resizable
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          outline: 'solid 1px #444cf770',
          backgroundColor: '#e5e5f730',
          backgroundImage: 'radial-gradient(#444cf770 0.5px, #e5e5f730 0.5px)',
          backgroundSize: '10px 10px',
        }}
        defaultSize={{
          width: '50%',
          height: 200,
        }}
      >
        <AvatarRow size="lg" gap={10} avatars={avatars} />
      </Resizable>
      <button onClick={handleClick}>increase avatar count</button>
    </>
  )
}
