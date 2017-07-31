import {
  Avatar,
  Badge,
  Button,
  Card,
  CardBlock,
  Heading,
  Icon,
  Image,
  Input,
  Label,
  Link,
  LoadingDots,
  Overlay,
  Select,
  Text,
  VisuallyHidden
} from '..'

const components = [
  Avatar,
  Badge,
  Button,
  Card,
  CardBlock,
  Heading,
  Icon,
  Image,
  Input,
  Label,
  Link,
  LoadingDots,
  Overlay,
  Select,
  Text,
  VisuallyHidden
]

const componentTestHelper = (component) => {
  test(component.name, () => {
    expect(component).toBeTruthy()
    expect(typeof component).toBe('function')
  })
}

components.forEach(c => componentTestHelper(c))
