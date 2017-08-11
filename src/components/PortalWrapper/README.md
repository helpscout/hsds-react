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
