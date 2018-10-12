# Actions

This component is a presentational wrapper used to a title/subtitle within a [`Page`](./Page.md).

## Example

```jsx
<Page>
  <Page.Card>
    <Page.Header
      title="Contact Form"
      subtitle="Fill out everything please. K thx."
    />
    ...
  </Page.Card>
</Page>
```

## Props

| Prop             | Type      | Description                                         |
| ---------------- | --------- | --------------------------------------------------- |
| className        | `string`  | Custom class names to be added to the component.    |
| isResponsive     | `boolean` | Enables responsive styles. Default `false`.         |
| title            | `string`  | The [`Heading`](../../Heading) title to render.     |
| subtitle         | `string`  | The [`Text`](../../Text) subtitle to render.        |
| withBorder       | `boolean` | Renders an [`Hr`](../../Hr) border. Default `true`. |
| withBottomMargin | `boolean` | Renders bottom margin styles. Default `true`.       |
