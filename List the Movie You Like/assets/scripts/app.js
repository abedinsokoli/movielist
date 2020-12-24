const addMovieModal = document.getElementById('add-modal');
// const addMovieModal = document.querySelector('#add-modal');
// const addMovieModal = document.body.children[1];
const startAddMovieButton = document.querySelector('header button');
// const startAddMovieButton = document.querySelector('header').lastElementChild;
const backdrop = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = addMovieModal.querySelector('.btn--success');
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');


const Movies = [];

const updatingUI = () => {
    if(Movies.length == 0){
        entryTextSection.style.display = 'block';
    }else{
        entryTextSection.style.display = 'none';
    };
};

const toggleMovieModal = () => {
addMovieModal.classList.toggle('visible');
toggleBackdrop();
clearMovieInputs();

};

const clearMovieInputs = () => {
for(const users of userInputs){
    users.value = '';
}

};
const deleteMovieHandler = (movieID) => {
    const movieIndex = 0;
    for(const movie of Movies){
        if(movie.id === movieID){break};
        movieIndex++
        
    };
    console.log(movieIndex);
    const unorderList = document.getElementById('movie-list');
    Movies.splice(movieIndex, 1);
    unorderList.children[movieIndex].remove();
    updatingUI();
   
 
};


const  renderNewMovieElement = (id, title, imageUrl, rating) => {
    const unorderList = document.getElementById('movie-list');
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
    <div class="movie-element__image"> <img src="${imageUrl}" alt="${title}"></div>
    <div class="movie-element__info"> <h2>${title}</h2> <p>${rating}/5</p></div>
    `;
    newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id));
    unorderList.appendChild(newMovieElement);
};



// transparent black bacground with rgb css
const toggleBackdrop = () =>{
backdrop.classList.toggle('visible');
};

const addMovieHandler = () => {
const titleValue = userInputs[0].value;
const imageUrlValue = userInputs[1].value;
const ratingValue = userInputs[2].value;
if( titleValue.trim() === '' || imageUrlValue.trim() === '' || ratingValue.trim() === '' || +ratingValue.trim() < 1 || +ratingValue.trim() > 5){
    alert('julutem vendosni diqka!'); 
    return;
};
const newMovie = {
    id: Math.random().toString,
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
};
Movies.push(newMovie);
console.log(Movies);
toggleMovieModal();
renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
updatingUI();
};


//by clicking the blackdrop removes 
const backdopClickHandler = () => {
toggleMovieModal();
};
const cancelAddMovie = () => {
    toggleMovieModal();
};

startAddMovieButton.addEventListener('click', toggleMovieModal);
backdrop.addEventListener('click', backdopClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovie);
confirmAddMovieButton.addEventListener('click', addMovieHandler);