const APIkey = 'b74c9412'
let searchIdArray = []
const searchForm = document.getElementById('search-form')
const mainEl = document.getElementById('main-section')

mainEl.innerHTML = `<img src="img/no-data-initial.png" alt="">`

searchForm.addEventListener('submit', async (e)=>{
	e.preventDefault()
	
	const searchInput = document.getElementById('search-input').value 
	const res = await fetch(`https://www.omdbapi.com/?s=${searchInput}&type=movie&apikey=${APIkey}`)
	const data = await res.json()
	searchIdArray = []
	
	if (data.Response === "True"){
		for (film of data.Search) searchIdArray.push(film.imdbID)
		mainEl.classList.remove('error')
		mainEl.innerHTML = await getHtmlMovies(searchIdArray)
	}
	else {
		mainEl.classList.add('error')
		mainEl.innerHTML = getErrorHtml()
	}
	})



document.addEventListener('click', (e) => {
	if(e.target.dataset.movie){
		const targetEl = e.target
		handleAddClick(targetEl.dataset.movie)
		targetEl.classList.remove("fa-plus", "add-icon")
		targetEl.classList.add("fa-check", "added-icon")
	}
})

function getErrorHtml(){
	return `
	
	<p>Unable to find what you’re looking for. Please try another search.</p>

	`
}

async function getHtmlMovies(arr) {
	let moviesHtml = ''
	for (id of arr){
		const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${APIkey}`)
		const dataMovie = await res.json()
		let classesOfIcon = ""
	
		if(localStorage.getItem(id)){
			classesOfIcon = "fa-check added-icon"
		}
		else{
			classesOfIcon = "fa-plus add-icon"
		}
		
				moviesHtml += `
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
								<i class="fa-solid ${classesOfIcon}" data-movie = '${dataMovie.imdbID}'></i>
								<p>Watchlist</p>
							</div>
						</div>
						<p class="description-text">${dataMovie.Plot}</p>
					</div>
				</div>
				
				`
				
			}
	return moviesHtml
}
	
	


async function handleAddClick(movieId){
	const res = await fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=${APIkey}`)
	const data = await res.json()
	localStorage.setItem(data.imdbID, data)
}

