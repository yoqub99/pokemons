let elForm = MakeElem('#form')
let movieList = MakeElem('.movie__list')
let movieGenreList = MakeElem('.movie__genre-list')
let movieGenre = MakeElem('.movie__genre')
let pokemTime = MakeElem('#sorting')
let movieSearch = MakeElem('.movie__search')
let headerHeart = MakeElem('#headerHeart')
let aside = MakeElem('#aside')
let arrow = MakeElem('#arrow')

let arr = []

function renderGenresSelect(pokemons, element) {
    const result = []
    pokemons.forEach(pokem => {
        pokem.type.forEach(genre => {
            if (!result.includes(genre)) {
                result.push(genre)
            }
        })
    })
    
    result.forEach(genre => {
        const newOption = CreateDom('option')
        newOption.value = genre;
        newOption.textContent = genre
        
        element.appendChild(newOption)
    })
}

renderGenresSelect(pokemons, movieGenre)


function renderToAside (elem) {
    aside.innerHTML = null
    elem.forEach(item => {
        let newLi = CreateDom('li')
        let newImg = CreateDom('img')
        let newHeading = CreateDom('h2')
        let newGenreLi = CreateDom('p')
        let newBlock = CreateDom('div')
        let newWeight = CreateDom('p')
        let newAge = CreateDom('p')
        let newDelete = CreateDom('button')
        
        
        newLi.setAttribute('class', 'pokem--item')
        newLi.setAttribute('data-uuid', item.id)
        newImg.setAttribute('src', item.img)
        newImg.setAttribute('width', '80')
        newImg.setAttribute('height', '100')
        newHeading.setAttribute('class', 'pokem--item-title')
        newGenreLi.setAttribute('class', 'pokem--genre')
        newBlock.setAttribute('style', 'display:flex; justify-content:space-between')
        newDelete.setAttribute('class', 'fas fa-trash-alt')
        
        
        newHeading.textContent = item.name
        newGenreLi.textContent = item.type
        newWeight.textContent = item.weight
        newAge.textContent = item.candy_count + 'cc'
        
        
        newLi.appendChild(newImg)
        newLi.appendChild(newDelete)
        newLi.appendChild(newHeading)
        newLi.appendChild(newGenreLi)
        newBlock.appendChild(newWeight)
        newBlock.appendChild(newAge)
        newLi.appendChild(newBlock)
        aside.appendChild(newLi)
        
        newDelete.dataset.uuid = item.id
        
        newDelete.addEventListener('click', deleteItem)
    })
}

function deleteItem(e) {
    const liId = e.target.dataset.uuid
    let findIndex = arr.findIndex((elem) => elem.id == liId)
    
    arr.splice(findIndex, 1)
    
    renderToAside(arr)
}

function render(arrFilm, element) {
    
    element.innerHTML = null
    arrFilm.forEach(pokem => {
        
        //creating elements
        let newLi = CreateDom('li')
        let newImg = CreateDom('img')
        let newHeading = CreateDom('h2')
        let newGenreLi = CreateDom('p')
        let newBlock = CreateDom('div')
        let newWeight = CreateDom('p')
        let newAge = CreateDom('p')
        let newLikes = CreateDom('input')
        
        
        //creating attributes 
        newLi.setAttribute('class', 'movie__item')
        newImg.setAttribute('src', pokem.img)
        newImg.setAttribute('width', '150')
        newImg.setAttribute('height', '200')
        newHeading.setAttribute('class', 'movie__item-title')
        newGenreLi.setAttribute('class', 'movie__genre')
        newBlock.setAttribute('style', 'display:flex; justify-content:space-between')
        newLikes.setAttribute('class', 'btn-like')
        newLikes.setAttribute('id', 'btn-like')
        newLikes.setAttribute('type', 'checkbox')
        
        //elements content
        newHeading.textContent = pokem.name
        newGenreLi.textContent = pokem.type
        newWeight.textContent = pokem.weight
        newAge.textContent = pokem.candy_count + 'cc'
        newLikes.dataset.uuid = pokem.id;
        
        //appendChilds
        
        newLi.appendChild(newImg)
        newLi.appendChild(newLikes)
        newLi.appendChild(newHeading)
        newLi.appendChild(newGenreLi)
        newBlock.appendChild(newWeight)
        newBlock.appendChild(newAge)
        newLi.appendChild(newBlock)
        movieList.appendChild(newLi)
        
        
        newLikes.addEventListener('click', () => {
            if (newLikes.checked == true) {
                if (!arr.includes(pokem)) {
                    arr.push(pokem)
                    renderToAside(arr)
                }
            }
        })
    });
}


render(pokemons, movieList)


elForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    let selectGenres = movieGenre.value.trim()
    let searchFilms = movieSearch.value.trim()
    let regex = RegExp(searchFilms, 'gi')
    let selectTime = pokemTime.value.trim()
    
    
    let searchedFilms = pokemons.filter((pokem) => {
        return pokem.name.match(regex)
    })
    
    
    
    let foundFilms = []
    
    if (selectGenres == 'All') {
        foundFilms = searchedFilms
    } else {
        foundFilms = searchedFilms.filter(pokem => {
            return pokem.type.includes(selectGenres)
        })
    }
    
    if(selectTime === "a-z"){
        foundFilms.sort((a, b) => {
            if(a.name > b.name){
                return 1
            }else  if(a.name < b.name){
                return -1
            }else{
                return 0 
            }
        })
    }
    if(selectTime === "z-a"){
        foundFilms.sort((a, b) => {
            if(a.name > b.name){
                return -1
            }else  if(a.name < b.name){
                return 1
            }else{
                return 0 
            }
        })
    }
    if(selectTime === "new-old"){
        foundFilms.sort((a, b) => {
            if(a.spawn_time > b.spawn_time){
                return 1
            }else  if(a.spawn_time < b.spawn_time){
                return -1
            }else{
                return 0 
            }
        })
    }
    if(selectTime === "old-new"){
        foundFilms.sort((a, b) => {
            if(a.spawn_time > b.spawn_time){
                return -1
            }else  if(a.spawn_time < b.spawn_time){
                return 1
            }else{
                return 0 
            }
        })
    }
    
    render(foundFilms, movieList)
})


headerHeart.addEventListener( 'click', () => {
    aside.classList.toggle('pos-left')
})
arrow.addEventListener( 'click', () => {
    aside.classList.remove('pos-left')
})