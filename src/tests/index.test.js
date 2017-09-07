import {
  Animate,
  Avatar,
  AvatarStack,
  Badge,
  Button,
  Card,
  CardBlock,
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
  ProgressBar,
  Radio,
  Select,
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
  CardBlock,
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
  ProgressBar,
  Radio,
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
