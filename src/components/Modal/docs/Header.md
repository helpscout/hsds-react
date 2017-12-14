# Header

A Modal.Header component contains content that appears at the top of a [Modal](./Modal.md). This component is constructed using [Toolbar](../../Toolbar).


## Example

```jsx
<Modal>
  <Modal.Header>
    ...
  </Modal.Header>
  <Modal.Body>
    ...
  </Modal.Body>
</Modal>
```


### Right-hand actions

By default, a [CloseButton](../CloseButton) appears at the top right-hand side of a Modal. However, if you wish to render content on the right-hand side of your Modal.Header, it is recommended that you disable the CloseButton by passing in `closeIcon={false}`.

```jsx
<Modal closeIcon={false}>
  <Modal.Header>
    <Toolbar.Item>...</Toolbar.Item>
    <Toolbar.Item>...</Toolbar.Item>
  </Modal.Header>
  <Modal.Body>
    ...
  </Modal.Body>
</Modal>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| className | `string` | Custom class names to be added to the component. |

For more props, check out [Toolbar](../../Toolbar).
