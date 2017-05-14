import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Stories from './components/Stories'
import styles from './components/Stories'

class App extends Component{
	render() {
		return(
			<div className='container'>
				<h1>10 HACKER NEWS</h1>
				<Stories />
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'))
