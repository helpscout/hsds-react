# Modal

A Modal component presents content within a container on top of the application's main UI. Modals can have multiple instances, in which case they will overlay on top of each other. This component supports [`react-router`](https://github.com/ReactTraining/react-router).


## Example

```jsx
<Modal trigger={<a>Click</a>}>
  <Modal.Body>
    Content
  </Modal.Body>
</Modal>
```


### React Router Modal

```jsx
<Modal path='/news-team/channel4' trigger={<a>Click</a>}>
  <Modal.Body>
    Content
  </Modal.Body>
</Modal>
```



## Props

| Prop | Type | Description |
| --- | --- | --- |
| cardClassName | `string` | Custom class names to be added to the child [Card](../Card) component. |
| containTabKeyPress | `bool` | Prevents tab/shift+tab focus from leaving the Modal. Default `true`. |
| className | `string` | Custom class names to be added to the component. |
| closeIcon | `bool` | Shows/hides the component's close icon UI. |
| closeIconRepositionDelay | `number ` | Amount of time before the [CloseButton](../../CloseButton) gets repositioned. |
| exact | `bool` | Used with `path` and React Router. Renders if path matches _exactly_ |
| isOpen | `bool` | Shows/hides the component. |
| overlayClassName | `string` | Custom class names to be added to the child [Overlay](../Overlay) component. |
| modalAnimationDelay | `number` | Custom [animation](../Animate) delay for the child [Card](../Card) component. |
| modalAnimationDuration | `number` | Custom [animation](../Animate) duration for the child [Card](../Card) component. |
| modalAnimationEasing | `string` | Custom [animation](../Animate) easing for the child [Card](../Card) component. |
| modalAnimationSequence | `array`/`string` | Custom [animation](../Animate) sequence for the child [Card](../Card) component. |
| modalFocusTimeout | `number` | Amount of time (`ms`) before the Modal force focuses. |
| overlayClassName | `string` | Custom class names to be added to the child [Overlay](../Overlay) component. |
| overlayAnimationDelay | `number` | Custom [animation](../Animate) delay for the child [Overlay](../Overlay) component. |
| overlayAnimationDuration | `number` | Custom [animation](../Animate) duration for the child [Overlay](../Overlay) component. |
| overlayAnimationEasing | `string` | Custom [animation](../Animate) easing for the child [Overlay](../Overlay) component. |
| overlayAnimationSequence | `array`/`string` | Custom [animation](../Animate) sequence for the child [Overlay](../Overlay) component. |
| overlayClassName | `string` | Custom class names to be added to the child [Overlay](../Overlay) component. |
| path | `string` | Renders component based on a [React Router path](https://reacttraining.com/react-router/web/api/Route/path-string). |
| seamless | `bool` | Renders content with the standard [Card](../Card) UI. |
| trigger | `element` | The UI the user clicks to trigger the modal. |
| wrapperClassName | `string` | Custom className to add to the [PortalWrapper](../../PortalWrapper) component. |


### Render hooks

This component has special callback props tied into it's mounting cycle.

| Prop | Type | Description |
| --- | --- | --- |
| onBeforeOpen | `function` | Fires when the component is mounted, but not rendered. |
| onOpen | `function` | Fires as soon as the component has rendered. |
| onBeforeClose | `function` | Fires when the component is about to unmount. |
| onClose | `function` | Fires after the component is unmounted. |

See [Portal's documentation](../../Portal#render-hooks) for more details.
