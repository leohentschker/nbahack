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
  newModel: name => dispatch(ModelActionCreators.newModel(name)),

  fetchDatasets: () => dispatch(DatasetActionCreators.fetchDatasets()),
  selectDataset: ds => dispatch(DatasetActionCreators.selectDataset(ds)),
})

const mapStateToProps = state => ({
  activeDataset: state.datasets.activeDataset,
  datasets: state.datasets.datasets,

  activeModel: state.data.activeModel,
  models: state.data.models,
  code: state.data.code,
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
