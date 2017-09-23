// external
import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import PropTypes from 'prop-types'
import AceEditor from 'react-ace'

import brace from 'brace'
import 'brace/mode/python'
import 'brace/theme/monokai'

import './ModelInput.scss'


export default class ModelInput extends Component {

  render() {
    return (
      <div id="model-input">
        <div id="editor" />
        <div
          className="submit-button"
          onClick={() => this.props.saveModel(this.state.modelCode)}
        >
          WHAT IS GOOD
        </div>
        <AceEditor
          mode="python"
          theme="monokai"
          name="editor"
          onLoad={this.onLoad}
          onChange={code => this.props.updateCode(code)}
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={this.props.code}
          setOptions={{
            showLineNumbers: true,
            tabSize: 4,
          }}
        />
      </div>
    )
  }
}

ModelInput.propTypes = {
  updateCode: PropTypes.func.isRequired,
  saveModel: PropTypes.func.isRequired,
}
