import React from 'react'
import { Attachment, AttachmentList } from '../index'

export default {
  component: AttachmentList,
  title: 'Components/Groups/AttachmentList',
}

const onClick = (event, attachment) => {
  console.log(event, attachment)
}
const handleDownloadAllClick = event => {
  console.log('Download all')
}

export const Default = () => {
  return (
    <AttachmentList onDownloadAllClick={handleDownloadAllClick}>
      <Attachment name="parrot.png" size="5KB" onClick={onClick} />
      <Attachment name="parrot2.png" size="5KB" onClick={onClick} />
      <Attachment
        name="parrot3-with-a-really-long-name.png"
        size="5KB"
        onClick={onClick}
      />
    </AttachmentList>
  )
}

Default.story = {
  name: 'default',
}

class ThemePreviewDemo extends React.Component {
  state = {
    attachments: [],
  }

  add = () => {
    this.setState({
      attachments: [
        ...this.state.attachments,
        (new Date().getTime() / 1000).toString(),
      ],
    })
  }

  render() {
    return (
      <div
        style={{
          padding: '10px 80px',
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <button onClick={this.add}>Add</button>
        <Attachment.Provider theme="preview">
          <AttachmentList>
            <Attachment
              imageUrl="https://img.buzzfeed.com/buzzfeed-static/static/2014-12/5/11/enhanced/webdr06/longform-original-7538-1417798667-22.jpg?downsize=715:*&output-format=auto&output-quality=auto"
              state="error"
            />
            <Attachment imageUrl="http://matthewjamestaylor.com/img/illustrations/large/how-to-convert-a-liquid-layout-to-fixed-width.jpg" />
            <Attachment name="attachment-coming-soon.md" />
            <Attachment name="attachment-coming-soon.md" />
            {this.state.attachments.map(name => (
              <Attachment name={name} key={name} />
            ))}
          </AttachmentList>
        </Attachment.Provider>
      </div>
    )
  }
}

export const ThemePreview = () => {
  return <ThemePreviewDemo />
}

ThemePreview.story = {
  name: 'theme: preview',
}
