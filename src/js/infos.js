import '../scss/styles.scss'
import {apiKey} from './api.js'
import {Film,searchMovie} from './filmClass.js'



let movie_id_var = localStorage.getItem('film_ID')
const urlMovieDetail = `https://api.themoviedb.org/3/movie/${movie_id_var}?api_key=${apiKey}`

async function getDetailsData(){
    try {
        const response = await fetch(urlMovieDetail);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();


        
            if (data) {
                let film = new Film(data.title,data.poster_path,data.overview,data.release_date,data.id)
                film.filmRuntime = data.runtime
                film.imdb_link = `https://www.imdb.com/title/${data.imdb_id}`;

                const filmLink = document.querySelector('#filmLink');
                const filmGenres = document.querySelector('#filmGenres');


                console.log(data)


                document.querySelector('#filmTitle').textContent = film._title;
                document.querySelector('#overview').textContent = film._overview;
                document.querySelector('#filmImage').src = `https://image.tmdb.org/t/p/w500/${film._image}`;
                document.querySelector('#filmDate').textContent = film._release_date;
                document.querySelector('#filmTime').textContent = film.filmRuntime + " minutes";

                
                filmLink.textContent = film.imdb_link;
                filmLink.setAttribute('href',film.imdb_link)

                if(data.genres.length == 1){
                    filmGenres.textContent = data.genres[0].name;
                }
                for(let i = 0;i<data.genres.length;i++){
                    filmGenres.textContent += data.genres[i].name + " "
                }

            } else {
                console.log('Aucun film sélectionné.');
            }
        
           
           
        
        
        
        console.log(data)

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

getDetailsData()

document.addEventListener('DOMContentLoaded',searchMovie);

