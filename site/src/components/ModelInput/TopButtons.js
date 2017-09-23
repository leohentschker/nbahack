import PropTypes from 'prop-types'
import React from 'react'
import Select, { Creatable } from 'react-select'
import 'react-select/dist/react-select.css'
import FontAwesome  from 'react-fontawesome'

import './TopButtons.scss'

const UploadDatasetButton = () => (
  <div id="upload-dataset-button">
    <FontAwesome name="upload" /> UPLOAD
  </div>
)

const TopButtons = (props) => {
  const models = props.models ? props.models.asMutable().map(m => ({ value: m.id, label: m.name })) : []
  const datasets = props.datasets ? props.datasets.asMutable().map(d => ({ value: d.id, label: d.name })) : []
  console.log(props.activeDataset, 'THE ACTIVE DS')
  return (
    <div id="top-buttons">
      <div className="button-wrapper">
        <span className="select-title">MODEL:</span>
        <Creatable
          className="top-button-select"
          options={models}
          value={props.activeModel ? props.activeModel.id : null}
          onChange={(newVal) => {
            const nextModel = props.models.filter(m => m.id === newVal.value)[0]
            props.selectModel(nextModel)
          }}
          onNewOptionClick={({ value }) => props.newModel(value)}
          addLabelText="Create new model '{label}'"
        />
      </div>
      <div className="button-wrapper">
        <span className="select-title">DATASET:</span>
        <Select
          className="top-button-select"
          options={datasets}
          value={props.activeDataset ? props.activeDataset.id : null}
          onChange={(newVal) => {
            const nextDS = props.datasets.filter(d => d.id === newVal.value)[0]
            props.selectDataset(nextDS)
          }}
        />
      </div>
      <UploadDatasetButton />
    </div>
  )
}

TopButtons.propTypes = {
  selectModel: PropTypes.func.isRequired,
  newModel: PropTypes.func.isRequired,
}

export default TopButtons
