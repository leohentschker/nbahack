// external
import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import PropTypes from 'prop-types'

import './RankingTable.scss'

const TableElement = ({ team1, team2, date, score, value }) => (
  <div className="table-row">
    <div className="data-elt">
      <span className="teamspan">
        <img className="table-logo" src={`/${team1}.png`}/>
        <span className="team-text">{team1}</span>
      </span>
    </div>
    <div className="data-elt">
      <span className="teamspan">
        <img className="table-logo" src={`/${team2}.png`}/>
        <span className="team-text">{team2}</span>
      </span>
    </div>
    <div className="data-elt">{date}</div>
    <div className="data-elt">{score}</div>
    <div className="data-elt">{value.toFixed(3)}</div>
  </div>
)

const DataFilledTable = ({ prediction }) => (
  <div id="ranking-table">
    <div className="table-header">
      <div className="data-elt">TEAM1</div>
      <div className="data-elt">TEAM2</div>
      <div className="data-elt">DATE</div>
      <div className="data-elt">SCORE</div>
      <div className="data-elt">VALUE</div>
    </div>
    {
      prediction.results.asMutable().sort((a, b) => a.value - b.value).map((r, i) =>
        <TableElement key={i} {...r} />
      )
    }
  </div>
)

const EmptyTable = () => (
  <div />
)

const RankingTable = (props) => {
  if (props.prediction) {
    return <DataFilledTable {...props} />
  } else {
    return <EmptyTable />
  }
}

export default RankingTable
