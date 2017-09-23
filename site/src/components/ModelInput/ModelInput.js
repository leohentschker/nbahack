// external
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BottomButtons from './BottomButtons'
import TopButtons from './TopButtons'
import Editor from './Editor'

import './ModelInput.scss'

export default class ModelInput extends Component {

  render() {
    return (
      <div id="model-input">
        <TopButtons
          models={this.props.models}
          activeModel={this.props.activeModel}
          selectModel={this.props.selectModel}
          newModel={this.props.newModel}
          datasets={this.props.datasets}
          activeDataset={this.props.activeDataset}
          selectDataset={this.props.selectDataset}
        />
        <div id="editor" />
        <Editor
          updateCode={this.props.updateCode}
          code={this.props.code}
        />
        <div
          className="submit-button"
          onClick={() => this.props.saveModel(this.state.modelCode)}
        >
          WHAT IS GOOD
        </div>
        <BottomButtons />
      </div>
    )
  }
}

ModelInput.propTypes = {
  selectModel: PropTypes.func.isRequired,
  updateCode: PropTypes.func.isRequired,
  saveModel: PropTypes.func.isRequired,
  newModel: PropTypes.func.isRequired,
}
