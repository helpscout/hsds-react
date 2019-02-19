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
  renderHeader={({ Header, Title, Close }) => (
    <Header>
      <Title>My Title</Title>
      <button onClick={close}>Close Popover</button>
    </Header>
  )}
  renderContent={({ Close }) => (
    <div>
      <p>My Content</p>
      <button onClick={close}>Close Popover</button>
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

### renderHeader({ close, placement, Header, Title })

| Prop      | Type              | Description                             |
| --------- | ----------------- | --------------------------------------- |
| close     | `Function`        | Callback function to close the Popover. |
| placement | `string`          | Placement of the Popover.               |
| Header    | `React.Component` | Component to render the Header.         |
| Title     | `React.Component` | Component to render the Title.          |

### renderContent({ close, placement, Header, Title })

| Prop      | Type              | Description                             |
| --------- | ----------------- | --------------------------------------- |
| close     | `Function`        | Callback function to close the Popover. |
| placement | `string`          | Placement of the Popover.               |
| Header    | `React.Component` | Component to render the Header.         |
| Title     | `React.Component` | Component to render the Title.          |

This component is powered by [Pop](../../Pop/docs/Pop.md). After additional props, check out [Pop's documentation](../../Pop/docs/Pop.md).
