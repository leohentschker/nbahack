// external
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'

// internal
import ModelInput from '../../../components/ModelInput/'
import Court from '../../../components/Court'
import './Home.scss'

export default class Home extends Component {

  componentDidMount() {
    this.props.fetchModels()
  }

  render() {
    return (
      <div>
        <Court
          team1="OKC"
          team2="NYK"
          val={100}
        />
        <ModelInput
          saveModel={this.props.saveModel}
          updateCode={this.props.updateCode}
          code={this.props.code}
        />
      </div>
    )
  }
}

Home.propTypes = {
  fetchModels: PropTypes.func.isRequired,
  saveModel: PropTypes.func.isRequired,
}