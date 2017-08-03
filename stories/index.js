import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import '../src/styles/blue.scss'
import {
  Animate,
  Avatar,
  Badge,
  Button,
  Card,
  CardBlock,
  Heading,
  Icon,
  Image,
  Input,
  Modal,
  Link,
  LoadingDots,
  Overlay,
  Select,
  Text,
  VisuallyHidden
} from '../src/index.js'

storiesOf('Animate', module)
  .add('default', () => (
    <div>
      Wait 1 second…
      <Animate sequence='FadeIn Down' wait={1000} duration={400}>
        <div className='dont-override-this'>Then, Fade In and Down</div>
      </Animate>
    </div>
  ))

storiesOf('Avatar', module)
  .add('default', () => <Avatar name='Ron Burgundy' image='https://media3.giphy.com/media/hUXSFaQ1zyiE8/200_s.gif' />)
  .add('sizes', () => (
    <div>
      <Avatar name='Ron Burgundy' size='lg' />
      <Avatar name='Ron Burgundy' size='md' />
      <Avatar name='Ron Burgundy' size='sm' />
    </div>
  ))

storiesOf('Badge', module)
  .add('default', () => <Badge>Badger</Badge>)
  .add('status', () => (
    <div>
      <Badge status='error'>Badger</Badge><br />
      <Badge status='info'>Badger</Badge><br />
      <Badge status='success'>Badger</Badge><br />
      <Badge status='warning'>Badger</Badge><br />
    </div>
  ))
  .add('styles', () => (
    <div>
      <Badge>Regular</Badge><br />
      <Badge white>White</Badge><br />
    </div>
  ))
  .add('size', () => (
    <div>
      <Badge size='md'>Regular</Badge><br />
      <Badge size='sm'>Small</Badge><br />
    </div>
  ))

storiesOf('Button', module)
  .add('default', () => <Button onClick={action('Button clicked')}>Click Me</Button>)
  .add('types', () => (
    <div>
      <Button>Regular</Button>
      <Button type='primary'>Primary</Button>
      <Button type='link'>Link</Button>
    </div>
  ))
  .add('sizes', () => (
    <div>
      <Button size='lg'>Large</Button>
      <Button size='md'>Medium</Button>
      <Button size='sm'>Small</Button>
    </div>
  ))
  .add('states', () => (
    <div>
      <Button state='success'>Success</Button>
      <Button state='error'>Error</Button>
      <Button state='warning'>Warning</Button>
    </div>
  ))
  .add('disabled', () => (
    <div>
      <Button disabled>Can't touch this!</Button>
    </div>
  ))

storiesOf('Card', module)
  .add('default', () => <Card>Hello</Card>)
  .add('link', () => <Card href='https://www.helpscout.net/'>Link to: https://www.helpscout.net/</Card>)
  .add('block', () => (
    <Card seamless>
      <CardBlock>Block One</CardBlock>
      <CardBlock>Block Two</CardBlock>
      <CardBlock>Block Three</CardBlock>
    </Card>
  ))

storiesOf('Image', module)
  .add('default', () => (
    <Image
      src='https://img.buzzfeed.com/buzzfeed-static/static/2014-12/5/11/enhanced/webdr06/longform-original-7538-1417798667-22.jpg?downsize=715:*&output-format=auto&output-quality=auto'
      alt='Not now, Arctic Puffin!'
      title='Not now, Arctic Puffin!'
      width='300'
    />
  ))

storiesOf('Input', module)
  .add('default', () => <Input />)
  .add('multiline', () => <Input multiline placeholder='This is a textarea!' autoFocus />)
  .add('multiline + resizable', () => <Input multiline={3} resizable autoFocus placeholder='This is a resizable textarea!' />)
  .add('label', () => <Input label='Labelled' autoFocus />)
  .add('placeholder', () => <Input placeholder='Hello' autoFocus />)
  .add('prefix + suffix', () => <Input prefix='$' suffix='.00' autoFocus />)
  .add('seamless', () => <Input seamless autoFocus />)
  .add('disabled', () => <Input disabled autoFocus />)
  .add('states', () => (
    <div>
      <Input state='error' autoFocus /><br />
      <Input state='success' helpText="You're Awesome!" autoFocus /><br />
      <Input state='warning' autoFocus />
    </div>
  ))
  .add('sizes', () => (
    <div>
      <Input autoFocus placeholder='Regular' /><br />
      <Input size='sm' autoFocus placeholder='Small' />
    </div>
  ))

storiesOf('Heading', module)
  .add('default', () => <Heading>I am heading. Behold my heading.</Heading>)
  .add('sizes', () => (
    <div>
      <Heading size='h1'>Font size: h1</Heading><br />
      <Heading size='h2'>Font size: h2</Heading><br />
      <Heading size='h3'>Font size: h3</Heading><br />
      <Heading size='h4'>Font size: h4</Heading><br />
      <Heading size='h5'>Font size: h5</Heading><br />
      <Heading size='h6'>Font size: h6</Heading><br />
      <Heading size='big'>Font size: Big</Heading><br />
      <Heading size='small'>Font size: Small</Heading><br />
    </div>
  ))
  .add('shades', () => (
    <div>
      <Heading size='small'>Small Heading Dark</Heading><br />
      <Heading size='small' light>Small Heading Light</Heading><br />
    </div>
  ))

storiesOf('Icon', module)
  .add('icons', () => {
    const icons = [
      'alert',
      'arrow-right',
      'attachment',
      'chat-active',
      'chat',
      'clock-large',
      'clock-small',
      'cross-large',
      'cross-medium',
      'cross-small',
      'document',
      'emoji',
      'helpscout-logo',
      'image-add',
      'image',
      'link',
      'meatball',
      'search',
      'star',
      'tick-large',
      'tick-small',
      'video'
    ].map(i => (
      <div style={{display: 'inline-block', margin: 12, textAlign: 'center'}}>
        <Icon name={i} key={i} center />
        <Text muted size='sm'>{i}</Text>
        <br />
      </div>
    ))

    return (<div>{icons}</div>)
  })
  .add('sizes', () => {
    const icons = [
      14, 16, 18, 24
    ].map(i => (
      <div style={{display: 'inline-block', margin: 12, textAlign: 'center'}}>
        <Icon name='emoji' size={i} key={i} center />
        <Text muted size='sm'>{i}</Text>
        <br />
      </div>
    ))

    return (<div>{icons}</div>)
  })
  .add('colors', () => {
    return (
      <div>
        <div>
          <Icon name='emoji' />
          <Text muted size='sm'>Regular</Text>
          <br />
        </div>
        <br />
        <div>
          <Icon name='emoji' muted />
          <Text muted size='sm'>Muted</Text>
          <br />
        </div>
      </div>
    )
  })

storiesOf('Modal', module)
  .add('default', () => (
    <Modal trigger={<Link>Open dis modal</Link>}>
      <div>
        <Heading>Title</Heading>
        <p>
          Bacon ipsum dolor amet filet mignon swine biltong ball tip ribeye. Bresaola strip steak t-bone andouille biltong. Short loin picanha shankle bresaola pastrami brisket turducken, kevin rump landjaeger kielbasa. Alcatra tongue shoulder leberkas.
        </p>
        <p>
          Tenderloin bacon chicken jowl cupim, sausage shank spare ribs kielbasa. Flank corned beef kevin pastrami short ribs pork andouille turkey sirloin strip steak. Shank tri-tip porchetta beef ribs salami. Pork chop tail kielbasa, turkey pork loin filet mignon chicken jowl alcatra hamburger salami cupim.
        </p>
        <p>
          Corned beef pork belly cupim turkey, filet mignon bresaola short ribs sirloin brisket. Fatback turkey strip steak tenderloin pig ham hock salami cow filet mignon ribeye. Brisket drumstick capicola rump. Biltong jowl prosciutto fatback bresaola strip steak pork chop shankle tri-tip shank salami pancetta ham hock. Cupim kielbasa doner salami, meatball capicola filet mignon pastrami.
        </p>
        <p>
          Bacon ipsum dolor amet filet mignon swine biltong ball tip ribeye. Bresaola strip steak t-bone andouille biltong. Short loin picanha shankle bresaola pastrami brisket turducken, kevin rump landjaeger kielbasa. Alcatra tongue shoulder leberkas.
        </p>
        <p>
          Tenderloin bacon chicken jowl cupim, sausage shank spare ribs kielbasa. Flank corned beef kevin pastrami short ribs pork andouille turkey sirloin strip steak. Shank tri-tip porchetta beef ribs salami. Pork chop tail kielbasa, turkey pork loin filet mignon chicken jowl alcatra hamburger salami cupim.
        </p>
        <p>
          Corned beef pork belly cupim turkey, filet mignon bresaola short ribs sirloin brisket. Fatback turkey strip steak tenderloin pig ham hock salami cow filet mignon ribeye. Brisket drumstick capicola rump. Biltong jowl prosciutto fatback bresaola strip steak pork chop shankle tri-tip shank salami pancetta ham hock. Cupim kielbasa doner salami, meatball capicola filet mignon pastrami.
        </p>
      </div>
    </Modal>
  ))

storiesOf('Link', module)
  .add('default', () => <Link href='https://github.com/helpscout/blue'>Linky</Link>)

storiesOf('LoadingDots', module)
  .add('default', () => <LoadingDots />)

storiesOf('Overlay', module)
  .add('default', () => (
    <Overlay style={{width: '500px', height: '400px'}} onClick={action('Overlay clicked')}>
      <Card>Not now, Arctic Puffin!</Card>
    </Overlay>
  ))

storiesOf('Select', module)
  .add('default', () => (
    <Select options={['one', 'two', 'three']} />
  ))
  .add('groups', () => {
    const options = [
      {
        label: 'Group 1',
        value: [
          'one', 'two', 'three'
        ]
      },
      {
        label: 'Group 2',
        value: [
          'four', 'five', 'six', 'seven'
        ]
      }
    ]
    return (
      <Select options={options} onChange={action('value')} value='five' />
    )
  })
  .add('placeholder', () => (
    <Select placeholder='Select one' options={['one', 'two', 'three']} />
  ))
  .add('prefix', () => (
    <Select prefix='Filter by: ' options={['One']} />
  ))
  .add('states', () => (
    <div>
      <Select state='error' /><br />
      <Select state='success' /><br />
      <Select state='warning' />
    </div>
  ))
  .add('sizes', () => (
    <div>
      <Select autoFocus placeholder='Regular' /><br />
      <Select size='sm' autoFocus placeholder='Small' />
    </div>
  ))

storiesOf('Text', module)
  .add('default', () => <Text>I am text. Behold my text.</Text>)
  .add('sizes', () => (
    <div>
      <Text size='48'>Font size: 48</Text><br />
      <Text size='20'>Font size: 20</Text><br />
      <Text size='16'>Font size: 16</Text><br />
      <Text size='15'>Font size: 15</Text><br />
      <Text size='14'>Font size: 14</Text><br />
      <Text size='13'>Font size: 13</Text><br />
      <Text size='12'>Font size: 12</Text><br />
      <Text size='11'>Font size: 11</Text><br />
    </div>
  ))
  .add('shades', () => (
    <div>
      <Text>Default</Text><br />
      <Text subtle>Subtle</Text><br />
      <Text muted>Muted</Text><br />
      <Text faint>Faint</Text><br />
    </div>
  ))
  .add('states', () => (
    <div>
      <Text>Default</Text><br />
      <Text state='error'>Error</Text><br />
      <Text state='success'>Success</Text><br />
      <Text state='warning'>Warning</Text><br />
    </div>
  ))
  .add('truncate', () => (
    <div>
      <Text truncate>Buddy (Will Ferrell) was accidentally transported to the North Pole as a toddler and raised to adulthood among Santa's elves. Unable to shake the feeling that he doesn't fit in, the adult Buddy travels to New York, in full elf uniform, in search of his real father.</Text>
    </div>
  ))

storiesOf('VisuallyHidden', module)
  .add('default', () => <VisuallyHidden>Peek-a-boo! You can't see me</VisuallyHidden>)
  .add('focusable', () => <VisuallyHidden focusable><a href='#'>Focusable!</a></VisuallyHidden>)
