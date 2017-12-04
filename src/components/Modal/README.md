# Modal

A Modal component presents content within a container on top of the application's main UI. Modals can have multiple instances, in which case they will overlay on top of each other. This component supports [`react-router`](https://github.com/ReactTraining/react-router).


## Example

```jsx
<Modal trigger={<a>Click</a>}>
  Content
</Modal>
```


### React Router Modal

```jsx
<Modal path='/news-team/channel4' trigger={<a>Click</a>}>
  Content
</Modal>
```



## Props

| Prop | Type | Description |
| --- | --- | --- |
| className | `string` | Custom class names to be added to the component. |
| closeIcon | `bool` | Shows/hides the component's close icon UI. |
| exact | `bool` | Used with `path` and React Router. Renders if path matches _exactly_ |
| isOpen | `bool` | Shows/hides the component. |
| onScroll | `function` | Callback function when inner Scrollable is scrolled. |
| path | `string` | Renders component based on a [React Router path](https://reacttraining.com/react-router/web/api/Route/path-string). |
| scrollFade | `bool` | Enables the upper fade-to-white styles. Default `true`. |
| scrollableRef | `function` | Retrieves the scrollable node. |
| seamless | `bool` | Renders content with the standard [Card](../Card) UI. |
| trigger | `element` | The UI the user clicks to trigger the modal. |


### Render hooks

This component has special callback props tied into it's mounting cycle.

| Prop | Type | Description |
| --- | --- | --- |
| onBeforeOpen | `function` | Fires when the component is mounted, but not rendered. |
| onOpen | `function` | Fires as soon as the component has rendered. |
| onBeforeClose | `function` | Fires when the component is about to unmount. |
| onClose | `function` | Fires after the component is unmounted. |

See [Portal's documentation](../Portal#render-hooks) for more details.
