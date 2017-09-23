// external
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'

// internal
import ModelInput from '../../../components/ModelInput/'
import Court from '../../../components/Court'
import './Home.scss'

export default class Home extends Component {

  render() {
    console.log(this.props, "MY PROPS", this.props.submitModel)
    return (
      <div>
        <Court
          team1="OKC"
          team2="NYK"
          val={100}
        />
        <ModelInput
          submitModel={this.props.submitModel}
        />
      </div>
    )
  }
}

