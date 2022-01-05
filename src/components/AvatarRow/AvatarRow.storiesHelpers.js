import React from 'react'
import AvatarRow from './AvatarRow'
import { generateAvatarList } from '../../utilities/specs/avatar.specs'
import { Resizable } from 're-resizable'

export const AvatarRowPlayground = () => {
  const [avatars, setAvatars] = React.useState(generateAvatarList(3, true))

  const handleClick = action => {
    if (action === 'add') {
      setAvatars([...avatars, ...generateAvatarList(1, true)])
    } else {
      setAvatars(avatars.slice(0, avatars.length - 1))
    }
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
      <br />
      <br />
      <button onClick={() => handleClick('add')}>increase avatar count</button>
      <button onClick={() => handleClick('remove')}>
        decrease avatar count
      </button>
    </>
  )
}
