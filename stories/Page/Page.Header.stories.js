import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { Page } from '../../src/index'
import { App } from './decorators'

const stories = storiesOf('Page/Header', module).addDecorator(App)

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

const P = styled('p')`
  margin: 0 0 1.5em 0;
  padding: 0;
  font-size: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`

stories.add('default', () => (
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
))

stories.add('Subsequent Cards', () => (
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
))

stories.add('Responsiveness', () => (
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
))
