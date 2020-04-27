# Tooltip

A Tooltip component is UI component that provides the user with additional context when engaged.

## Example

```jsx
<Tooltip title="You're my boy!!!">Blue</Tooltip>
```

## Props

| Prop          | Type              | Description                                                         |
| ------------- | ----------------- | ------------------------------------------------------------------- |
| className     | `string`          | Custom class names to be added to the component.                    |
| maxWidth      | `number`/`string` | Max width for the component.                                        |
| minWidth      | `number`/`string` | Min width for the component.                                        |
| renderContent | `Function`        | Renders a component within the Tooltip. Is prioritized over `title` |
| title         | `string`          | Text to display within the Tooltip.                                 |
| triggerOn     | `string`          | Determines how to engage the component.                             |

Tooltip is powered by [react-tippy](https://github.com/atomiks/tippyjs-react) and [react-popper](https://github.com/popperjs/react-popper). You can see all available props that can be passed to [Tippy here](https://atomiks.github.io/tippyjs/v6/all-props).
