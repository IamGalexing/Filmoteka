import refs from './refs';
import Pagination from './pagination-api';
import 'firebase/auth';
import 'firebase/firestore';
import firebase from 'firebase/app';
import PNotify from '../../../node_modules/pnotify/dist/es/PNotify.js';

const pagination = new Pagination();

const firebaseConfig = {
  apiKey: 'AIzaSyD5Lz8Xolb4aTDugqG9oqiD3TvNrCFheKg',
  authDomain: 'filmoteka-d2783.firebaseapp.com',
  projectId: 'filmoteka-d2783',
  storageBucket: 'filmoteka-d2783.appspot.com',
  messagingSenderId: '870527658773',
  appId: '1:870527658773:web:6c74f3043e4340ced1d71c',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default class FilmsStorage {
  constructor() {
    this._watchedFilms = [];
    this._filmsQueue = [];
  }
  //watched
  addToWatchedFilm(item) {
    this._watchedFilms.push(item);
    this.saveWatchedFilms();
    if (refs.libraryBtn.disabled && refs.watchedBtn.disabled)
      this.showWatchedFilms();
  }
  removeWathedFilm(index) {
    this._watchedFilms.splice(index, 1);
    this.saveWatchedFilms();
    if (refs.libraryBtn.disabled && refs.watchedBtn.disabled)
      this.showWatchedFilms();
  }
  saveWatchedFilms() {
    localStorage.setItem('watched-films', JSON.stringify(this._watchedFilms));
    const user = firebase.auth().currentUser;
    if (user) {
      db.collection('users')
        .doc(user.uid)
        .collection('Watched')
        .doc('Markup')
        .set({ list: localStorage.getItem('watched-films') });
    }
  }
  showWatchedFilms() {
    const savedFilms = localStorage.getItem('watched-films');
    refs.watchedBtn.disabled = true;
    refs.watchedBtn.classList.add('.active');
    refs.queueBtn.disabled = false;
    refs.queueBtn.classList.remove('.active');
    if (!savedFilms) {
      PNotify.info({
        text: 'Your watchedlist is empty.',
        delay: 1000,
      });
      refs.gallery.innerHTML = null;
      return;
    }
    let watchedFilmsMarkup = '';
    JSON.parse(savedFilms).forEach(object => {
      watchedFilmsMarkup +=
        '<li class="movies__list-item">' + object.element + '</li>';
    });

    refs.gallery.innerHTML = watchedFilmsMarkup;
  }
  getWathedListFromLS() {
    if (!localStorage.getItem('watched-films')) return;
    this._watchedFilms = JSON.parse(localStorage.getItem('watched-films'));
  }
  get watchedFilms() {
    return this._watchedFilms;
  }

  //queue
  addToQueue(item) {
    this._filmsQueue.push(item);
    this.saveFilmsQueue();
    if (refs.libraryBtn.disabled && refs.queueBtn.disabled)
      this.showFilmsQueue();
  }
  removeFromQueue(index) {
    this._filmsQueue.splice(index, 1);
    this.saveFilmsQueue();
    if (refs.libraryBtn.disabled && refs.queueBtn.disabled)
      this.showFilmsQueue();
  }
  saveFilmsQueue() {
    localStorage.setItem('films-queue', JSON.stringify(this._filmsQueue));
    const user = firebase.auth().currentUser;
    if (user) {
      db.collection('users')
        .doc(user.uid)
        .collection('Queue')
        .doc('Markup')
        .set({ list: localStorage.getItem('films-queue') });
    }
  }
  showFilmsQueue() {
    const queue = localStorage.getItem('films-queue');
    refs.queueBtn.disabled = true;
    refs.queueBtn.classList.add('.active');
    refs.watchedBtn.disabled = false;
    refs.watchedBtn.classList.remove('.active');
    if (!queue) {
      PNotify.info({
        text: 'Your queue is empty.',
        delay: 1000,
      });
      refs.gallery.innerHTML = null;
      return;
    }
    let filmsQueueMarkup = '';
    JSON.parse(queue).forEach(object => {
      filmsQueueMarkup +=
        '<li class="movies__list-item">' + object.element + '</li>';
    });

    refs.gallery.innerHTML = filmsQueueMarkup;
  }
  getQueueFromLS() {
    if (!localStorage.getItem('films-queue')) return;
    this._filmsQueue = JSON.parse(localStorage.getItem('films-queue'));
  }
  get filmsQueue() {
    return this._filmsQueue;
  }
}
