# Tag

A Tag component is a UI element that provide contextual labels for categories/tags.

## Example

```jsx
<Tag color="red">important</Tag>
```

## Props

| Prop                          | Type              | Description                                                                   |
| ----------------------------- | ----------------- | ----------------------------------------------------------------------------- |
| allCaps                       | `boolean`         | Custom class names to be added to the component.                              |
| className                     | `string`          | Custom class names to be added to the component.                              |
| color                         | `string`          | Determines the color of the component.                                        |
| display                       | `string`          | Determines the CSS `display` of the component. Default `inlineBlock`.         |
| id                            | `string`/`number` | ID of the component.                                                          |
| isRemovable                   | `boolean`         | Renders an `x` [Icon](../Icon), which can remove this component from the DOM. |
| isRemoving                    | `boolean`         | Renders the [Spinner](../Spinner) and replaces the `x` [Icon](../Icon)        |
| filled                        | `boolean`         | Applies a filled in color style to the component.                             |
| pulsing                       | `boolean`         | Applies a pulsing animation.                                                  |
| `onBeforeRemove({id, value})` | `Promise`         | Function that returns a promise to resolve before removing.                   |
| `onRemove({id, value})`       | `Function`        | Callback function when component is removed and unmounted.                    |
| shouldShowTooltip             | `boolean`         | Renders a [Tooltip](../Tooltip) if content is truncated. Default `true`.      |
| value                         | `string`/`number` | Value of the tag. Renders in place of `children`, if specified.               |

### Colors

| Value    | Description            |
| -------- | ---------------------- |
| `blue`   | Colors the tag blue.   |
| `green`  | Colors the tag green.  |
| `grey`   | Colors the tag grey.   |
| `orange` | Colors the tag orange. |
| `purple` | Colors the tag purple. |
| `red`    | Colors the tag red.    |
