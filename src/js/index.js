import '../scss/styles.scss'
import {FilmList} from './filmClass.js'
import {url} from './api.js'
import { putFilms,removeFilmsBox,searchMovie,enableButtons,disableButtons} from './filmClass.js'



// variables
let currentpage = 1
let filmsArray = new FilmList()


async function getData(url){
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        

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
       

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}




function removeFilms(){
        filmsArray.films = []
}


function pageNext(){

   

    const nextPage = document.querySelector('#next')
    nextPage.addEventListener("click", event => {
        if(currentpage<filmsArray.total_pages){
            disableButtons()
            removeFilmsBox(filmsArray)
            removeFilms()
            currentpage = currentpage + 1
            getData(url + `&page=${currentpage}`)
            enableButtons()
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
                getData(url + `&page=${currentpage}`)
         
        }
        enableButtons()
    })
}

   

    

    async function setupButtons() {
        
        const newUrl = url + `&page=${currentpage}`
        await getData(newUrl)
        
       
    
        const moreInfos = document.querySelectorAll('#more-info') 
        
        moreInfos.forEach(moreInfos => {
                moreInfos.addEventListener('click', function() {
                    localStorage.setItem('film_ID', filmsArray.films[this.dataset.bouton].movie_ID)
                });
            });
    }

    
    
    
document.addEventListener('DOMContentLoaded', ()=>{
        setupButtons()
        searchMovie()
        pageNext()
        prevPage()
});
   

    












// système de pages à faire, nouvelle page internet qui presente la fiche du film
// doit programmer la barre de recherche 
// doit trier par categorie


// le systeme de changement de pages marche mais un peu trop simplet a mon sens il presente des failles comme
// le fait que j'utilise des variables globales pour avoir un compter, je pense par la suite utiliser des classes
// qui stockeront les infos de la page

// doit inclure la selection de genre date de sortie ce genre de chose








