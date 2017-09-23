import React from 'react'

import brace from 'brace'
import 'brace/mode/python'
import 'brace/theme/chrome'

import AceEditor from 'react-ace'

import "./Editor.scss"

const Editor = ({ updateCode, code }) => (
  <div id="editor-wrapper" style={{
    display: 'flex',
    ["justify-content"]: 'center',
  }}>
    <AceEditor
      mode="python"
      theme="chrome"
      name="editor"
      onChange={c => updateCode(c)}
      fontSize={14}
      showPrintMargin={true}
      highlightActiveLine={true}
      value={code}
      markers={[]}
      setOptions={{
        showLineNumbers: true,
        tabSize: 4,
      }}
    />
  </div>
)

export default Editor
