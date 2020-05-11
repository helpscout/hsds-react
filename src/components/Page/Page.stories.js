import React from 'react'
import styled from 'styled-components'
import { PageDecorator } from '../../utilities/storybook'
import { Button, Input, Page } from '../index'

export default {
  component: Page,
  title: 'Components/Structural/Page',
}

const renderPropCode = `
<Page.Header
  render={
    ({ Title, Subtitle }) => (
      <div>
        <Title headingLevel="h1">Headers!</Title>
        <Subtitle>Oh so nice</Subtitle>
      </div>
    )
} />`

const titleSubtitlePropCode = `
<Page.Header
  title="A good and thoughtful title"
  subtitle="With an equally insightful subtitle"
/>`

const renderPropCodeH2 = `
<Page.Header
  render={
    ({ Title, Subtitle }) => (
      <div>
        <Title headingLevel="h2">Headers!</Title>
        <Subtitle>Oh so nice</Subtitle>
      </div>
    )
} />`

const renderPropCodeSecondary = `
<Page.Header
  withBorder={false}
  render={
    ({ Title, Subtitle }) => (
      <div>
        <Title headingLevel="h2" isSecondary>Headers!</Title>
        <Subtitle>Oh so nice</Subtitle>
      </div>
    )
} />`

const P = styled('div')`
  margin: 0 0 1.5em 0;
  padding: 0;
  font-size: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`

export const _Header = () => (
  <Page>
    <Page.Card>
      <Page.Section>
        <Page.Header
          render={({ Title, Subtitle }) => (
            <div>
              <Title headingLevel="h1">Headers!</Title>
              <Subtitle>Oh so nice</Subtitle>
            </div>
          )}
        />
        <Page.Content>
          <P>Each Card can have one or more Headers.</P>
          <P>
            The Header gives us one special prop:{' '}
            <code style={{ color: 'dodgerblue' }}>render</code>
          </P>
          <P>
            <code style={{ color: 'dodgerblue' }}>render</code> takes a function
            with 2 arguments: <code style={{ color: 'dodgerblue' }}>Title</code>{' '}
            and <code style={{ color: 'dodgerblue' }}>Subtitle</code>
          </P>
          <P>
            Those 2 are React Components with all the pretty styles ready, use
            like this:
          </P>
          <pre>
            <code style={{ color: 'dodgerblue' }}>{renderPropCode}</code>
          </pre>
          <P>
            Inside <code style={{ color: 'dodgerblue' }}>render</code> aside
            from those 2, you are free to add whatever markup you need: icons,
            links, tooltips, etc
          </P>
          <P>
            <code style={{ color: 'dodgerblue' }}>Title</code> has 2 props:
            <ul>
              <li>
                <code style={{ color: 'dodgerblue' }}>headingLevel</code>: The
                html tag to use "h1" or "h2", has no effect on looks, just
                semantics
              </li>
              <li>
                Reason being: there should only be one "h1"{' '}
                <strong>per Page</strong>
              </li>
              <li>
                So, if you have a 2nd Card, use:
                <pre>
                  <code style={{ color: 'dodgerblue' }}>
                    {renderPropCodeH2}
                  </code>
                </pre>
              </li>
              <li>
                <code style={{ color: 'dodgerblue' }}>isSecondary</code>: This
                determines if it should look slightly smaller when true. Use
                when you need a secondary heading in the same Card like:
                <pre>
                  <code style={{ color: 'dodgerblue' }}>
                    {renderPropCodeSecondary}
                  </code>
                </pre>
              </li>
            </ul>
          </P>
        </Page.Content>
      </Page.Section>
      <Page.Section>
        <Page.Header
          withBorder={false}
          render={({ Title, Subtitle }) => (
            <div>
              <Title headingLevel="h2" isSecondary>
                Second Header
              </Title>
              <Subtitle>This one has a subtitle too</Subtitle>
            </div>
          )}
        />
        <Page.Content>Something cool</Page.Content>
      </Page.Section>
      <Page.Section>
        <Page.Header
          withBorder={false}
          render={({ Title, Subtitle }) => (
            <div>
              <Title headingLevel="h2" isSecondary>
                Third Header, no subtitle here
              </Title>
            </div>
          )}
        />
        <Page.Content>Something cool</Page.Content>
      </Page.Section>
      <Page.Section>
        <Page.Header
          title="A good and thoughtful title"
          subtitle="With an equally insightful subtitle"
        />
        <Page.Content>
          <P>
            For backwards compatibility you can use the header using the "title"
            and "subtitle" props:
          </P>
          <pre>
            <code style={{ color: 'dodgerblue' }}>{titleSubtitlePropCode}</code>
          </pre>
          <P>However, this only renders big H1 tags, so avoid the use of it.</P>
        </Page.Content>
      </Page.Section>
    </Page.Card>
  </Page>
)

export const HeaderSubsequentCards = () => (
  <Page>
    <Page.Card>
      <Page.Section>
        <Page.Header
          render={({ Title, Subtitle }) => (
            <div>
              <Title headingLevel="h1">Headers!</Title>
              <Subtitle>Oh so nice</Subtitle>
            </div>
          )}
        />
        <P>
          For accesibility compliance, each page should only have one{' '}
          <code style={{ color: 'dodgerblue' }}>H1</code> heading
        </P>
        <P>Normally the 1st Card would hold it</P>
      </Page.Section>
    </Page.Card>
    <Page.Card>
      <Page.Section>
        <Page.Header
          render={({ Title, Subtitle }) => (
            <div>
              <Title headingLevel="h2">This is an h2</Title>
              <Subtitle>Not that you can tell</Subtitle>
            </div>
          )}
        />
        <P>
          So make sure that on the other Cards the prop{' '}
          <code style={{ color: 'dodgerblue' }}>headingLevel</code> on the{' '}
          <code style={{ color: 'dodgerblue' }}>Title</code> is set to "h2"
        </P>
        <P>
          The heading would look the same, but screen readers would not get
          confused what is the main purpose of this page
        </P>
      </Page.Section>
    </Page.Card>
  </Page>
)

export const HeaderResponsiveness = () => (
  <Page isResponsive>
    <Page.Card>
      <Page.Section>
        <Page.Header
          render={({ Title, Subtitle }) => (
            <div>
              <Title headingLevel="h1">Responsive?</Title>
              <Subtitle>You bet</Subtitle>
            </div>
          )}
        />
        <P>
          Just set <code style={{ color: 'dodgerblue' }}>isResponsive</code> on
          the <code style={{ color: 'dodgerblue' }}>Page</code>
        </P>
      </Page.Section>
      <Page.Section>
        <Page.Header
          withBorder={false}
          render={({ Title, Subtitle }) => (
            <div>
              <Title headingLevel="h2" isSecondary>
                Second Header
              </Title>
              <Subtitle>This one has a subtitle too</Subtitle>
            </div>
          )}
        />
        <Page.Content>Something cool</Page.Content>
      </Page.Section>
      <Page.Section>
        <Page.Header
          withBorder={false}
          render={({ Title, Subtitle }) => (
            <div>
              <Title headingLevel="h2" isSecondary>
                Third Header, no subtitle here
              </Title>
            </div>
          )}
        />
        <Page.Content>Something cool</Page.Content>
      </Page.Section>
    </Page.Card>
  </Page>
)

export const _Section = () => (
  <Page>
    <Page.Card>
      <Page.Section>
        <h1>Section 1</h1>
        <p>A Page.Section is where content should live.</p>
        <p>Sections are wrappers too, not pretty, but smart</p>
        <p>They handle responsiveness if enabled on the Page</p>
      </Page.Section>
      <Page.Section>
        <h2>Section 2</h2>
        <p>When to use?</p>
        <p>
          If the content inside a Card has multiple Headings, it's a sure signal
          that it has multiple sections
        </p>
      </Page.Section>
    </Page.Card>
  </Page>
)

export const _Card = () => (
  <Page>
    <Page.Card>
      <p>Cards are just presentational wrappers, nothing special.</p>
    </Page.Card>
    <Page.Card>
      <p>There can be more than 1 per Page.</p>
    </Page.Card>
    <Page.Card>
      <p>Sorry Cards, I didn't mean that. You are so pretty.</p>
    </Page.Card>
  </Page>
)

export const _Actions = () => (
  <Page>
    <Page.Card>
      <Input />
    </Page.Card>
    <Page.Actions
      primary={<Button kind="primary">Thing</Button>}
      secondary={<Button kind="secondary">Thing</Button>}
      serious={<Button kind="link">Thing</Button>}
    />
  </Page>
)

export const ActionsDirections = () => (
  <Page>
    <Page.Actions
      direction="left"
      primary={
        <Button kind="primary" size="lg">
          Left
        </Button>
      }
      secondary={
        <Button kind="secondary" size="lg">
          Thing
        </Button>
      }
      serious={
        <Button state="danger" size="lg">
          Thing
        </Button>
      }
    />
    <Page.Actions
      direction="right"
      primary={
        <Button kind="primary" size="lg">
          Left
        </Button>
      }
      secondary={
        <Button kind="secondary" size="lg">
          Thing
        </Button>
      }
      serious={
        <Button state="danger" size="lg">
          Thing
        </Button>
      }
    />
  </Page>
)

ActionsDirections.story = {
  name: 'Actions directions',
}
