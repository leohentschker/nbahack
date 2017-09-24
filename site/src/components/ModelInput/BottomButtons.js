import PropTypes from 'prop-types'
import React from 'react'
import FontAwesome from 'react-fontawesome'
import swal from 'sweetalert2'

import './BottomButtons.scss'

const SaveButton = ({ saveModel, modelName, code }) => {
  return (
    <div
      id="save-button"
      className="bottom-button"
      role="button"
      onClick={() => {
        saveModel(modelName, code)
        swal(
          'Success',
          'Model saved',
          'success',
        )
      }}
    >
      <FontAwesome name="floppy-o" className="fa-button" />
      SAVE
    </div>
  )
}

const TrainButton = ({ trainModel, datasetName, modelName }) => (
  <div
    id="train-button"
    className="bottom-button"
    role="button"
    onClick={() => trainModel(modelName, datasetName)}
  >
    <FontAwesome name="train" className="fa-button" />
    TRAIN
  </div>
)

const PredictButton = ({ predictModel, modelName, datasetName }) => (
  <div
    id="predict-button"
    className="bottom-button"
    role="button"
    onClick={() => predictModel(modelName, datasetName)}
  >
    <FontAwesome name="clipboard" className="fa-button" />
    PREDICT
  </div>
)

const BottomButtons = (props) => {
  return (
    <div id="bottom-buttons">
      <SaveButton
        saveModel={props.saveModel}
        code={props.code}
        modelName={props.modelName}
      />
      <TrainButton
        trainModel={props.trainModel}
        modelName={props.modelName}
        datasetName={props.datasetName}
      />
      <PredictButton
        predictModel={props.predictModel}
        modelName={props.modelName}
        datasetName={props.datasetName}
      />
    </div>
  )
}

BottomButtons.propTypes = {
  saveModel: PropTypes.func.isRequired,
  trainModel: PropTypes.func.isRequired,
}

export default BottomButtons
