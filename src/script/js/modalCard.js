import Lightbox from './lightbox';
import refs from './refs';
import runTrailer from '../API/fetchTrailer';

const { gallery } = refs;
const { modal } = refs;
const lightbox = new Lightbox();
import MovieApi from '../API/fetchMovie';
const MovieObj = new MovieApi();

gallery.addEventListener('click', event => lightbox.openLightbox(event));

modal.addEventListener('click', event => {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }

  if (event.target.classList.contains('play-trailer')) {
    new runTrailer(event.target.dataset.id).show();
  }

  if (event.target.classList.contains('modal-button-watched')) {
<<<<<<< Updated upstream
    console.log('Здесь будет callback от Андрея');
  }
  if (event.target.classList.contains('modal-button-queue')) {
=======
    const toWatched = [];
   toWatched.push(MovieObj.fetchMovie(event.target.id));
    localStorage.setItem('watchedFilms', JSON.stringify(toWatched));
    console.log(toWatched);
}
if (event.target.classList.contains('modal-button-queue')) {
>>>>>>> Stashed changes
    console.log('Здесь тоже будет callback от Андрея');
  }
});
