import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { browserHistory, Router, Route } from 'react-router'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

class AppContainer extends Component {
  static propTypes = {
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { routes, store } = this.props

    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <div style={{ height: '100%' }}>
            <Router history={browserHistory} children={routes} />
          </div>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export default AppContainer
