// external
import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import PropTypes from 'prop-types'

import "./Court.scss"

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
    <div className="value-wrapper">
      {
        expected ? (
          (expected > val) ? (
            <div className="differential positive">+{val}</div>
          ) : (<div className="differential positive">-{val}</div>)
        ) : (
          <div className="flat-value">{val}</div>
        )
      }
    </div>
  </div>
)

export default class Court extends Component {

  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div id="court-animation">
        <div className="image-wrapper">
          <img className="court-background" src="/Court.png" />
        </div>
        <div className="content-wrapper">
          {
            (!this.props.team1 ? <EmptyAnimation /> :
              <TeamAnimation
                team1={this.props.team1}
                team2={this.props.team2}
                val={this.props.val}
              />
            )
          }
        </div>
      </div>
    )
  }
}
