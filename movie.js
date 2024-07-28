"use strict";

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOTVmN2I2ZmNiMGVmNWM1OTQ3MjkxYmE2OGEzZjNhMCIsIm5iZiI6MTcyMjE3NjAwMy43MTkwNjIsInN1YiI6IjY2OWUzZThiZjc4OGE1ZDg2YmE4OTA5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FoC-qN5Bfq1hetmkMyj3-VPCEVQHguKE4J3YGINSHWY'
  }
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then(response => response.json())
  .then(data => {
    const movies = data.results;
    const movieContainer = document.getElementById('movie-container');
    const movieCards = movies.map(movie => createMovieCard(movie));
    movieCards.forEach(card => movieContainer.appendChild(card));
  })
  .catch(err => console.error(err));

function createMovieCard(movie) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="card-img-top">
    <div class="card-body">
      <h5 class="card-title">${movie.title}</h5>
      <p class="card-text">${movie.overview}</p>
      <p class="card-text"><small class="text-muted">Rating: ${movie.vote_average}</small></p>
    </div>
  `;
  card.addEventListener('click', () => alert(`Movie ID: ${movie.id}`));
  return card;
}

document.getElementById('search-button').addEventListener('click', () => {
  const query = document.getElementById('search-movie').value.toLowerCase();
  const movieCards = document.querySelectorAll('.card');
  movieCards.forEach(card => {
    const title = card.querySelector('.card-title').textContent.toLowerCase();
    if (title.includes(query)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});