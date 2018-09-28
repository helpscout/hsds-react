# Content

This component is used to container content within a [`Page`](./Page.md). This component is required for responsive style support.

## Example

```jsx
<Page>
  <Page.Card>
    <Page.Header />
    <Page.Content>...</Page.Content>
  </Page.Card>
</Page>
```

## Props

| Prop         | Type      | Description                                      |
| ------------ | --------- | ------------------------------------------------ |
| children     | `any`     | Content to render.                               |
| className    | `string`  | Custom class names to be added to the component. |
| isResponsive | `boolean` | Enables responsive styles. Default `false`.      |
