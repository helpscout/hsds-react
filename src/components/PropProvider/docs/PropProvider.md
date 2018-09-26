# PropProvider

A PropProvider component provides child Blue components with config values.

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
    <PropProvider value={customConfig}>
      ...
      <Tooltip>...</Tooltip>
      ...
    </PropProvider>
  )
}
```

In the example (above), the `Tooltip` will use the `zIndex` config as a prop.

### Nesting

It is possible to nest `PropProvider` components. `PropProvider` will automatically **extend** config defined in any parent instance.

```jsx
<PropProvider value={{ Button: { kind: 'secondary' } }}>
  ...
  <PropProvider value={{ Button: { block: true }, Tooltip: { zIndex: 123 } }}>
    ...
    <Tooltip>...</Tooltip>
    <Button>...</Button>
    ...
  </PropProvider>
  ...
</PropProvider>
```

In the above example, at the level of `Button` and `Tooltip`, the `PropProvider` config will be:

```js
{
  Button: {
    block: true,
    kind: 'secondary'
  },
  Tooltip: {
    zIndex: 123
  }
}
```

## Props

| Prop  | Type     | Description                         |
| ----- | -------- | ----------------------------------- |
| value | `Object` | Custom configs for Blue components. |
