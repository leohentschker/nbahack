// external
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// internal
import ModelActionCreators from '../../redux/models'
import Home from './components/Home'

const mapDispatchToProps = dispatch => ({
  updateCode: code => dispatch(ModelActionCreators.updateCode(code)),
  saveModel: code => dispatch(ModelActionCreators.saveModel(code)),
  fetchModels: () => dispatch(ModelActionCreators.fetchModels()),
})

const mapStateToProps = state => ({
  models: state.data.models,
  code: state.data.code,
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
