# Header

A SideNavigation.Item component is a button-based component used within [SideNavigation](../README.md).
This component could point to a url, or have a onClick event attach to it so we can do custom interaction.

## Example

```jsx
<SideNavigation>
  <SideNavigation.Section>
    <SideNavigation.Item icon={<Icon name="user" />} count={25}>
      Item #1
    </SideNavigation.Item>
    <SideNavigation.Item href="https://google.com/">
      Item #2
    </SideNavigation.Item>
  </SideNavigation.Section>
</SideNavigation>
```

## Props

| Prop        | Type      | Description                                                                          |
| ----------- | --------- | ------------------------------------------------------------------------------------ |
| active      | `boolean` | It highlights the item                                                               |
| badge       | `string`  | Txt of the badge that is displaying when SideNavigation is collapsed.                |
| className   | `string`  | Custom class names to be added to the component.                                     |
| collapsable | `boolean` | When active, it hides everything except the icon, CSS :hover will show the full item |
| count       | `number`  | It display the value as a right floating badge                                       |
| disabled    | `boolean` | It fades the text and icon color, and no action could be executed from this item     |
| href        | `string`  | It will transform the item in a link, pointing to the value of this prop             |
| icon        | `Icon`    | It adds and icon at the beginning of the component                                   |
| muted       | `boolean` | It fades the text and icon color                                                     |
