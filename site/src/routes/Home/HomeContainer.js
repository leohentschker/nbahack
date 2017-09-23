// external
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// internal
import ModelActionCreators from '../../redux/models'
import Home from './components/Home'

const mapDispatchToProps = dispatch => ({
  submitModel: code => dispatch(ModelActionCreators.submitModel(code))
})

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
