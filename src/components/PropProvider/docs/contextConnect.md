# contextConnect

Higher-order function that "connects" a React component with HSDS React's [PropProvider](./Provider.md) context. This pattern is similar to [Redux's connect](https://github.com/reduxjs/react-redux).

## Examples

```jsx
import React, { Component } from 'react'
import { contextConnect } from '@helpscout/hsds-react/PropProvider'

const MyComponent extends Component {
  ...
}

export default contextConnect('MyComponent')(MyComponent)
```

## Arguments

```
contextConnect(name)(Component)
```

| Argument    | Type              | Description                                              |
| ----------- | ----------------- | -------------------------------------------------------- |
| `name`      | `string`          | The namespace of the config (`Object`).                  |
| `Component` | `React.Component` | A valid React component (class or stateless functional). |

## Returns

`Function`: The enhanced "connected" React component.

## Props

| Prop       | Type       | Description                                                                       |
| ---------- | ---------- | --------------------------------------------------------------------------------- |
| wrappedRef | `Function` | Retrieve the inner Component instance. Only available for Class-based components. |
