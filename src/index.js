import _ from 'lodash';
import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyDjXypaXqF0YcqxI_lTslavkSUvalXATAA';



// create new component. Should produce some HTML
class App  extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			videos : [],
			selectedVideo: null
		};

		this.videoSearch('cats');		
	}

	videoSearch(term){
		console.log(term);
		YTSearch({key: API_KEY, term: term} , (videos) => {
			this.setState({ 
				videos: videos,
				selectedVideo: videos[0] 
			});
		});
	}

	render() {
		const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);
		return ( 
			<div>
				<SearchBar onSearchTermChange={videoSearch}/>
				<VideoDetail video={this.state.selectedVideo} />
				<VideoList 
					onVideoSelect= {selectedVideo => this.setState({selectedVideo}) }
					videos={this.state.videos} />
			</div>
		);
	}
}


// Take component HTML and put it on the page
ReactDOM.render(<App /> , document.querySelector('.container'));
