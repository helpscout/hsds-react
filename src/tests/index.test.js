import {
  Animate,
  Avatar,
  AvatarStack,
  Badge,
  Button,
  Card,
  Checkbox,
  Choice,
  ChoiceGroup,
  Flexy,
  FormGroup,
  Grid,
  Heading,
  Icon,
  Image,
  Input,
  Label,
  Link,
  LoadingDots,
  Overlay,
  Portal,
  PortalWrapper,
  ProgressBar,
  Radio,
  RouteWrapper,
  Select,
  Scrollable,
  Text,
  VisuallyHidden
} from '..'

const components = [
  Animate,
  Avatar,
  AvatarStack,
  Badge,
  Button,
  Card,
  Checkbox,
  Choice,
  ChoiceGroup,
  Flexy,
  FormGroup,
  Grid,
  Heading,
  Icon,
  Image,
  Input,
  Label,
  Link,
  LoadingDots,
  Overlay,
  Portal,
  PortalWrapper,
  ProgressBar,
  RouteWrapper,
  Radio,
  Scrollable,
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
