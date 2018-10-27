import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from '../Home/index'

class Core extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path='/' component={Home} />
          </div>
        </Router>
      </div>
    )
  }
}

export default Core
