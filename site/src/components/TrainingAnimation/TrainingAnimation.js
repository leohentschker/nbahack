// external
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import "./TrainingAnimation.scss"

const TEAMS = [
  'CLE',
  'GSW',
  'LAL',
  'NOP',
  'PHX',
  'UTA',
  'BKN',
  'HOU',
  'MEM',
  'NYK',
  'POR',
  'WAS',
  'BOS',
  'DAL',
  'IND',
  'MIA',
  'OKC',
  'SAC',
  'CHA',
  'DEN',
  'ISE',
  'MIL',
  'ORL',
  'SAS',
  'CHI',
  'DET',
  'LAC',
  'MIN',
  'PHI',
  'TOR',
]

const EmptyAnimation = () => (
  <div className="empty-animation">
    <img className="logo" src="/logo.png" />
  </div>
)

const TeamAnimation = ({ team1, team2, val, expected }) => (
  <div className="team-animation">
    <div>
      <img className="team-image" src={"/" + team1 + ".png"}/>
      <img className="team-image" src={"/" + team2 + ".png"}/>
    </div>
  </div>
)

const ProgressBar = ({ startTime }) => {
  const diff = (new Date()).getTime() - startTime
  const percent = 1.0 - (1.0 / diff)

  return (
    <div style={{
      'margin-left': '30px',
      'margin-right': '30px',
      height: '20px',
    }}>
      <div style={{
        width: `${parseInt(percent)}%`,
        background: '#3FCAC8',
        height: '100%',
      }} />
    </div>
  )
}

export default class TrainingAnimation extends Component {

  constructor(props) {
    super(props)

    this.state = {
      team1: null,
      team2: null,
    }
    this.cycleImages = this.cycleImages.bind(this)
  }

  componentDidMount() {
    this.cycleImages()
  }

  randTeam() {
    return TEAMS[Math.floor(Math.random() * TEAMS.length)]
  }

  cycleImages() {
    this.setState({
      team1: this.randTeam(),
      team2: this.randTeam(),
    })
    if (this.props.visible) {
      setTimeout(this.cycleImages, 500)
    }
  }

  render() {
    return (
      <div id="court-animation">
        <div className="image-wrapper">
          <img className="court-background" src="/Court.png" />
        </div>
        <div className="training-warning">
          Training...
        </div>
        <div className="content-wrapper">
          {
            (!this.state.team1 ? <EmptyAnimation /> :
              <TeamAnimation
                team1={this.state.team1}
                team2={this.state.team2}
              />
            )
          }
        </div>
         <ProgressBar startTime={this.props.trainingProgress} />
      </div>
    )
  }
}
