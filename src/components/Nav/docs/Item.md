# Nav.Item

This component is renders the linkable elements for a navigation interface, with support for [react-router](https://github.com/ReactTraining/react-router).

## Example

```jsx
<Nav.Item exact to="/">
  Home
</Nav.Item>
```

## Props

| Prop      | Type       | Default | Description                                                                         |
| --------- | ---------- | ------- | ----------------------------------------------------------------------------------- |
| className | `string`   |         | The className of the component.                                                     |
| disabled  | `boolean`  | `false` | Disables the link.                                                                  |
| error     | `string`   |         | Renders an error UI and message within a [Tooltip](../../Tooltip).                  |
| exact     | `boolean`  | `false` | Used to determine the active state/className.                                       |
| href      | `string`   |         | Hyperlink location.                                                                 |
| isActive  | `Function` |         | Determines the active state.                                                        |
| location  | `Object`   |         | Location object from [react-router](https://github.com/ReactTraining/react-router). |
| to        | `string`   |         | Route location for [react-router](https://github.com/ReactTraining/react-router).   |
| strict    | `boolean`  | `false` | Route strictness for [react-router](https://github.com/ReactTraining/react-router). |

For additional props, see [NavLink](../../NavLink).
