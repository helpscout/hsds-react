# Trigger

A Trigger component is an enhanced [Button](../Button) component used specifically for [Dropdowns](./Dropdown.md).


## Example

```jsx
<Dropdown>
  <Dropdown.Trigger>Choose…</Dropdown.Trigger>
</Dropdown>
```


### Custom Markup

By default, if a text-node is passed into Trigger, it will render the text-node into an enhanced [Button](../../Button) wrapper. However, you can provide you own component into Trigger as well.

```jsx
<Dropdown>
  <Dropdown.Trigger>
    <a>Link Trigger</a>
  </Dropdown.Trigger>
</Dropdown>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| children | `string`/`number`/`element` | Single child component/text-node to render. Single child component/text-node to render. |
| className | `string` | Custom class names to be added to the component. |
| direction | `string` | Direction of the dropdown. |
| onBlur | `function` | Callback function when component blurs. |
| onClick | `function` | Callback function when component is clicked. |
| onFocus | `function` | Callback function when component focuses. |

For additional props, see the [Button](../Button) component.
