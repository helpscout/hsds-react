# SideNavigation

A SideNavigation component is used to group heading, links, buttons and other informations on the side of a page

## Components

The SideNavigation component is comprised of smaller components:

* [Button](./docs/Button.md)
* [Footer](./docs/Footer.md)
* [Header](./docs/Header.md)
* [Item](./docs/Item.md)
* [Section](./docs/Section.md)

## Example

```jsx
<SideNavigation collapsed={true}>
  <SideNavigation.Header label={headerLabel} badge={badge} />
  <SideNavigation.Section main={true} title="Folders">
    <SideNavigation.Item icon={<Icon name="user" />}>
      Folder 1
    </SideNavigation.Item>
    <SideNavigation.Item>Folder 2</SideNavigation.Item>
    <SideNavigation.Item>Folder 3</SideNavigation.Item>
    <SideNavigation.Item>Folder 4</SideNavigation.Item>
  </SideNavigation.Section>
</SideNavigation>
```

## Props

| Prop         | Type      | Description                                                                        |
| ------------ | --------- | ---------------------------------------------------------------------------------- |
| className    | `string`  | Custom class names to be added to the component.                                   |
| collapsed    | `boolean` | Flag to hide all content except item icons inside the main section.                |
| floatingMenu | `boolean` | Flag to adjust the layout on some children to use the sidebar in a drawer context. |
| width        | `number`  | Force the width of the component.                                                  |
