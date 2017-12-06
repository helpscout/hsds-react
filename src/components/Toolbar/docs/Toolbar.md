# Toolbar

A Toolbar component is UI component that displays an array of actions and items.

This component is constructed using the [Flexy](../../Flexy/docs/Flexy.md) component.


## Example

```jsx
<Toolbar>
  <Toolbar.Item>
    <Icon name='chat' />
  </Toolbar.Item>
  <Toolbar.Block>
    <Heading>News Team!</Heading>
  </Toolbar.Block>
</Toolbar>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| align | `string` | Determines the vertical alignment of Flexy child elements. Default is `middle`. |
| className | `string` | Custom class names to be added to the component. |
| gap | `string` | Determines the amount of spacing between Flexy child elements. |
| just | `string` | Determines the horizontal alignment of Flexy child elements. |
| shadow | `bool` | Renders a drop-shadow. |
| placement | `string` | Determines the border placement on the component. |
| theme | `string` | Determines the thematic colors of the component. |


## Placement

| Value | Description |
| --- | --- |
| `top` | Renders the border at the bottom. Default. |
| `bottom` | Renders the border at the top. Default. |


## Themes

| Value | Description |
| --- | --- |
| `default` | Renders a white background. Default. |
| `note` | Renders a yellow background. Default. |
