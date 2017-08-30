# PortalWrapper

A PortalWrapper component is a High-Order Component that connects a component with [Portal](../Portal). It abstracts logic related to mounting/events, allowing the child component to be simpler.


## Example

```js
import Overlay from '../Overlay'
import PortalWrapper from '../PortalWrapper'

const portalOptions = {
  id: 'MyModal',
  timeout: 400
}

const MyModal = props => {
  const {
    children,
    closePortal,
    portalIsOpen
  } = props

  return (
    <div className='MyModal'>
      <div className='MyModalContent'>
        {children}
      </div>
      <Overlay onClick={closePortal} />
    </div>
  )
}

export default PortalWrapper(portalOptions)(MyModal)
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| isOpen | boolean | Shows/hides the Portal'ed component. |
| timeout | number | Delay before the Portal'ed component is unmounted from the DOM. Default is `0`. |


### Render hooks

This component has special callback props tied into it's mounting cycle.

| Prop | Type | Description |
| --- | --- | --- |
| onBeforeOpen | function | Fires when the component is mounted, but not rendered. |
| onOpen | function | Fires as soon as the component has rendered. |
| onBeforeClose | function | Fires when the component is about to unmount. |
| onClose | function | Fires after the component is unmounted. |

See [Portal's documentation](../Portal#render-hooks) for more details.
