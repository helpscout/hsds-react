import React from 'react'
import Story from './components/Story'

const addPrettyDocs = (storyFn, context, infoOptions) => {
  const props = {
    context
  }
  return <Story {...props}>{storyFn(context)}</Story>
}

export const prettyDocs = options => {
  return storyFn => context => addPrettyDocs(storyFn, context, options)
}
