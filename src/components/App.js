import React, { Component } from 'react'
import './App.module.scss'
import Invoice from './Invoice/Invoice'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Invoice />
      </div>
    )
  }
}

export default App
