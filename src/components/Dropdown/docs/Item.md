# Item

An Item component is a list-item wrapper for individual actions or links that appear within a Dropdown [Menu](./Menu.md)


## Example

```html
<Dropdown.Menu>
  <Dropdown.Item onClick={saySignOff} />
    Ron
  </Dropdown.Item />
</Dropdown.Menu>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| onBlur | function | Callback when select is blurred. |
| onChange | function | Callback when select value is changed. |
| onFocus | function | Callback when select is focused. |
| className | string | Custom class names to be added to the component. |
