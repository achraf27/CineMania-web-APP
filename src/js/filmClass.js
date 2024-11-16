// variables





// classes

export class Film{
    constructor(title,image,overview,release_date,movie_id){
    this._title = title;
    this._image = image;
    this._overview = overview;
    this._release_date = release_date;
    this._movie_id = movie_id;
    }
    get Title(){
        return this._title
    }
    get Overview(){
        return this._overview
    }
    get Image(){
        return this._image
    }
    get ReleaseDate(){
        return this._release_date
    }

    get movie_ID(){
        return this._movie_id
    }
}

export class FilmList {
    constructor(){
      this.films = []
    }
    newFilm(title,image,overview,release_date,movie_id){
      let f = new Film(title,image,overview,release_date,movie_id)
      this.films.push(f)
      return f
    }
    get numberOfFilms(){
        return this.films.length
    }
    
  }


// fonctions

export function putFilms(filmsArray){
    

    const len = filmsArray.films.length
    const filmDiv = document.querySelector('#film-container')

    for(let i = 0 ;i<len;i++){ 
      
        if(filmDiv.childElementCount != len || filmDiv.childElementCount < len){

        const myTemplate = document.querySelector('#my-template')
        const clone = document.importNode(myTemplate.content, true)

        
        filmDiv.appendChild(clone)
        const bouton2 = document.querySelectorAll('#more-info')
        bouton2[i].setAttribute('data-bouton', i);
        }

        const title = document.querySelectorAll('h5')
        const img = document.querySelectorAll('img')

        img[i].src = `https://image.tmdb.org/t/p/w500/${filmsArray.films[i].Image}`;
        title[i].textContent = filmsArray.films[i].Title
           

           
       
    }


    
}

export function removeFilmsBox(filmsArray){
    const len = filmsArray.films.length
    const filmDiv = document.querySelector('#film-container')

    for(let i = 0 ;i<len;i++){
        while (filmDiv.firstChild) {
            filmDiv.removeChild(filmDiv.firstChild);
        }
    } 
}

export function searchMovie(){
    const buttonSearch = document.querySelector('#search-button')

    buttonSearch.addEventListener('click', function() {
        
        const searchBar = document.querySelector("#search-bar")

        localStorage.setItem("filmQuery",searchBar.value)

        console.log(localStorage.getItem("filmQuery"))
       
       
    });
}

export function disableButtons() {
    document.querySelector('#previous').disabled = true;
    document.querySelector('#next').disabled = true;
}


export function enableButtons() {
    setTimeout(() => {
        document.querySelector('#previous').disabled = false;
        document.querySelector('#next').disabled = false;
    }, 500);
}