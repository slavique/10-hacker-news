import React, { Component } from 'react'
import Request from 'superagent'
import superagent from 'superagent'
import Story from './Story'
import styles from './styles'

class Stories extends Component{
	constructor() {
		super()
		this.topStoriesURL = 'https://hacker-news.firebaseio.com/v0/topstories.json'
		this.storyURL = 'https://hacker-news.firebaseio.com/v0/item/[id].json'
		this.userURL = 'https://hacker-news.firebaseio.com/v0/user/[id].json'
		this.state = {
			isFetching: true,
			stories: []
		}
	}

	componentDidMount() {
		this.getAllStories((err, response) => {
			if (err) {
				console.dir('ERROR: ' + err)
				return
			}
			let updatedStories = Object.assign([], this.state.stories);
			for(let i = 0; i < 10; i++) {
				let randomStoryID = response[Math.floor(Math.random() * response.length)]
				updatedStories.push(randomStoryID)
			}
			updatedStories.forEach((elem, index) => {
				let storyURL = this.storyURL.replace('[id]', elem)
				Request.get(storyURL).then((story) => {
					// console.log(JSON.stringify(story.body))
					let time = new Date(story.body.time)
					story.body.time = time.toLocaleDateString()
					let userURL = this.userURL.replace('[id]', story.body.by)
					Request.get(userURL).then((user) => {
						story.body.authorKarma = user.body.karma
						updatedStories[index] = story.body
						updatedStories.sort((a, b) => {
							return a.score - b.score
						})
						console.log('score: ' + story.body.score)
						if (index == updatedStories.length -1) {
							console.log('index: ' + index)
							this.setState({
								stories: updatedStories,
								isFetching: false
							})
						}
					})
				})
			})
		})
	}

	getAllStories(callback) {
		superagent
		.get(this.topStoriesURL)
		.query(null)
		.set("Accept", 'application/json')
		.end((err, response) => {
			if (err) {
				callback(err, null)
				return
			}
			callback(null, response.body)
		})
	}

	render() {
		const style = styles.stories
		const listOfStories = this.state.stories.map((story, i) => {
			return(
				<li key={i}>
					<Story story={story}/>
				</li>
			)
		})
		const stories = this.state.isFetching ? <p>Loading...</p> :
						<div style={style.container}>
							<ul style={style.storiesList}>{listOfStories}</ul>
						</div>

		return(
			<div>
				{stories}
			</div>
		)
	}
}

export default Stories