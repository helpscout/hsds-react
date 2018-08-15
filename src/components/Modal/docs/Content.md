# Content

A Modal.Content component contains content that appears within a [Modal](./Modal.md). It can be used to group other Modal sub-components, such as [Header](./Header.md), [Body](./Body.md), and [Footer](./Footer.md).


## Example

```jsx
<Modal>
  <Modal.Content>
    ...
  </Modal.Content>
</Modal>
```

### Grouping sub-components

```jsx
<Modal>
  <Modal.Content>
    <Modal.Header>
      ...
    </Modal.Header>
    <Modal.Body>
      ...
    </Modal.Body>
  </Modal.Content>
</Modal>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| className | `string` | Custom class names to be added to the component. |
