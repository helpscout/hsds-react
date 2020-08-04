# Drop

A Drop component is a High-Order Component that connects a component with `PortalWrapper`. It abstracts logic related to mounting and auto-positioning the child component to the DOM, relative to it's original target element.

## Deprecation

This component will be deprecated. Please use `Pop` instead.

## Example

```jsx
import Animate from '../Animate'
import Drop from '../Drop'

const dropOptions = {
  id: 'MyPopover',
  timeout: 400,
}

const MyPopover = props => {
  const { children, closePortal, portalIsOpen } = props

  return (
    <Animate sequence="fade down" in={portalIsOpen} delay={300}>
      <div className="MyPopover">{children}</div>
    </Animate>
  )
}

export default Drop(dropOptions)(MyPopover)
```

## Options

| Prop         | Type   | Description                                                                                                  |
| ------------ | ------ | ------------------------------------------------------------------------------------------------------------ |
| autoPosition | `bool` | Determines whether this component should auto-position the child component when mounting. Default is `true`. |

## Props

| Prop             | Type     | Description                                                                                                                           |
| ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| direction        | `string` | Determines the preferred "drop" direction. Accepts `left`, `right`, `up`, `down`, or a combination of horizontal/vertical directions. |
| wrapperClassName | `string` | Custom className to add to the [PortalWrapper](../PortalWrapper) component.                                                           |

Drop is composed using [PortalWrapper](../PortalWrapper). Check out [PortalWrapper](../PortalWrapper) for additional HOC option and prop details.

### Render hooks

This component has special callback props tied into it's mounting cycle.

| Prop          | Type       | Description                                            |
| ------------- | ---------- | ------------------------------------------------------ |
| onBeforeOpen  | `function` | Fires when the component is mounted, but not rendered. |
| onOpen        | `function` | Fires as soon as the component has rendered.           |
| onBeforeClose | `function` | Fires when the component is about to unmount.          |
| onClose       | `function` | Fires after the component is unmounted.                |

See [Portal's documentation](../Portal#render-hooks) for more details.
