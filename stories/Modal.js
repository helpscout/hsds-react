import React from 'react'
import PropTypes from 'prop-types'
import { storiesOf } from '@storybook/react'
import { Heading, Modal, Link } from '../src/index.js'
import { MemoryRouter } from 'react-router'
import { Route } from 'react-router-dom'

storiesOf('Modal', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
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
  .add('open', () => (
    <Modal isOpen trigger={<Link>Clicky</Link>}>
      <div>
        <Heading>Title</Heading>
        <p>
          Bacon ipsum dolor amet filet mignon swine biltong ball tip ribeye. Bresaola strip steak t-bone andouille biltong. Short loin picanha shankle bresaola pastrami brisket turducken, kevin rump landjaeger kielbasa. Alcatra tongue shoulder leberkas.
        </p>
      </div>
    </Modal>
  ))
  .add('custom close trigger', () => {
    class Contents extends React.Component {
      render () {
        return (
          <p>
            <button onClick={this.context.closePortal}>Close me</button>
          </p>
        )
      }
    }

    Contents.contextTypes = {
      closePortal: PropTypes.func
    }

    return (
      <Modal trigger={<Link>Open me</Link>}>
        <Contents />
      </Modal>
    )
  })
  .add('nested', () => (
    <Modal trigger={<Link>Clicky</Link>}>
      <div>
        <Heading>Title</Heading>
        <p>
          Bacon ipsum dolor amet filet mignon swine biltong ball tip ribeye. Bresaola strip steak t-bone andouille biltong. Short loin picanha shankle bresaola pastrami brisket turducken, kevin rump landjaeger kielbasa. Alcatra tongue shoulder leberkas.
        </p>

        <Modal trigger={<Link>Level 2</Link>}>
          <div>
            <Heading>Level 2</Heading>
            <p>
              Bacon ipsum dolor amet filet mignon swine biltong ball tip ribeye. Bresaola strip steak t-bone andouille biltong. Short loin picanha shankle bresaola pastrami brisket turducken, kevin rump landjaeger kielbasa. Alcatra tongue shoulder leberkas.
            </p>
          </div>

          <Modal trigger={<Link>Level 3</Link>}>
            <div>
              <Heading>Level 3</Heading>
              <p>
                Bacon ipsum dolor amet filet mignon swine biltong ball tip ribeye. Bresaola strip steak t-bone andouille biltong. Short loin picanha shankle bresaola pastrami brisket turducken, kevin rump landjaeger kielbasa. Alcatra tongue shoulder leberkas.
              </p>
            </div>
          </Modal>
        </Modal>

      </div>
    </Modal>
  ))
  .add('custom mounting selector', () => {
    return (
      <div>
        <p>Render modal here:</p>
        <div className='render-modal-here' />

        <Modal trigger={<Link>Clicky</Link>} renderTo='.render-modal-here'>
          <div>
            <Heading>Title</Heading>
            <p>
              Bacon ipsum dolor amet filet mignon swine biltong ball tip ribeye. Bresaola strip steak t-bone andouille biltong. Short loin picanha shankle bresaola pastrami brisket turducken, kevin rump landjaeger kielbasa. Alcatra tongue shoulder leberkas.
            </p>
          </div>
        </Modal>
      </div>
    )
  })
  .add('lifecycle events', () => {
    const onBeforeOpen = (modalOpen) => {
      console.log('Before open!')
      setTimeout(() => {
        modalOpen()
      }, 500)
    }
    const onBeforeClose = (modalClose) => {
      console.log('Before close!')
      setTimeout(() => {
        modalClose()
      }, 500)
    }
    return (
      <div>
        <p>onBeforeOpen: 500 delay</p>
        <p>onBeforeClose: 500 delay</p>
        <Modal
          className='weee'
          onBeforeOpen={onBeforeOpen}
          onBeforeClose={onBeforeClose}
          trigger={<Link>Clicky</Link>}
        >
          <div>
            <Heading>Title</Heading>
            <p>
              Bacon ipsum dolor amet filet mignon swine biltong ball tip ribeye. Bresaola strip steak t-bone andouille biltong. Short loin picanha shankle bresaola pastrami brisket turducken, kevin rump landjaeger kielbasa. Alcatra tongue shoulder leberkas.
            </p>
          </div>
        </Modal>
      </div>
    )
  })
  .add('routes', () => {
    const onBeforeOpen = (open) => {
      setTimeout(() => {
        open()
      }, 500)
    }
    return (
      <div>
        <h1>Routes</h1>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/team'>Team</Link>
          </li>
          <li>
            <Link to='/team/brick'>Brick</Link>
          </li>
        </ul>

        <Modal path='/team' onBeforeOpen={onBeforeOpen}>
          <h1>Team Modal</h1>
          <p>Modal content</p>
        </Modal>

        <Modal path='/team/brick'>
          <h1>Team Modal: Brick</h1>
          <p>Modal inner content</p>
        </Modal>

        <Route exact path='/' render={props => (
          <div>
            <h1>HOME PAGE</h1>
          </div>
        )} />
        <Route path='/team' render={props => (
          <div>
            <h1>TEAM PAGE</h1>
          </div>
        )} />
      </div>
    )
  })
