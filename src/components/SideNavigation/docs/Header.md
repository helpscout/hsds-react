# Header

A SideNavigation.Header component is a layout-based component used within [SideNavigation](../README.md).

## Example

```jsx
<SideNavigation>
  <SideNavigation.Header label="Google" href="https://google.com/" />
</SideNavigation>
```

## Props

| Prop      | Type      | Description                                                                 |
| --------- | --------- | --------------------------------------------------------------------------- |
| badge     | `string`  | Text of the badge that is displaying when SideNavigation is collapsed.      |
| className | `string`  | Custom class names to be added to the component.                            |
| collapsed | `boolean` | When active, it replaces the label with a badge                             |
| href      | `string`  | It will transform the heading in a link, pointing to the value of this prop |
| label     | `string`  | Text of the heading or link                                                 |
