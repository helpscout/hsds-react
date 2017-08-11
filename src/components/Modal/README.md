# Modal

A Modal component presents content within a container on top of the application's main UI. Modals can have multiple instances, in which case they will overlay on top of each other.


## Example

```html
<Modal trigger={<a>Click</a>}>
  Content
</Modal>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| className | string | Custom class names to be added to the component. |
| closeIcon | boolean | Shows/hides the component's close icon UI. |
| isOpen | boolean | Shows/hides the component. |
| trigger | element | The UI the user clicks to trigger the modal. Required. |
