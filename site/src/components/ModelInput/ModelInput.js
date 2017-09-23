// external
import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import PropTypes from 'prop-types'
import AceEditor from 'react-ace'

import brace from 'brace'
import 'brace/mode/python'
import 'brace/theme/monokai'

import './ModelInput.scss'

const DEFAULT_CODE = `
class Model:
  """
  Write your code here!
  """

  def train(self, dataframe):
    """
    Takes in dataframe containing all
    of the relevant data we will need
    """

  def predict(self, data):
    """
    Takes in the data for an upcoming game
    and makes a guess as to the value
    """
`

export default class ModelInput extends Component {

  constructor(props) {
    super(props)

    this.state = {
      modelCode: DEFAULT_CODE,
    }
  }

  render() {
    return (
      <div id="model-input">
        <div id="editor" />
        <div
          className="submit-button"
          onClick={() => this.props.submitModel(this.state.modelCode)}
        >
          WHAT IS GOOD
        </div>
        <AceEditor
          mode="python"
          theme="monokai"
          name="editor"
          onLoad={this.onLoad}
          onChange={code => this.setState({modelCode: code})}
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={this.state.modelCode}
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
  submitModel: PropTypes.func.isRequired,
}
