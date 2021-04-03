// window.onload = function () {
//   console.log('preloader');
//   document.body.classList.add('loaded_hiding');
//   window.setTimeout(function () {
//     document.body.classList.add('loaded');
//     document.body.classList.remove('loaded_hiding');
//   }, 1000);
// };
import refs from './refs';
window.addEventListener('load', () => {
  console.log('loaded');
  // refs.preload.classList.add('hide-preloader');
  setTimeout(() => {
    refs.preload.style.visibility = 'hidden';
    refs.preload.style.opacity = '0';
  }, 1000);
});
