import '../scss/styles.scss'
import {apiKey} from './api.js'
import { putFilms,removeFilmsBox,FilmList,searchMovie,enableButtons,disableButtons} from './filmClass.js'

let currentpage = 1
let filmsArray = new FilmList()
let movie_query = localStorage.getItem('filmQuery')
const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movie_query)}`;

fetch(searchUrl)

async function getQueryData(url){
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();

        if(data.total_pages==1){
            
            document.querySelector("#main-pages").remove()
        }
        
            
                for (let i = 0; i < data.results.length; i++) {
                    filmsArray.newFilm(
                        data.results[i].title,
                        data.results[i].poster_path,
                        data.results[i].overview,
                        data.results[i].release_date,
                        data.results[i].id
                    );
                    
                    
                   
                   
                }
                filmsArray.total_pages = data.total_pages      
                putFilms(filmsArray)
            
        console.log(data)

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}


async function setupButtons() {
      
    await getQueryData(searchUrl)
    
    console.log("etape1")

    const moreInfos = document.querySelectorAll('#more-info') 
    
    moreInfos.forEach(moreInfos => {
            moreInfos.addEventListener('click', function() {
                localStorage.setItem('film_ID', filmsArray.films[this.dataset.bouton].movie_ID)
            });
        });
}

function pageNext(){
    const nextPage = document.querySelector('#next')
    nextPage.addEventListener("click", event => {
        console.log(filmsArray.total_pages)
        if(currentpage<filmsArray.total_pages){
            disableButtons()
            removeFilmsBox(filmsArray)
            removeFilms()
            currentpage = currentpage + 1
            console.log(currentpage)
            getQueryData(searchUrl + `&page=${currentpage}`)
            enableButtons()
        }
        else{
            console.log("pages trop nombreuses")
        }
    })
}

function prevPage(){
    const previousPage = document.querySelector('#previous')

    previousPage.addEventListener("click", event =>{
        if(currentpage > 1){
            disableButtons()
            removeFilmsBox(filmsArray)
            removeFilms()
            currentpage = currentpage - 1
            getQueryData(searchUrl + `&page=${currentpage}`)
          
        }
        enableButtons()
    })
}

function removeFilms(){
    filmsArray.films = []
}


document.addEventListener('DOMContentLoaded', ()=>{
    setupButtons()
    searchMovie()
    pageNext()
    prevPage()
});

