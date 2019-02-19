# Popover

A Popover component is UI component that provides the user with additional context/actions when engaged.

## Example

```jsx
<Popover />
```

## Props

| Prop                | Type              | Description                                                         |
| ------------------- | ----------------- | ------------------------------------------------------------------- |
| className           | `string`          | Custom class names to be added to the component.                    |
| closeOnContentClick | `boolean`         | Close the popover when its contents are clicked                     |
| maxWidth            | `number`/`string` | Max width for the component.                                        |
| minWidth            | `number`/`string` | Min width for the component.                                        |
| renderContent       | `function`        | Renders a component within the Popover. Is prioritized over `title` |
| triggerOn           | `string`          | Determines how to engage the component.                             |
