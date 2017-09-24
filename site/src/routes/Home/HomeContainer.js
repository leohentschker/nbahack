// external
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// internal
import DatasetActionCreators from '../../redux/datasets'
import ModelActionCreators from '../../redux/models'
import Home from './components/Home'

const mapDispatchToProps = dispatch => ({
  selectModel: model => dispatch(ModelActionCreators.selectModel(model)),
  fetchModels: () => dispatch(ModelActionCreators.fetchModels()),
  updateCode: code => dispatch(ModelActionCreators.updateCode(code)),
  saveModel: (modelName, code) => dispatch(ModelActionCreators.saveModel(modelName, code)),
  trainModel: (modelName, dataset) => dispatch(ModelActionCreators.trainModel(modelName, dataset)),
  predictModel: (modelName, dataset) => dispatch(ModelActionCreators.predictModel(modelName, dataset)),
  newModel: name => dispatch(ModelActionCreators.newModel(name)),

  fetchDatasets: () => dispatch(DatasetActionCreators.fetchDatasets()),
  selectDataset: ds => dispatch(DatasetActionCreators.selectDataset(ds)),
})

const mapStateToProps = state => ({
  activeDataset: state.datasets.activeDataset,
  datasets: state.datasets.datasets,

  trainingProgress: state.data.trainingProgress,
  training: state.data.training,
  activeModel: state.data.activeModel,
  models: state.data.models,
  code: state.data.code,

  predicting: state.data.predicting,

  prediction: state.predictions.prediction,
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
