import refs from './refs';
import createCard from './popular-gallery';
import hendlerInput from './search';

const {
  homeBtn,
  libraryBtn,
  headerBg,
  searchWrap,
  searchInputRef,
  libraryBtnsContainer,
  gallery,
  paginationContainer,
} = refs;

homeBtn.addEventListener('click', e => hendlerHomeBtn(e));
libraryBtn.addEventListener('click', e => hendlerLibraryBtn(e));

function hendlerHomeBtn(e) {
  libraryBtn.disabled = false;
  homeBtn.disabled = true;
  headerBg.classList.remove('library__background');
  libraryBtn.classList.remove('current');
  homeBtn.classList.add('current');
  searchWrap.classList.remove('visually-hidden');
  libraryBtnsContainer.classList.add('visually-hidden');

  searchInputRef.value = '';
  createCard();
  paginationContainer.classList.remove('visually-hidden');
}

function hendlerLibraryBtn(e) {
  libraryBtn.disabled = true;
  homeBtn.disabled = false;

  homeBtn.classList.remove('current');
  libraryBtn.classList.add('current');
  headerBg.classList.add('library__background');
  searchWrap.classList.add('visually-hidden');
  libraryBtnsContainer.classList.remove('visually-hidden');
  gallery.innerHTML = '';
  paginationContainer.classList.add('visually-hidden');
}