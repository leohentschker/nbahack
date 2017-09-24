// external
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'

// internal
import ModelInput from '../../../components/ModelInput/'
import RankingTable from '../../../components/RankingTable/'
import Schedule from '../../../components/Schedule/'
import './Home.scss'

export default class Home extends Component {

  componentDidMount() {
    this.props.fetchModels()
    this.props.fetchDatasets()
  }

  render() {
    return (
      <div>
        <div className="logo-header">
          <img src="/ISE.png" />
        </div>
        <ModelInput
          saveModel={this.props.saveModel}
          trainModel={this.props.trainModel}
          predictModel={this.props.predictModel}
          activeDataset={this.props.activeDataset}
          datasets={this.props.datasets}
          updateCode={this.props.updateCode}
          code={this.props.code}
          models={this.props.models}
          activeModel={this.props.activeModel}
          selectModel={this.props.selectModel}
          newModel={this.props.newModel}
          selectDataset={this.props.selectDataset}
        />
        <h1 className="section-header">MODEL RESULTS</h1>
        <RankingTable
          prediction={this.props.prediction}
        />
        {/*
        <h1 className="section-header">SCHEDULE SUGGESTIONS</h1>
        <Schedule
          schedule={this.props.schedule}
        />
        */}
      </div>
    )
  }
}

Home.propTypes = {
  fetchModels: PropTypes.func.isRequired,
  saveModel: PropTypes.func.isRequired,
}