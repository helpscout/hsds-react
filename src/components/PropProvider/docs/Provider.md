# Provider

A Provider component provides child Blue components with config values.

## Example

```jsx
import React from 'react'
import PropProvider from '@helpscout/blue/components/PropProvider'
import Tooltip from '@helpscout/blue/components/Tooltip'

const customConfigs = {
  Tooltip: {
    zIndex: 123,
  },
}

const App = () => {
  return (
    <Provider value={customConfig}>
      ...
      <Tooltip>...</Tooltip>
      ...
    </Provider>
  )
}
```

In the example (above), the `Tooltip` will use the `zIndex` config as a prop.

## Props

| Prop  | Type     | Description                         |
| ----- | -------- | ----------------------------------- |
| value | `Object` | Custom configs for Blue components. |
