# BlankState

A BlankSlate component display an illustration, heading and a message all together.

For example, this component can be used to display a error on a 404 page, or an empty state after a search result

## Example

```jsx
<BlankState
  illoName="chatListBlankSlate"
  message="The page you are trying to see does not exists"
  title="Nothing to see here"
/>
```

## Props

| Prop            | Type      | Description                                                    |
| --------------- | --------- | -------------------------------------------------------------- |
| alignTop        | `bool`    | Will top aligned the content of the component                  |
| className       | `string`  | Custom class names to be added to the component.               |
| illo            | `element` | An instance of an Illo Component                               |
| illoName        | `string`  | DEPRECATED. Name of the illustration, from the Illo component. |
| illoSize        | `number`  | DEPRECATED. Size of the illustration, from the Illo component. |
| lightBackground | `bool`    | Will add a light background to the component                   |
| message         | `string`  | Message displayed in the content area                          |
| title           | `string`  | Title displayed in the content area                            |
