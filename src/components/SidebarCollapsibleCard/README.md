# SidebarCollaspibleCard

A SidebarCollapsibleCard component contains content with the ability to collapse or expand, presented in a Card UI. This component is typically used in sidebars. This component uses the [Collapsible](../Collapsible) component to handle the expand/collapse interactions.


## Example

```html
<SidebarCollapsibleCard title='Quote'>
  <div>By the beard of Zeus!</div>
</SidebarCollapsibleCard>
```


### Custom Header

Typically, this component renders a title provided by the `title` prop. However, you can provide it with custom markup to render in the header area via the `header` prop.

```html
const customHeader = (
  <div className='custom-heading'>
    <h1>Big Quote></h1>
  </div>
)

<SidebarCollapsibleCard header={customHeader}>
  <div>By the beard of Zeus!</div>
</SidebarCollapsibleCard>
```

Note: `header` will override `title` if both are used.


## Props

| Prop | Type | Description |
| --- | --- | --- |
| className | string | Custom class names to be added to the component. |
| duration | number | Time (ms) for the expand/collapse animation. |
| header | element | Custom markup to render into the header of this component. |
| isOpen | boolean | Opens/collapses the component. |
| onClose | function | Callback function when the component closes. |
| onOpen | function | Callback function when the component opens. |
| style | string | Custom styles to be added to the component. |
| title | string | Title for the header in this component. |
