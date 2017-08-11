import React from 'react'
import { storiesOf } from '@storybook/react'
import { Heading, Modal, Link } from '../src/index.js'

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
  .add('open', () => (
    <Modal isOpen={true} trigger={<Link>Clicky</Link>}>
      <div>
        <Heading>Title</Heading>
        <p>
          Bacon ipsum dolor amet filet mignon swine biltong ball tip ribeye. Bresaola strip steak t-bone andouille biltong. Short loin picanha shankle bresaola pastrami brisket turducken, kevin rump landjaeger kielbasa. Alcatra tongue shoulder leberkas.
        </p>
      </div>
    </Modal>
  ))
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
