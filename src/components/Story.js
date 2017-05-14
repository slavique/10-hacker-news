import React, { Component } from 'react'
import styles from './styles'

class Story extends Component{
	render() {
		const style = styles.story
		const story = this.props.story
		return(
			<div>
				<p style={style.title}>{story.title}
					<span style={style.author}>by&nbsp;{story.by}</span>
				</p>
				<a href={this.props.story.url}>{story.url}</a>
				<p style={style.meta}>
					<span style={style.timestamp}>{story.time}</span><span style={style.pipe}> | </span>
					<span style={style.score}>Score: </span>{story.score}<span style={style.pipe}> | </span>
					<span style={style.karma}>Karma: </span>{story.authorKarma}
				</p>
				<hr/>
			</div>
		)
	}
}

export default Story