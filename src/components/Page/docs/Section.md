# Section

Sections live inside `Card` components and their purpose is to divide content inside them.

A clear indication of the need of more sections is when there are extra headings in the content.

The use of sections, besides of being good for semantic purposes, allows the headings of each section to behave just like the headers in Responsive mode.

`isResponsive` can be set on the `Page.Section`, but normally is better to set it on the parent `Page` component, so it doesn't have to be done individually on each section.

## Example

```jsx
<Page isResponsive>
  <Page.Card>
    <Page.Section>
      <h1>Section 1</h1>
      <p>Content under section 1</p>
    </Page.Section>
    <Page.Section>
      <h2>Section 2</h2>
      <p>Content under section 2</p>
    </Page.Section>
  </Page.Card>
</Page>
```

## Props

| Prop         | Type      | Description                                      |
| ------------ | --------- | ------------------------------------------------ |
| className    | `string`  | Custom class names to be added to the component. |
| isResponsive | `boolean` | Enables responsive styles. Default `false`.      |
