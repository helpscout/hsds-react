# Modal

A Modal component presents content within a container on top of the application's main UI. Modals can have multiple instances, in which case they will overlay on top of each other. This component supports [`react-router`](https://github.com/ReactTraining/react-router).

There are two versions of the Modal component, version two is the new standard as version 1 Modals will soon be deprecated.

## Example (Version 1)

```jsx
<Modal trigger={<a>Click</a>}>
  <Modal.Body>Content</Modal.Body>
</Modal>
```

## Example (Version 2)

```jsx
<Modal
  version={2}
  title={'Title'}
  description={'Description'}
  trigger={<a>Click</a>}
>
  <Modal.Body>
    Content
    <Modal.ActionFooter />
  </Modal.Body>
</Modal>
```

### React Router Modal

```jsx
<Modal path="/news-team/channel4" trigger={<a>Click</a>}>
  <Modal.Body>Content</Modal.Body>
</Modal>
```

## Props

| Prop                     | Type             | Description                                                                                                         |
| ------------------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------- |
| cardClassName            | `string`         | Custom class names to be added to the child [Card](../Card) component.                                              |
| containTabKeyPress       | `bool`           | Prevents tab/shift+tab focus from leaving the Modal. Default `true`.                                                |
| className                | `string`         | Custom class names to be added to the component.                                                                    |
| closeIcon                | `bool`           | Shows/hides the component's close icon UI.                                                                          |
| closeIconRepositionDelay | `number`         | Amount of time before the [CloseButton](../../CloseButton) gets repositioned.                                       |
| description              | `string`         | Renders in version 2 Modals beneath the title. Default `null`.                                                      |
| exact                    | `bool`           | Used with `path` and React Router. Renders if path matches _exactly_                                                |
| icon                     | `string`         | Renders as an `Icon` in the top left corner of a version 2 Modal header. Default `null`.                            |
| illo                     | `element`        | Expects an `Illo` to be displayed in a version 2 Modal header. Default `null`.                                      |
| illoSize                 | `number`         | The size to render the provided `Illo` in a version 2 Modal header. Default `60`.                                   |
| isOpen                   | `bool`           | Shows/hides the component.                                                                                          |
| kind                     | `string`         | The kind of version 2 Modal style to apply. (DEFAULT, BRANDED, ALERT, SEQUENCE). Default `DEFAULT`                  |
| overlayClassName         | `string`         | Custom class names to be added to the child [Overlay](../Overlay) component.                                        |
| modalAnimationDelay      | `number`         | Custom [animation](../Animate) delay for the child [Card](../Card) component.                                       |
| modalAnimationDuration   | `number`         | Custom [animation](../Animate) duration for the child [Card](../Card) component.                                    |
| modalAnimationEasing     | `string`         | Custom [animation](../Animate) easing for the child [Card](../Card) component.                                      |
| modalAnimationSequence   | `array`/`string` | Custom [animation](../Animate) sequence for the child [Card](../Card) component.                                    |
| modalFocusTimeout        | `number`         | Amount of time (`ms`) before the Modal force focuses.                                                               |
| numSteps                 | `number`         | Total number of steps to be used in a version 2 Sequence Modal. Default `1`.                                        |
| overlayClassName         | `string`         | Custom class names to be added to the child [Overlay](../Overlay) component.                                        |
| overlayAnimationDelay    | `number`         | Custom [animation](../Animate) delay for the child [Overlay](../Overlay) component.                                 |
| overlayAnimationDuration | `number`         | Custom [animation](../Animate) duration for the child [Overlay](../Overlay) component.                              |
| overlayAnimationEasing   | `string`         | Custom [animation](../Animate) easing for the child [Overlay](../Overlay) component.                                |
| overlayAnimationSequence | `array`/`string` | Custom [animation](../Animate) sequence for the child [Overlay](../Overlay) component.                              |
| overlayClassName         | `string`         | Custom class names to be added to the child [Overlay](../Overlay) component.                                        |
| path                     | `string`         | Renders component based on a [React Router path](https://reacttraining.com/react-router/web/api/Route/path-string). |
| seamless                 | `bool`           | Renders content with the standard [Card](../Card) UI.                                                               |
| state                    | `string`         | State to use when styling a version 2 Modal (currently only `error` state is custom styled). Default ``.            |
| step                     | `number`         | Current step to be used in a version 2 Sequence Modal. Default `1`.                                                 |
| trigger                  | `element`        | The UI the user clicks to trigger the modal.                                                                        |
| version                  | `number`         | Version of the Modal styles to apply (version 2 is the new standard, version 1 is legacy). Default `1`.             |
| wrapperClassName         | `string`         | Custom className to add to the [PortalWrapper](../../PortalWrapper) component.                                      |

### Render hooks

This component has special callback props tied into it's mounting cycle.

| Prop          | Type       | Description                                            |
| ------------- | ---------- | ------------------------------------------------------ |
| onBeforeOpen  | `function` | Fires when the component is mounted, but not rendered. |
| onOpen        | `function` | Fires as soon as the component has rendered.           |
| onBeforeClose | `function` | Fires when the component is about to unmount.          |
| onClose       | `function` | Fires after the component is unmounted.                |

See [Portal's documentation](../../Portal#render-hooks) for more details.
