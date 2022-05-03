import React from 'react'
import { TAG_COLORS } from './ConvoList.constants'
import {
  TagUI,
  SubjectUI,
  PreviewUI,
  ConversationCellUI,
} from './ConvoList.css'

export function ConversationCell({ subject, preview, tags, row }) {
  return (
    <ConversationCellUI href="https://hello">
      <div>
        {tags
          ? tags.map(tag => (
              <TagUI
                color={TAG_COLORS[tag.color]}
                key={`${tag.name}_${row.id}`}
              >
                {tag.name}
              </TagUI>
            ))
          : null}
        <SubjectUI>{subject}</SubjectUI>
      </div>
      <PreviewUI>{preview}</PreviewUI>
    </ConversationCellUI>
  )
}
