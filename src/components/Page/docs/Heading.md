# Heading

This component leverages `<Heading>` for use inside [`Page`](./Page.md) components.

Pages usually have one [`Header`](./Header.md), whose contents are always a title and sometimes a subtitle, for the title `<Page.Header>` uses this component in _primary_ mode, which means the heading will be an `<h1>` element.

_Secondary_ mode is for additional headings within a page and will be rendered as `<h2>` elements.

Styles (spacing and font sizes) are handled specifically for use within Pages.

## Example

```jsx
<Page>
  <Page.Card>
    <Page.Header
      title="Contact Form"
      subtitle="Fill out everything please. K thx."
    />
    <Page.Heading secondary>Contact Details</Page.Heading>
    ...
    <Page.Heading secondary>Address Details</Page.Heading>
    ...
  </Page.Card>
</Page>
```

## Props

| Prop      | Type      | Description                                        |
| --------- | --------- | -------------------------------------------------- |
| className | `string`  | Custom class names to be added to the component.   |
| secondary | `boolean` | Signals a secondary (h2) heading. Default `false`. |
