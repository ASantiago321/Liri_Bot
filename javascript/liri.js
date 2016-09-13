var inquirer = request('inquirer');
var fs = request('fs');

inquirer.prompt([
	{
		type: 'rawlist',
		name: 'choice',
		message: 'Make a decision',
		choices: ['Twitter', 'Spotify', 'Movies', 'Random']
	}


]).then(function(user){
	console.log(user.choice);
	if(user.choice == 'Twitter'){
		tweets();
	}
	else if (user.choice == 'Spotify'){
		console.log(user.choice);
		spotify();
	}
})

function tweets(){
	var key = require('keys.js');
	var Twitter = require('twitter');
	var params = {twitter_name: 'antsantiago12'};
	var client = new Twitter(key.twitter.Keys);
	client.get('statuses/user_timeline', params, function(error, tweets, response){
		if (error){
			console.log(error);
		}
		console.log(tweets);
		tweets.forEach(function(tweet){
			console.log(tweet.created_at + ": "+ tweet.text)
		})
	})
}

function spotify (){
	var spotifyWebApi = require('spotify-web-api-node');
	var spotify = new spotifyWebApi
	inquirer.prompt([
		{
			name: 'song',
			message: 'Select a song!',
			type: 'input',
			default: 'The Sign'
		}
	]).then(function(user){
		spotify.searchTracks('track: ' + user.song, {limit: 5}).then(function(data){
			var results = data.body.tracks.items;
			results.forEach(function(song){
				console.log("========================");
				console.log("Artist(s): ", getArtists(song.artists));
				console.log("Song name: ", song.name);
				console.log("Preview: ", song.album.external_urls.spotify);
				console.log("Album: ", song.album.name);
			})
		console.log("==============================");
			function getArtists(artists){
				var artistArray = [];
				artists.forEach(function(artist){
					artistArray.push(artist.name);
				});
				return artistArray.join(", ");
			}
		})
	})
}

function movieThis(){
	var request = require ('request');
	var myMovie = new request;

	inquirer.prompt([
		{
			name: 'movie',
			message: 'Pick yourself a movie!',
			type: 'input'
		}
	]).then(function(user){
		var queryURL = 'http://www.omdbapi.com/?t=' + user.choice + '&y=plot=short&r=json&tomatoes=true';

		request(queryURL, function(error, data, body){
			console.log('Title: ', JSON.parse(body).Title);
			console.log('Release Date: ', JSON.parse(body).Released);
			console.log('Plot: ', JSON.parse(body).Plot);
			console.log('Tomato Rating: ', JSON.parse(body).tomatoRating);
		})
	})
}