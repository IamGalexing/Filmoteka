import refs from './refs';
window.addEventListener('load', () => {
  console.log('loaded');
  // refs.preload.classList.add('hide-preloader');
  setTimeout(() => {
    refs.preload.style.visibility = 'hidden';
    refs.preload.style.opacity = '0';
  }, 1000);
});
