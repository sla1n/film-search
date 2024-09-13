const APIkey = 'b74c9412'


document.addEventListener('click', (e) => {
	if(e.target.dataset.movie){
		handleRemoveClick(e.target.dataset.movie)
	}
})


function handleRemoveClick(id){
	localStorage.removeItem(id)
	renderWatchlist()
}

async function renderWatchlist(){
	document.getElementById('main-section').innerHTML = await getWatclistHtml()
}


async function getWatclistHtml(){
	let watchlistHtml = ''
	for (var i = 0; i < localStorage.length; i++){
		const res = await fetch(`https://www.omdbapi.com/?i=${localStorage.key(i)}&apikey=${APIkey}`)
		const dataMovie = await res.json()
		watchlistHtml += 
		`
		<div class="movie-container">
					<img src="${dataMovie.Poster}" alt="">
					<div>
						<div class="name-container">
							<p class="movie-name">${dataMovie.Title}</p>
							<i class="fa-solid fa-star star-icon"></i>
							<p class="movie-rating">${dataMovie.imdbRating}</p>
						</div>
						<div class="features-container">
							<p>${dataMovie.Runtime}</p>
							<p>${dataMovie.Genre}</p>
							<div class="add-watchlist-container">
								<i class="fa-solid fa-minus remove-icon" data-movie = '${dataMovie.imdbID}'></i>
								<p>Remove</p>
							</div>
						</div>
						<p class="description-text">${dataMovie.Plot}</p>
					</div>
				</div>
				
				
		`
	}
	if(localStorage.length > 0) return watchlistHtml
	else {
		document.getElementById('main-section').classList.add('no-movies')
		return `<p class="main-text">Your watch list is looking a little empty...</p>
			<div class="add-container">
				<i class="fa-plus add-icon"></i>
				<p class="add-text">Let's add some movies</p>
			</div>`}

}



renderWatchlist()
// localStorage.clear()