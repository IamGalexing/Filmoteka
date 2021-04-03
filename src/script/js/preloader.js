import refs from './refs';
window.addEventListener('load', () => {
  setTimeout(() => {
    refs.preload.style.visibility = 'hidden';
    refs.preload.style.opacity = '0';
  }, 1000);
});
