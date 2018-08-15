# Illo

An Illo component renders an SVG illustration.

## Example

```jsx
<Illo name='blankSlateBurgandy' />
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| className | `string` | Custom class names to be added to the component. |
| color | `string` | Custom color for SVG image on primary paths. |
| colorSecondary | `string` | Custom color for SVG image on secondary paths. |
| colorUi | `string` | Custom color for SVG image on UI themed paths. |
| colorUiDark | `string` | Custom color for SVG image on UI dark themed paths. |
| colorUiLight | `string` | Custom color for SVG image on UI light themed paths. |
| colorUiTransparent | `string` | Custom color for SVG image on UI transparent themed paths. Default `transparent`. |
| colorUiWhite | `string` | Custom color for SVG image on UI white themed paths. Default `white`. |
| name | `string` | Determines the SVG image. Required. |
| onClick | `function` | Callback function when component is clicked. |
| size | `number`/`string` | Adjusts the size of the component. |
| title | `string` | Provides a name for the component. |
