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

### App environment

Supported components can render differently for different app environments. To specify an app environment, pass the app name as `app` to `PropProvider`

```jsx
<PropProvider app="hs-app">
  ...
  <Modal />
  ...
</PropProvider>
```

In the above example, the `Modal` component will render with the `hs-app` theme and behaviours.

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

| Prop  | Type     | Description                          |
| ----- | -------- | ------------------------------------ |
| app   | `string` | App environment for Blue components. |
| value | `Object` | Custom configs for Blue components.  |
