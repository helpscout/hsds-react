# Popover

A Popover component is UI component that provides the user with additional context/actions when engaged.

## Example

```jsx
<Popover />
```

### Custom Content

The contents of Popover can be customized by using `renderHeader` and/or `renderContent` for rendering.

```jsx
<Popover
  renderHeader={() => <Heading>My Title</Heading>}
  renderContent={() => (
    <div>
      <p>My Content</p>
    </div>
  )}
/>
```

## Props

| Prop                | Type              | Description                                                           |
| ------------------- | ----------------- | --------------------------------------------------------------------- |
| className           | `string`          | Custom class names to be added to the component.                      |
| closeOnContentClick | `boolean`         | Close the popover when its contents are clicked                       |
| content             | `any`             | Body content to render within the component.                          |
| header              | `any`             | Title content to render within the component.                         |
| maxWidth            | `number`/`string` | Max width for the component.                                          |
| minWidth            | `number`/`string` | Min width for the component.                                          |
| renderContent       | `Function`        | Renders a component within the Popover. Is prioritized over `content` |
| renderHeader        | `Function`        | Renders a component within the Popover. Is prioritized over `header`  |
| triggerOn           | `string`          | Determines how to engage the component.                               |

Tooltip is powered by [react-tippy](https://github.com/atomiks/tippyjs-react) and [react-popper](https://github.com/popperjs/react-popper). You can see all available props that can be passed to [Tippy here](https://atomiks.github.io/tippyjs/v6/all-props).
